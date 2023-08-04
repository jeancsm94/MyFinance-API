import { MongoAPIError, OptionalUnlessRequiredId } from "mongodb";
import { Base } from "../entities/base";
import { InsertOneResult } from "../interface/InserResult.interface";
import { IBase } from "../interface/base.interface";
import { IRepository } from "../interface/repository.interface";
import { MongoService } from "../services/mongo/mongo.service";

export class RepositoryBase<T extends Base, IT extends IBase> implements IRepository<T,IT> {
    constructor(private mongo: MongoService, private entity: T) {
        this.mongo.connect()
            .then( hasConnected => {
                if(!hasConnected) {
                    throw new Error('Could not connect to MongoDB');
                }
            }); 
    }
    
    async insert(item:T): Promise<InsertOneResult> {

        const collection: InsertOneResult = await  this.mongo.client.db().collection(this.entity.tableName ?? '').insertOne(item);
        return collection;
    }
    async find(query: any): Promise<T | T[]> {
        throw new Error("Method not implemented.");
        // const entities = await this.mongo.client.db().collection<IT>(this.entity.tableName).find(query).toArray();

        // if (entities.length === 0)
        //     return '';
        // if (entities.length === 1) 
        //     return Object.assign(this.entity,entities[0]);
        
        // return  await this.createList(entities);
    }
    findById(id: string): Promise<T> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<T[]> {
        throw new Error("Method not implemented.");
    }
    update(id: string, item: T): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    createList(entities: T[]): T[] {
        const listRetorno: T[] = [];
        entities.map( item => listRetorno.push(Object.assign(this.entity, item)));
        return listRetorno;
    }
}