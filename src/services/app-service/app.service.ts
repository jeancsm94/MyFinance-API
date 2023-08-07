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
        //await this.testeAPI();
    };

    testeAPI = async () => {
        console.log('Teste Inserção lancamento');
        try {
            let lancamento: Lancamentos = {
                valor: 300,
                _id: ObjectId.createFromTime(new Date().getTime()),
                categoria: "Vetuário",
                data: new Date(),
                dataPagamento: new Date(),
                formaPagamento: "PIX",
                nome: "Reggla",
                tipoLancamento: {
                    categoriaLancamento: "Despesa",
                    tipo: "Variável",
                },
            };
            await this.lancamentoService.insert(lancamento);

            const getEntity = await this.lancamentoService.getById('c19c54ac0000000000000000'); 
            const getAll = await this.lancamentoService.getAll();
            lancamento = {
                valor: 400,
                _id: ObjectId.createFromTime(new Date().getTime()),
                categoria: "Vetuário",
                data: new Date(),
                dataPagamento: new Date(),
                formaPagamento: "PIX",
                nome: "Reggla",
                tipoLancamento: {
                    categoriaLancamento: "Despesa",
                    tipo: "Variável",
                },
            };
            const updateLancamento= await this.lancamentoService.update('c19c54ac0000000000000000', lancamento);
            const removeLancamento = await this.lancamentoService.delete('c1dd8a5d0000000000000000');
            console.log('Retorno FindById: ' +  getEntity.nome );
            console.log('Retorno FindAll: ' +  getAll);
            console.log('Retorno updateLancamento: ' +  updateLancamento.id);
            console.log('Retorno removeLancamento True or false: ' +  removeLancamento);
            console.log('Deu bom');
        } catch (error) {
            console.log('Deu BO');
            console.log(error);
        }
    };
}
