import { Lancamentos } from "../../entities/lancamentos";
import { ILancamentos } from "../../interface/lancamento.interface";
import { LancamentoCollection } from "../../services/mongo/collections/collections-entities/lancamentoCollection";
import { MongoService } from "../../services/mongo/mongo.service";
import { RepositoryBase } from "../repositoryBase";

export class LancamentoRepository extends RepositoryBase<Lancamentos,LancamentoCollection> {

    constructor(mongo: MongoService, entity: Lancamentos, entityCollection: LancamentoCollection){
        super(mongo, entity, entityCollection);
    }
}