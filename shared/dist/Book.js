"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const t = require("io-ts");
const io_ts_types_1 = require("io-ts-types");
const Author_1 = require("./Author");
exports.Book = t.type({
    id: t.Int,
    title: io_ts_types_1.NonEmptyString,
    author: t.union([Author_1.Author, t.undefined])
});
