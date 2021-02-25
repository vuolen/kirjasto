import * as t from 'io-ts';
export declare const Author: t.TypeC<{
    id: t.BrandC<t.NumberC, t.IntBrand>;
    name: import("io-ts-types").NonEmptyStringC;
}>;
export declare type Author = t.TypeOf<typeof Author>;
//# sourceMappingURL=Author.d.ts.map