import { Base } from "../entities/base";
import { IBase } from "../interface/base.interface";
import { IBaseService } from "../interface/baseService.interface";
import { Document } from "mongodb";
import { RepositoryBase } from "../repositories/repositoryBase";

export class BaseService<T extends Base, IT extends IBase> implements IBaseService<T> {
    private _project: any;

    set project(project: Document) {
        this._project = project;
    }

    get project(): any {
        return this._project;
    }

    constructor(private repository: RepositoryBase<T,IT>) {}
    
    async insert(item: T): Promise<void> {
        await this.repository.insert(item);
    }

    async getById(id: string): Promise<T> {
        return await this.repository.findById(id, this.project);
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