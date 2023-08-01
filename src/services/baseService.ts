import { Base } from "../entities/base";
import { IBaseService } from "../interface/baseService.interface";

export class BaseService<T extends Base> implements IBaseService<T> {
    insert(item: T): void {
        throw new Error("Method not implemented.");
    }
    getById(id: string): T {
        throw new Error("Method not implemented.");
    }
    getAll(): T[] {
        throw new Error("Method not implemented.");
    }
    update(id: string, item: T): void {
        throw new Error("Method not implemented.");
    }
    delete(id: string): void {
        throw new Error("Method not implemented.");
    }
}