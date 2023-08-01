import { Base } from "../entities/base";

export interface IBaseService<T extends Base> {
    insert(item: T): void;
    getById(id: string): T;
    getAll(): T[];
    update(id: string, item: T): void;
    delete(id: string): void;
}