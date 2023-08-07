import { OptionalUnlessRequiredId } from "mongodb";
import { ResultMongo } from "./InserResult.interface";
import { IProjectMongo } from "./projectMongo.interface";

export interface IRepository<T,IT> {
    insert(item: T): Promise<ResultMongo>;
    find(query: any): Promise<T | T[]>;
    findById(id: string): Promise<T>;
    findAll(): Promise<T[]>;
    update(id: string, item: T): Promise<ResultMongo>;
    delete(id: string): Promise<boolean>;
}