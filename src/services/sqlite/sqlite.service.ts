import { Database, sqlite3 }from 'sqlite3';
import { listTables } from '../../tables/listTables';
export class SqliteService {
    private _sqlite: sqlite3;

    constructor(sqlite: sqlite3) {
        this._sqlite = sqlite;
        this._sqlite.verbose();
    }


    createDataBase = () => {
        return new Promise<Database>(() => new this._sqlite.Database('./../../data/Myfinance.db',(error: Error| null) => {
            if(error)
                console.log(`Error: ${error.name}\n, 
                Messega: ${error.message},\n
                Stack: ${error.stack ??'Nenhuma stack apresentada!'}`
                );
        } ))
        .then((db: Database) => {
            return db;
        }).catch( (error: Error) => {
            if(error)
            console.log(`Error: ${error.name}\n, 
            Messega: ${error.message},\n
            Stack: ${error.stack ??'Nenhuma stack apresentada!'}`
            );
        });
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
            }
        );
        db.close();
    }
}