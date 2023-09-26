"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("node:path"));
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
const express_2 = require("@remix-run/express");
const node_1 = require("@remix-run/node");
const payload_1 = __importDefault(require("payload"));
const tiny_invariant_1 = __importDefault(require("tiny-invariant"));
const source_map_support_1 = __importDefault(require("source-map-support"));
// Remix runtime globals
(0, node_1.installGlobals)();
require('dotenv').config();
source_map_support_1.default.install();
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
const chokidar = process.env.NODE_ENV === "development" ? require("chokidar") : null;
async function start() {
    const app = (0, express_1.default)();
    (0, tiny_invariant_1.default)(process.env.PAYLOAD_SECRET, "PAYLOAD_SECRET is required");
    (0, tiny_invariant_1.default)(process.env.MONGODB_URI, "MONGODB_URI is required");
    /* Initialze Payload CMS */
    await payload_1.default.init({
        secret: process.env.PAYLOAD_SECRET,
        mongoURL: process.env.MONGODB_URI,
        express: app,
        onInit: () => {
            payload_1.default.logger.info(`Payload Admin URL: ${payload_1.default.getAdminURL()}`);
        },
    });
    app.use(payload_1.default.authenticate);
    app.use((0, compression_1.default)());
    // http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
    app.disable("x-powered-by");
    // Remix fingerprints its assets, so they can be cached indefinitely
    app.use("/build", express_1.default.static("public/build", { immutable: true, maxAge: "1y" }));
    // Everything in the public folder can be cached for an hour
    app.use(express_1.default.static("public", { maxAge: "1h" }));
    app.use("/assets", express_1.default.static(path.resolve(__dirname, "./assets")));
    app.use("/media", express_1.default.static(path.resolve(__dirname, './public/media')));
    app.use("/favicon.ico", express_1.default.static(path.resolve(__dirname, './public/favicon.ico')));
    app.use("/public", express_1.default.static(path.resolve(__dirname, './public')));
    app.use((0, morgan_1.default)("tiny"));
    // Attach the remix request handler and inject payload
    app.all("*", process.env.NODE_ENV === "development"
        ? createDevRequestHandler()
        : (0, express_2.createRequestHandler)({
            build,
            mode: process.env.NODE_ENV,
            getLoadContext(req, res) {
                return {
                    payload: req.payload,
                    user: req?.user,
                    res,
                };
            },
        }));
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Express server started on port ${port}`);
        if (process.env.NODE_ENV === "development") {
            (0, node_1.broadcastDevReady)(build);
        }
    });
}
start();
// Create a request handler that watches for changes to the server build during development.
function createDevRequestHandler() {
    async function handleServerUpdate() {
        // 1. re-import the server build
        build = await reimportServer();
        // Add debugger to assist in v2 dev debugging
        if (build?.assets === undefined) {
            console.log(build.assets);
            debugger;
        }
        // 2. tell dev server that this app server is now up-to-date and ready
        (0, node_1.broadcastDevReady)(build);
    }
    chokidar
        .watch(WATCH_PATH, { ignoreInitial: true })
        .on("add", handleServerUpdate)
        .on("change", handleServerUpdate);
    // wrap request handler to make sure its recreated with the latest build for every request
    return async (req, res, next) => {
        try {
            return (0, express_2.createRequestHandler)({
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
        }
        catch (error) {
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
//# sourceMappingURL=server.js.map