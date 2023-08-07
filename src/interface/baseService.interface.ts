import { Base } from "../entities/base";
import { T } from "../type/generictype";

export interface IBaseService {
    insert(item: T): Promise<void>;
    getById(id: string): Promise<T>;
    getAll(): Promise<T[]>;
    update(id: string, item: T): Promise<void>;
    delete(id: string): Promise<void>;
}