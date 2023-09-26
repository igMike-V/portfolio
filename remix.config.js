/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  serverModuleFormat: "esm",
  tailwind: true,
  postcss: true,
  appDirectory: "app",
  assetsBuildDirectory: "/public/build",
  serverBuildPath: "/build/index.js",
  publicPath: "/build/",
};