import { Base } from "../entities/base";
import { T } from "../type/generictype";

export interface IBaseService {
    insert(item: T): Promise<any>;
    getById(id: string): Promise<T>;
    getAll(): Promise<T[]>;
    update(id: string, item: T): Promise<any>;
    delete(id: string): Promise<boolean>;
}