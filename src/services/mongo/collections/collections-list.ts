import { CreateCollectionOptions } from "mongodb";
import { lancamentoCollection, tipoLancamentoCollection } from "./collections";

export const listCollections: ICollection[] = [
    lancamentoCollection,
    tipoLancamentoCollection,
];

export interface ICollection {
    name: string
}

export interface ICollectionError {
    collection: ICollection
    errMessage: string
}