"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVars = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: ['../.env', '.env'] });
exports.envVars = {
    SHOULD_SEND_PUSH_NOTIFICATIONS: process.env.SHOULD_SEND_PUSH_NOTIFICATIONS === 'true',
    PUSHOVER_USER: process.env.PUSHOVER_USER,
    PUSHOVER_TOKEN: process.env.PUSHOVER_TOKEN
};
