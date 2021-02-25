"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Author = void 0;
const t = require("io-ts");
const io_ts_types_1 = require("io-ts-types");
exports.Author = t.type({
    id: t.Int,
    name: io_ts_types_1.NonEmptyString
});
