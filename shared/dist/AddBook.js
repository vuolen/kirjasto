"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddBookResponse = exports.AddBookRequest = void 0;
const t = require("io-ts");
const io_ts_types_1 = require("io-ts-types");
const Book_1 = require("./Book");
const AuthorInput = t.union([t.number, t.type({ name: io_ts_types_1.NonEmptyString }), t.undefined]);
exports.AddBookRequest = t.type({
    title: io_ts_types_1.NonEmptyString,
    author: AuthorInput
});
exports.AddBookResponse = Book_1.Book;
