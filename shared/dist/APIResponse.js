"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIResponse = void 0;
const t = require("io-ts");
const APIError_1 = require("./APIError");
const APIResponse = (type) => t.union([APIError_1.APIError, type]);
exports.APIResponse = APIResponse;
