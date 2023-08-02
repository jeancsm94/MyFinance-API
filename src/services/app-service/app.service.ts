import { Database } from "sqlite3";
import { SqliteService } from "../sqlite/sqlite.service";

export class AppService {
    constructor(private sqliteService: SqliteService){}

    initApp = async () => {
        console.log('Iniciando a criação da base de Dados');
        const db: Database | void = await this.sqliteService.createDataBase();
        console.log(`Criamos o banco de dados vamo criar o resto`);
        if(db == null){
            console.log('Base de dados não criado');
            return false;
        }

        await this.sqliteService.createTables(db);
    }
}