import { IRetornoResult } from "../../interface/retornoResult.interface";
import { MongoService } from "../mongo/mongo.service";

export class AppService {
    constructor(private mongoService: MongoService){}

    initApp = async () => {
        console.log('Iniciando a criação da base de Dados');
        const createData: IRetornoResult = await this.mongoService.createCollections();
        if (!createData.hasCreated){
            console.log(`Mensagem: ${createData.mensagem}\nList: ${createData.listCollections?.length ? createData.listCollections[0].errMessage : null}`);
        }
    }
}