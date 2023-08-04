
import { Lancamentos } from "./entities/lancamentos";
import { ILancamentos } from "./interface/lancamento.interface";
import { RepositoryBase } from "./repositories/repositoryBase";
import { AppService } from "./services/app-service/app.service";
import { LancamentoService } from "./services/lancamentos/lancamento.service";
import { MongoService } from "./services/mongo/mongo.service";

const app = new AppService(new MongoService(), new LancamentoService(new RepositoryBase<Lancamentos, ILancamentos>(new MongoService(),new Lancamentos())));

console.log('Iniciando Projeto!');
app.initApp();

 