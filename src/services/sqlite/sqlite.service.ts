import { Database, ERROR, sqlite3 }from 'sqlite3';
import { listTables } from '../../tables/listTables';
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
}