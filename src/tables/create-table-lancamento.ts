export const createTableLancamento = `
    CREATE TABLE IF NOT EXISTS lancamentos (
        id TEXT,
        lastUpdate DATE,
        nome TEXT,
        data TEXT,
        valor INTEGER,
        dataPagamento DATE,
        formaPagamento TEXT,
        tipoLancamentoId TEXT,
        categoria INTEGER,
        categoriaId TEXT,

        PRIMARY KEY(id),
        FOREIGN KEY(tipoLancamentoId) REFERENCES tipoLancamentos(id)  ON DELETE CASCADE 
    )
`