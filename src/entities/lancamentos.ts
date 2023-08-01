import { ILancamentos } from "../interface/lancamento.interface";
import { Categoria } from "../types/categoria";
import { Base } from "./base";
import { TipoLancamento } from "./tipoLancamento";

export class Lancamentos extends Base implements ILancamentos {
    nome: string;
    data: Date;
    valor: number;
    dataPagamento: Date ;
    formaPagamento: string;
    tipoLancamento: TipoLancamento;
    categoria: Categoria;
}