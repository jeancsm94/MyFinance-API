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
exports.MongoService = void 0;
const mongodb_1 = require("mongodb");
const collections_list_1 = require("./collections/collections-list");
const enviroment_1 = require("../../configs/enviroment");
class MongoService {
    get client() {
        return this._client;
    }
    constructor() {
        Object.defineProperty(this, "_client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "initDB", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => __awaiter(this, void 0, void 0, function* () {
                var _a;
                yield this.connect();
                const createData = yield this.createCollections();
                if (!createData.hasCreated) {
                    console.log(`Mensagem: ${createData.mensagem}\nList: ${((_a = createData.listCollections) === null || _a === void 0 ? void 0 : _a.length)
                        ? createData.listCollections[0].errMessage
                        : null}`);
                }
            })
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log("URl Mongo" + mongoUrl);
            console.log("URl Mongo VSCODE" + enviroment_1.mongoUrlVscode);
            // this._client = new MongoClient(mongoUrl, {
            //     serverApi: {
            //         version: '1',
            //         deprecationErrors: true,
            //         strict: true
            //     }
            // });
            this._client = new mongodb_1.MongoClient(enviroment_1.mongoUrlVscode, {
                authMechanism: "SCRAM-SHA-1",
                auth: {
                    password: enviroment_1.passwdMongo,
                    username: enviroment_1.userMongo
                },
                serverApi: {
                    version: '1',
                    deprecationErrors: true,
                    strict: true
                }
            });
            console.log(`Tentando conectar!`);
            let retorno = yield this._client.connect();
            if (retorno) {
                console.log(`Conectado com sucesso!`);
                return true;
            }
            else
                return false;
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._client.close();
        });
    }
    ping() {
        return __awaiter(this, void 0, void 0, function* () {
            // Send a ping to confirm a successful connection
            yield this.client.db().command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        });
    }
    getCollection(collectionName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.db().collection(collectionName);
        });
    }
    createCollections() {
        return __awaiter(this, void 0, void 0, function* () {
            let createDb = false;
            yield this.connect();
            console.log(`Conectando com o bando de dados!`);
            yield this.ping();
            const db = yield this.client.db();
            if (db == undefined) {
                console.log(`Não conectado ao db!`);
                return {
                    mensagem: 'Não conectado ao db!',
                    hasCreated: false
                };
            }
            let listErros = [];
            for (let index = 0; index < collections_list_1.listCollections.length; index++) {
                const collection = collections_list_1.listCollections[index];
                // console.log(`Criando Collection ${collection.name}`);
                try {
                    createDb = true;
                    yield db.createCollection(collection.name);
                }
                catch (mongoError) {
                    const error = mongoError;
                    if (error.code === 48) {
                        continue;
                    }
                    else {
                        createDb = false;
                        listErros.push({ collection: collection, errMessage: error.errmsg });
                        console.log();
                    }
                }
                ;
            }
            if (createDb) {
                return {
                    mensagem: 'Base de Dados criada com sucesso',
                    hasCreated: true
                };
            }
            else {
                return {
                    mensagem: 'Erro um ou mais collections a base de dados',
                    listCollections: listErros,
                    hasCreated: false
                };
            }
        });
    }
}
exports.MongoService = MongoService;
