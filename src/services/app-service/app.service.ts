import { ObjectId } from "mongodb";
import { Lancamentos } from "../../entities/lancamentos";
import { IRetornoResult } from "../../interface/retornoResult.interface";
import { LancamentoService } from "../lancamentos/lancamento.service";
import { MongoService } from "../mongo/mongo.service";
import { TipoLancamento } from "../../entities/tipoLancamento";

export class AppService {
    constructor(
        private mongoService: MongoService,
        private lancamentoService: LancamentoService
    ) {}

    initApp = async () => {
        console.log("Iniciando a criação da base de Dados");
        const createData: IRetornoResult =
            await this.mongoService.createCollections();
        if (!createData.hasCreated) {
            console.log(
                `Mensagem: ${createData.mensagem}\nList: ${
                    createData.listCollections?.length
                        ? createData.listCollections[0].errMessage
                        : null
                }`
            );
        }
        await this.testeAPI();
    };

    testeAPI = async () => {
        console.log('Teste Inserção lancamento');
        try {
            const lancamento: Lancamentos = {
                valor: 300,
                _id: ObjectId.createFromTime(new Date().getTime()),
                categoria: "Outros",
                data: new Date(),
                dataPagamento: new Date(),
                formaPagamento: "PIX",
                nome: "Salário",
                tipoLancamento: {
                    categoriaLancamento: "Receita",
                    tipo: "Fixa",
                },
            };
            await this.lancamentoService.insert(lancamento);
            console.log('Deu bom');
        } catch (error) {
            console.log('Deu BO');
            console.log(error);
        }
    };
}
