import { Lancamentos } from "../../entities/lancamentos";
import { ILancamentos } from "../../interface/lancamento.interface";
import { RepositoryBase } from "../repositoryBase";

export class LancamentoRepository extends RepositoryBase<Lancamentos, ILancamentos> {}