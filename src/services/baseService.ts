import { IBaseService } from "../interface/baseService.interface";
import { RepositoryBase } from "../repositories/repositoryBase";
import { ResultMongo } from "../interface/InserResult.interface";
import { T, U } from "../type/generictype";

export class BaseService implements IBaseService {

    constructor(private repository: RepositoryBase<T,U>) {}
    
    async insert(item: T): Promise<ResultMongo> {
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