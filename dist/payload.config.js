"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("payload/config");
const path_1 = __importDefault(require("path"));
const Users_1 = __importDefault(require("./cms/collections/Users"));
const Posts_1 = __importDefault(require("./cms/collections/Posts"));
const Projects_1 = __importDefault(require("./cms/collections/Projects"));
const Technologies_1 = __importDefault(require("./cms/collections/Technologies"));
const Media_1 = __importDefault(require("./cms/collections/Media"));
// Import UI overrides
const Icon_1 = __importDefault(require("./cms/adminui/Icon"));
const Logo_1 = __importDefault(require("./cms/adminui/Logo"));
exports.default = (0, config_1.buildConfig)({
    serverURL: 'http://localhost:3000',
    admin: {
        user: Users_1.default.slug,
        meta: {
            titleSuffix: ' - igLab'
        },
        components: {
            graphics: {
                Logo: Logo_1.default,
                Icon: Icon_1.default
            },
        },
    },
    collections: [
        Posts_1.default,
        Projects_1.default,
        Technologies_1.default,
        Users_1.default,
        Media_1.default,
    ],
    typescript: {
        outputFile: path_1.default.resolve(__dirname, "cms/payload-types.ts"),
    }
});
//# sourceMappingURL=payload.config.js.map