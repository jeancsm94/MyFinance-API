import { Lancamentos } from "../../entities/lancamentos";
import { ILancamentos } from "../../interface/lancamento.interface";
import { BaseService } from "../baseService";

export class LancamentoService extends BaseService<Lancamentos, ILancamentos> {}