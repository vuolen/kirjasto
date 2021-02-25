import * as t from 'io-ts';
export declare const GetBooksRequest: t.VoidC;
export declare type GetBooksRequest = t.TypeOf<typeof GetBooksRequest>;
export declare const GetBooksResponse: t.ArrayC<t.TypeC<{
    id: t.BrandC<t.NumberC, t.IntBrand>;
    title: import("io-ts-types").NonEmptyStringC;
    author: t.UnionC<[t.TypeC<{
        id: t.BrandC<t.NumberC, t.IntBrand>;
        name: import("io-ts-types").NonEmptyStringC;
    }>, t.UndefinedC]>;
}>>;
export declare type GetBooksResponse = t.TypeOf<typeof GetBooksResponse>;
//# sourceMappingURL=GetBooks.d.ts.map