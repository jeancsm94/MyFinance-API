import { createTableLancamento } from "./create-table-lancamento";
import { createTableTipoLancamento } from "./createtableTipoLancamento";

export const listTables:Array<{name: string, query: string}> = [
    {
        name: 'Lancamentos',
        query: createTableLancamento
    },
    {
        name: 'Tipos Lancamentos',
        query: createTableTipoLancamento
    }
]