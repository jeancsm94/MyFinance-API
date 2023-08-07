import { Lancamentos } from "../../entities/lancamentos";
import { ILancamentos } from "../../interface/lancamento.interface";
import { MongoService } from "../../services/mongo/mongo.service";
import { RepositoryBase } from "../repositoryBase";

export class LancamentoRepository extends RepositoryBase {

    constructor(mongo: MongoService, entity: Lancamentos){
        super(mongo, entity);
    }
}