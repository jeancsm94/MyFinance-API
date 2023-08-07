import { Base } from "../entities/base";

export interface IBaseService<T extends Base> {
    insert(item: T): Promise<void>;
    getById(id: string): Promise<T>;
    getAll(): Promise<T[]>;
    update(id: string, item: T): Promise<void>;
    delete(id: string): Promise<void>;
}