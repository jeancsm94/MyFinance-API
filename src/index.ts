
import { AppService } from "./services/app-service/app.service";
import { SqliteService } from "./services/sqlite/sqlite.service";

const app = new AppService(new SqliteService());


console.log('Iniciando Projeto!');
app.initApp();

 