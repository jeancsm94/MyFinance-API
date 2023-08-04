import { Lancamentos } from "../../entities/lancamentos";
import { ILancamentos } from "../../interface/lancamento.interface";
import { LancamentoRepository } from "../../repositories/lancamentos/lancamento.repository";
import { BaseService } from "../baseService";

export class LancamentoService extends BaseService<Lancamentos, ILancamentos> {
    
    constructor(repository: LancamentoRepository){
        super(repository)
        this.project = {
            '_id': 1,
            'lastUpdated': 1,
            'nome': 1,
            'data': 1,
            'valor': 1,
            'dataPagamento': 1,
            'formaPagamento': 1,
            'tipoLancamento': 1,
            'categoria': 1,
        }
    }
}