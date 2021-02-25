import * as t from 'io-ts';
export declare const AddBookRequest: t.TypeC<{
    title: import("io-ts-types").NonEmptyStringC;
    author: t.UnionC<[t.NumberC, t.TypeC<{
        name: import("io-ts-types").NonEmptyStringC;
    }>, t.UndefinedC]>;
}>;
export declare type AddBookRequest = t.TypeOf<typeof AddBookRequest>;
export declare const AddBookResponse: t.TypeC<{
    id: t.BrandC<t.NumberC, t.IntBrand>;
    title: import("io-ts-types").NonEmptyStringC;
    author: t.UnionC<[t.TypeC<{
        id: t.BrandC<t.NumberC, t.IntBrand>;
        name: import("io-ts-types").NonEmptyStringC;
    }>, t.UndefinedC]>;
}>;
export declare type AddBookResponse = t.TypeOf<typeof AddBookResponse>;
//# sourceMappingURL=AddBook.d.ts.map