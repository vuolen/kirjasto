import * as t from 'io-ts';
export declare const Book: t.TypeC<{
    id: t.BrandC<t.NumberC, t.IntBrand>;
    title: import("io-ts-types").NonEmptyStringC;
    author: t.UnionC<[t.TypeC<{
        id: t.BrandC<t.NumberC, t.IntBrand>;
        name: import("io-ts-types").NonEmptyStringC;
    }>, t.UndefinedC]>;
}>;
export declare type Book = t.TypeOf<typeof Book>;
//# sourceMappingURL=Book.d.ts.map