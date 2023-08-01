import { CategoriaLancamento, DespesaType, ReceitaType } from "../types/tipoLancamento-children";

export class TipoLancamento {
    categoriaLancamento: CategoriaLancamento;
    tipo: DespesaType| ReceitaType; 
}