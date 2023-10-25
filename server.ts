import * as path from "node:path";
import express from "express";
import compression from "compression";
import morgan from "morgan";
import { createRequestHandler, type RequestHandler } from "@remix-run/express";
import { broadcastDevReady, installGlobals } from "@remix-run/node";
import payload from "payload";
import invariant from "tiny-invariant";
import sourceMapSupport from "source-map-support";

// Remix runtime globals
installGlobals();
require('dotenv').config();
sourceMapSupport.install();

/**
 * @typedef {import('@remix-run/node').ServerBuild} ServerBuild
 *
 */
const BUILD_PATH = path.resolve("./build/index.js");
const WATCH_PATH = path.resolve("./build/version.txt");
// Import the build directory for remix

/**
 * Initial build
 * @type {ServerBuild}
 */
let build = require(BUILD_PATH);

// We'll make chokidar a dev dependency so it doesn't get bundled in production.
const chokidar =
  process.env.NODE_ENV === "development" ? require("chokidar") : null;

async function start() {
  const app = express();

  invariant(process.env.PAYLOAD_SECRET, "PAYLOAD_SECRET is required");
  invariant(process.env.DATABASE_URI, "DATABASE_URI is required");

  /* Initialze Payload CMS */
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });
  app.use(payload.authenticate);

  app.use(compression());

  // http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
  app.disable("x-powered-by");

  // Remix fingerprints its assets, so they can be cached indefinitely
  app.use(
    "/build",
    express.static("public/build", {immutable: true, maxAge: "1y"})
  )

  // Everything in the public folder can be cached for an hour
  app.use(express.static("public", {maxAge: "1h"}));
  app.use("/assets", express.static(path.resolve(__dirname, "./assets")));
  app.use("/media", express.static(path.resolve(__dirname, './public/media')));
  app.use("/favicon.ico", express.static(path.resolve(__dirname, './public/favicon.ico')));
  app.use("/public", express.static(path.resolve(__dirname, './public')));

  app.use(morgan("tiny"));

  // Attach the remix request handler and inject payload
  app.all(
    "*",
    process.env.NODE_ENV === "development"
      ? createDevRequestHandler()
      : createRequestHandler({
          build,
          mode: process.env.NODE_ENV,
          getLoadContext(req, res) {
            return {
              payload: req.payload,
              user: req?.user,
              res,
            };
          },
        })
  );
  const port = process.env.PORT || 3000;
  
  app.listen(port, () => {
    console.log(`Express server started on port ${port}`);
    if (process.env.NODE_ENV === "development") {
      broadcastDevReady(build);
    }
  });
}

start();

// Create a request handler that watches for changes to the server build during development.
function createDevRequestHandler(): RequestHandler {
  async function handleServerUpdate() {
    // 1. re-import the server build
    build = await reimportServer();

    // Add debugger to assist in v2 dev debugging
    if (build?.assets === undefined) {
      console.log(build.assets);
      debugger;
    }

    // 2. tell dev server that this app server is now up-to-date and ready
    broadcastDevReady(build);
  }

  chokidar
    .watch(WATCH_PATH, { ignoreInitial: true })
    .on("add", handleServerUpdate)
    .on("change", handleServerUpdate);

  // wrap request handler to make sure its recreated with the latest build for every request
  return async (req, res, next) => {
    try {
      return createRequestHandler({
        build,
        mode: "development",
        getLoadContext(req, res) {
          return {
            payload: req.payload,
            user: req?.user,
            res,
          };
        },
      })(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

// Invalidate cache of server build (CJS does not support hot module reloading)
/**
 * @type {() => Promise<ServerBuild>}
 */
async function reimportServer() {
  // manually remove the server build from the require cache
  Object.keys(require.cache).forEach((key) => {
    if (key.startsWith(BUILD_PATH)) {
      delete require.cache[key];
    }
  });

  // re-import the server build
  return require(BUILD_PATH);
}
