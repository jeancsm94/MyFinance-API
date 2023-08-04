import { Document, Filter, MongoAPIError, ObjectId, OptionalUnlessRequiredId } from "mongodb";
import { Base } from "../entities/base";
import { InsertOneResult } from "../interface/InserResult.interface";
import { IBase } from "../interface/base.interface";
import { IRepository } from "../interface/repository.interface";
import { MongoService } from "../services/mongo/mongo.service";
import { IProjectMongo } from "../interface/projectMongo.interface";

export class RepositoryBase<T extends Base, IT extends IBase> implements IRepository<T,IT> {
    collectionName: string;
    constructor(private mongo: MongoService, private entity: T) {
        this.collectionName = this.entity.tableName ?? '';
        this.mongo.connect()
            .then( hasConnected => {
                if(!hasConnected) {
                    throw new Error('Could not connect to MongoDB');
                }
            });
    }
    
    async insert(item:T): Promise<InsertOneResult> {

        const collection: InsertOneResult = await  this.mongo.client.db().collection(this.collectionName).insertOne(item);
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

    async findById(id: string, projection: Document): Promise<T> {
        let item: T;
        
       const document = (await this.mongo.client.db().collection(this.collectionName).find<T>({ _id:  new ObjectId(id) }).toArray()).at(0);
       item = Object.assign(this.entity, document);
        return item;
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