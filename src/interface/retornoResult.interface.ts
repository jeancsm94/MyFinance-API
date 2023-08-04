import { ICollectionError } from "../services/mongo/collections/collections-list";

export interface IRetornoResult {
    mensagem: string,
    listCollections?: ICollectionError[],
    hasCreated: boolean
}