import { ObjectId, OptionalId } from "mongodb";


export interface IBase{
    _id: ObjectId;
    lastUpdated: Date;
}