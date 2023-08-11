"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryBase = void 0;
const mongodb_1 = require("mongodb");
class RepositoryBase {
    get collection() {
        return this._collection;
    }
    set collection(value) {
        this._collection = value;
    }
    constructor(mongo, _entity) {
        Object.defineProperty(this, "mongo", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: mongo
        });
        Object.defineProperty(this, "_entity", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: _entity
        });
        Object.defineProperty(this, "_collection", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "entity", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "getCollection", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => __awaiter(this, void 0, void 0, function* () {
                const collection = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    const result = yield this.mongo.getCollection((_a = this.entity.tableName) !== null && _a !== void 0 ? _a : '');
                    resolve(result);
                    reject();
                }));
                return collection;
            })
        });
        this.mongo.connect()
            .then(hasConnected => {
            if (!hasConnected) {
                throw new Error('Could not connect to MongoDB');
            }
        });
        this.entity = this._entity;
        console.log('Nome da collection: ' + this.entity.tableName);
        this.getCollection().then(result => this.collection = result);
    }
    insert(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.collection.insertOne(item);
            return {
                acknowledged: result.acknowledged,
                insertedId: result.insertedId.id.toString()
            };
        });
    }
    find(query) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
            // const entities = await this.mongo.client.db().collection<IT>(this.entity.tableName).find(query).toArray();
            // if (entities.length === 0)
            //     return '';
            // if (entities.length === 1) 
            //     return Object.assign(this.entity,entities[0]);
            // return  await this.createList(entities);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let item;
            const document = (yield this.collection.find({ _id: new mongodb_1.ObjectId(id) }).toArray()).at(0);
            item = Object.assign(this.entity, document);
            return item;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let documents = yield this.collection.find({}).toArray();
            return this.createList(documents);
        });
    }
    update(id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const resutl = yield this.collection.findOneAndReplace({ _id: new mongodb_1.ObjectId(id) }, item)
                .catch(error => console.log(error));
            return {
                value: null,
                ok: resutl === null || resutl === void 0 ? void 0 : resutl.ok,
                lastErrorObject: resutl === null || resutl === void 0 ? void 0 : resutl.lastErrorObject
            };
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.collection.deleteOne({ _id: new mongodb_1.ObjectId(id) })
                .catch(error => console.log(error));
            if (result === null || result === void 0 ? void 0 : result.acknowledged)
                return true;
            else
                return false;
        });
    }
    createList(entities) {
        const listRetorno = [];
        entities.map(item => listRetorno.push(Object.assign(this.entity, item)));
        return listRetorno;
    }
}
exports.RepositoryBase = RepositoryBase;
