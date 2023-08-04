import { OptionalUnlessRequiredId } from "mongodb";
import { InsertOneResult } from "./InserResult.interface";
import { IProjectMongo } from "./projectMongo.interface";

export interface IRepository<T,IT> {
    insert(item: T): Promise<InsertOneResult>;
    find(query: any): Promise<T | T[]>;
    findById(id: string, projection: any): Promise<T>;
    findAll(): Promise<T[]>;
    update(id: string, item: T): Promise<void>;
    delete(id: string): Promise<void>;
}