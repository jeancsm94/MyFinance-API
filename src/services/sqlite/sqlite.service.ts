import { Database, sqlite3, OPEN_READONLY, OPEN_CREATE, OPEN_FULLMUTEX }from 'sqlite3';

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
}