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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.passwdMongo = exports.userMongo = exports.mongoUrlVscode = exports.mongoUrl = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.mongoUrl = (_a = process.env.MONGODB_URI) !== null && _a !== void 0 ? _a : "";
exports.mongoUrlVscode = (_b = process.env.Mongo_VSCODE) !== null && _b !== void 0 ? _b : "";
exports.userMongo = (_c = process.env.USER_MONGO) !== null && _c !== void 0 ? _c : "";
exports.passwdMongo = (_d = process.env.PASS_MONGO) !== null && _d !== void 0 ? _d : "";
exports.port = (_e = process.env.PORT) !== null && _e !== void 0 ? _e : "";
