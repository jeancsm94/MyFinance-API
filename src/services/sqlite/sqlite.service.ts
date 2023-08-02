import { Database, RunResult, sqlite3 }from 'sqlite3';
import { listTables } from '../../tables/listTables';
import { Base } from '../../entities/base';
export class SqliteService {
    sqlite: sqlite3 = require('sqlite3').verbose();
    private namedb:string = 'Myfinance.db';

    createDataBase = () => {
        return new  this.sqlite.Database( this.namedb ?? 'Myfinance.db',(error: Error| null) => {
            if(error)
                console.log(`- - - - - - - - - - - - - - - - - - - - -\n
                Messega: ${error.message},\nStack: ${error.stack ??'Nenhuma stack apresentada!'}\n
                - - - - - - - - - - - - - - - - - - - - -\n`);
        } );
    }

    createTables = (db: Database) => {
        console.log('---------------------------------');
        console.log('        CRIANDO TABELAS          ');
        console.log('---------------------------------');
        db.serialize(
            () => {
                for (let index = 0; index < listTables.length; index++) {
                    const element = listTables[index];
                    console.log('---------------------------------');
                    console.log(`Criação da tabela ${element.name}`);
                    db.run(element.query);
                    console.log('---------------------------------');
                }
            });
        db.close();
    }

    openDatabase = () => new this.sqlite.Database(this.namedb).on("open", () => {
        console.log('Open conection DB!');
      });
    
    closeDatabase = () => new this.sqlite.Database(this.namedb).on("close", () => {
        console.log('Close conection DB!');
      });
 
    insertOne = (entity: object, params: string[]) => this.insertOneOrReplace(entity, params);
    insertMany = (entity: object, params: string[]) => this.insertManyOrReplace(entity, params);

    private insertOneOrReplace(entity: object, params: string[]) {
        const db = this.openDatabase();
        const entidade = Object.assign(new Base(), entity)
        const tablename:string = 'lancamentos' ?? entidade.tableName;        
        let binds: string = '';
        for (let index = 0; index < 10; index++) {
            binds.concat('?, ')
        }
        binds.slice(0, binds.length -1);

        return db.run(`INSERT INTO ${tablename} VALUES (${binds})`, params,(result: RunResult) =>{
            if(result.changes > 0)
                return result.lastID; 
        });
    }
    
    private insertManyOrReplace(entity: object, params: string[]) {
        const db = this.openDatabase();
        const entidade = Object.assign(new Base(), entity)
        const tablename:string = 'lancamentos' ?? entidade.tableName;      
        let binds: string = '';
        for (let index = 0; index < 10; index++) {
            binds.concat('?, ')
        }
        binds.slice(0, binds.length -1);

        return db.run(`INSERT INTO ${tablename} VALUES (${binds})`, params,(result: RunResult) =>{
            if(result.changes > 0)
                return result.lastID; 
        });
    }
}