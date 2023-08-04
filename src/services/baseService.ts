import { Base } from "../entities/base";
import { IBase } from "../interface/base.interface";
import { IBaseService } from "../interface/baseService.interface";
import { RepositoryBase } from "../repositories/repositoryBase";

export class BaseService<T extends Base, IT extends IBase> implements IBaseService<T> {
    constructor(private repository: RepositoryBase<T,IT>) {}
    async insert(item: T): Promise<void> {
        await this.repository.insert(item);
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