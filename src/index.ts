
import { AppService } from "./services/app-service/app.service";
import { MongoService } from "./services/mongo/mongo.service";

const app = new AppService(new MongoService());

console.log('Iniciando Projeto!');
app.initApp();

 