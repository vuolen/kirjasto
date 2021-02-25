import * as t from 'io-ts';
export declare const APIResponse: <T extends t.Any>(type: T) => t.UnionC<[t.TypeC<{
    error: t.StringC;
}>, T]>;
//# sourceMappingURL=APIResponse.d.ts.map