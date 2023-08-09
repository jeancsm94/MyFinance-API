import { Collection, Db, MongoClient, MongoServerError } from "mongodb";

import { ICollectionError, listCollections } from "./collections/collections-list";
import { mongoUrl, mongoUrlVscode, passwdMongo, userMongo } from "../../configs/enviroment";
import { IRetornoResult } from "../../interface/retornoResult.interface";
import { Base } from "../../entities/base";

export class MongoService {
    
    private _client: MongoClient;

    get client(): MongoClient {
        return this._client;
    }

    constructor() {

    }

    initDB = async () => {
        await this.connect();
        const createData = await this.createCollections();
        
        if (!createData.hasCreated) {
            console.log(
                `Mensagem: ${createData.mensagem}\nList: ${
                    createData.listCollections?.length
                        ? createData.listCollections[0].errMessage
                        : null
                }`
            );
        }
    }

    async connect(): Promise<boolean> {
        // console.log("URl Mongo" + mongoUrl);
        console.log("URl Mongo VSCODE" + mongoUrlVscode);
        // this._client = new MongoClient(mongoUrl, {
        //     serverApi: {
        //         version: '1',
        //         deprecationErrors: true,
        //         strict: true
        //     }
        // });
        this._client = new MongoClient(mongoUrlVscode, {
            authMechanism: "SCRAM-SHA-1",
            auth:{
                password: passwdMongo,
                username: userMongo
            },
            serverApi: {
                version: '1',
                deprecationErrors: true,
                strict: true
            }
        });
        console.log(`Tentando conectar!`);
        let retorno =await this._client.connect();
        
        if (retorno) 
        {
            console.log(`Conectado com sucesso!`);
            
            return true;
        } else
            return false;
    }

    async disconnect(): Promise<void> {
        await this._client.close();
    }

    async ping() {
        // Send a ping to confirm a successful connection
        await this.client.db().command({ ping: 1 });
        console.log(
            "Pinged your deployment. You successfully connected to MongoDB!"
        );
    }

    async getCollection( collectionName: string) {
        return await this.client.db().collection(collectionName);
    }

    async createCollections(): Promise<IRetornoResult> {
        let createDb: boolean = false;
        
        await this.connect();
        console.log(`Conectando com o bando de dados!`);
        await this.ping();
        const db: Db = await this.client.db();
        if (db == undefined) {
            console.log(`Não conectado ao db!`);
            return {
                mensagem: 'Não conectado ao db!',
                hasCreated: false
            };
        }

        let listErros: ICollectionError[] = [];
        for (let index = 0; index < listCollections.length; index++) {
            const collection = listCollections[index];
            // console.log(`Criando Collection ${collection.name}`);
            try {
                createDb = true;
                await db.createCollection(collection.name);
            } catch(mongoError) {
                const error: MongoServerError = mongoError as MongoServerError;
                if(error.code === 48) {
                    continue;
                } else {
                    createDb = false;
                    listErros.push({collection: collection, errMessage: error.errmsg});
                    console.log();
                }
            };
        }
        if(createDb){
            return {
                mensagem: 'Base de Dados criada com sucesso',
                hasCreated: true
            }
        } else {
            return {
                mensagem: 'Erro um ou mais collections a base de dados',
                listCollections: listErros,
                hasCreated: false
            };
        }

    }
}
