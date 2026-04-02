import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface IndustryType {
    id: string;
    categoryId: string;
    name: string;
    description: string;
}
export interface Subtype {
    id: string;
    salaryMidLevel: number;
    roleTypeContext: string;
    typicalActivities: Array<string>;
    globalContext: string;
    name: string;
    typeId: string;
    description: string;
    salarySeniorLevel: number;
    valueChainDescription: string;
    employmentPercentage: number;
    totalWorkersEstimate: bigint;
    typicalRoles: Array<string>;
    salaryEntryLevel: number;
}
export interface Category {
    id: string;
    name: string;
    description: string;
}
export interface backendInterface {
    getAllCategories(): Promise<Array<Category>>;
    getSubtypeDetail(subtypeId: string): Promise<Subtype>;
    getSubtypesByType(typeId: string): Promise<Array<Subtype>>;
    getTypesByCategory(categoryId: string): Promise<Array<IndustryType>>;
    searchSubtypes(keyword: string): Promise<Array<Subtype>>;
}
