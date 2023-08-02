export const createTableTipoLancamento = `
    CREATE TABLE IF NOT EXISTS tipoLancamentos (
        id TEXT,
        lastUpdate DATE,
        lancamentoId TEXT,
        despesa INTEGER,
        receita INTEGER,
        fixa INTEGER,
        variavel INTEGER,

        PRIMARY KEY(id),
        FOREIGN KEY(lancamentoId) REFERENCES lancamentos(id)
    )
`;