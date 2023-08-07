import { DeleteResult, Document, Filter, ModifyResult, MongoAPIError, ObjectId, OptionalUnlessRequiredId } from "mongodb";
import { ResultMongo } from "../interface/InserResult.interface";
import { IRepository } from "../interface/repository.interface";
import { MongoService } from "../services/mongo/mongo.service";
import { Collection } from 'mongodb';
import { T } from "../type/generictype";

export class RepositoryBase implements IRepository {
    private _collection: Collection<Document>;
    private entity: T;

    get collection() {
        return this._collection;
    }
    set collection(value: Collection<Document>) {
        this._collection = value;
    }
    constructor(private mongo: MongoService, private _entity: T) {
        this.mongo.connect()
        .then( hasConnected => {
            if(!hasConnected) {
                throw new Error('Could not connect to MongoDB');
            }
        });
        this.entity = this._entity;
        console.log('Nome da collection: ' + this.entity.tableName);
        this.getCollection().then( result => this.collection = result);
    }
    
    async insert(item:T): Promise<ResultMongo> {

        const result = await this.collection.insertOne(item);
        return {
            acknowledged: result.acknowledged,
            insertedId: result.insertedId.id.toString()
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
        
       const document = (await this.collection.find({ _id:  new ObjectId(id) }).toArray()).at(0);
       item = Object.assign(this.entity, document);
        return item;
    }
    async findAll(): Promise<T[]> {        
       let documents =  await this.collection.find({ }).toArray();
       return this.createList(documents);
       
    }
    async update(id: string, item: T): Promise<any> {
        const resutl = await this.collection.findOneAndReplace({ _id:new ObjectId(id) }, item)
        .catch(error => console.log(error));

        return {
            value: null,
            ok:resutl?.ok,
            lastErrorObject: resutl?.lastErrorObject
        } 
    }
    async delete(id: string): Promise<boolean> {
        const result: DeleteResult | void = await this.collection.deleteOne({ _id:new ObjectId(id) })
            .catch(error => console.log(error));

        if (result?.acknowledged)
            return true;
        else
            return false;
    }

    createList(entities: any[]): T[] {
        const listRetorno: T[] = [];
        entities.map( item => listRetorno.push(Object.assign(this.entity, item)));
        return listRetorno;
    }
    
    getCollection = async (): Promise<Collection<Document>> => {
        const collection = new Promise<Collection<Document>>(async (resolve, reject) => {
            const result = await this.mongo.getCollection(this.entity.tableName ?? '')
            resolve(result);
            reject();
        });
        return collection;
    }
}