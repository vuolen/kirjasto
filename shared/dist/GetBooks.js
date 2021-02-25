"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetBooksResponse = exports.GetBooksRequest = void 0;
const t = require("io-ts");
const Book_1 = require("./Book");
exports.GetBooksRequest = t.void;
exports.GetBooksResponse = t.array(Book_1.Book);
