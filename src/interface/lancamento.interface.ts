import { TipoLancamento } from "../entities/tipoLancamento";
import { Categoria } from "../types/categoria";
import { IBase } from "./base.interface";

export interface ILancamentos extends IBase {
    nome: string;
    data: Date;
    valor: number;
    dataPagamento: Date;
    formaPagamento: string;
    tipoLancamento: TipoLancamento;
    categoria:Categoria;
}