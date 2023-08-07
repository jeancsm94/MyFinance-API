import { Lancamentos } from "../../entities/lancamentos";
import { ILancamentos } from "../../interface/lancamento.interface";
import { LancamentoRepository } from "../../repositories/lancamentos/lancamento.repository";
import { BaseService } from "../baseService";

export class LancamentoService extends BaseService {
    
    constructor(repository: LancamentoRepository){
        super(repository)
    }
}