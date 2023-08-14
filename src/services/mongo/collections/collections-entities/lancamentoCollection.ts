import { ObjectId } from "mongodb";
import { TipoLancamento } from "../../../../entities/tipoLancamento";
import { ILancamentos } from "../../../../interface/lancamento.interface";
import { Categoria } from "../../../../types/categoria";
import { BaseCollection } from "../baseCollection";

export class LancamentoCollection extends BaseCollection implements ILancamentos{
    nome: string;
    data: Date;
    valor: number;
    dataPagamento: Date;
    formaPagamento: string;
    tipoLancamento: TipoLancamento;
    categoria: Categoria;
}