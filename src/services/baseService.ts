import { Base } from "../entities/base";
import { IBase } from "../interface/base.interface";
import { IBaseService } from "../interface/baseService.interface";
import { Document } from "mongodb";
import { RepositoryBase } from "../repositories/repositoryBase";
import { ResultMongo } from "../interface/InserResult.interface";
import { T } from "../type/generictype";

export class BaseService implements IBaseService {
    private _project: any;

    set project(project: Document) {
        this._project = project;
    }

    get project(): any {
        return this._project;
    }

    constructor(private repository: RepositoryBase) {}
    
    async insert(item: T): Promise<any> {
       return await this.repository.insert(item);
    }

    async getById(id: string): Promise<T> {
        return await this.repository.findById(id);
    }
    async getAll(): Promise<T[]> {
        return await this.repository.findAll();
    }
    async update(id: string, item: T): Promise<any> {
        return await this.repository.update(id,item);
    }
    async delete(id: string): Promise<boolean> {
        return await this.repository.delete(id);
    }
}