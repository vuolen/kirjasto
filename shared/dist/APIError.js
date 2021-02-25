"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIError = void 0;
const t = require("io-ts");
exports.APIError = t.type({
    error: t.string
});
