import { DeleteResult, Document, Filter, ModifyResult, MongoAPIError, ObjectId, OptionalUnlessRequiredId } from "mongodb";
import { Base } from "../entities/base";
import { ResultMongo } from "../interface/InserResult.interface";
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
    
    async insert(item:T): Promise<ResultMongo> {

        const collection = await  this.mongo.client.db().collection(this.collectionName).insertOne(item);
        return {
            acknowledged: collection.acknowledged,
            insertedId: collection.insertedId.id.toString()
        };
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

    async findById(id: string): Promise<T> {
        let item: T;
        
       const document = (await this.mongo.client.db().collection(this.collectionName).find<T>({ _id:  new ObjectId(id) }).toArray()).at(0);
       item = Object.assign(this.entity, document);
        return item;
    }
    async findAll(): Promise<T[]> {        
       return await this.mongo.client.db().collection(this.collectionName).find<T>({ }).toArray();
       
    }
    async update(id: string, item: T): Promise<any> {
        const resutl = await this.mongo.client.db().collection(this.collectionName).findOneAndReplace({ _id:new ObjectId(id) }, item)
        .catch(error => console.log(error));

        return {
            value: null,
            ok:resutl?.ok,
            lastErrorObject: resutl?.lastErrorObject
        } 
    }
    async delete(id: string): Promise<boolean> {
        const result: DeleteResult | void = await this.mongo.client.db().collection(this.collectionName).deleteOne({ _id:new ObjectId(id) })
            .catch(error => console.log(error));

        if (result?.acknowledged)
            return true;
        else
            return false;
    }

    createList(entities: T[]): T[] {
        const listRetorno: T[] = [];
        entities.map( item => listRetorno.push(Object.assign(this.entity, item)));
        return listRetorno;
    }
}