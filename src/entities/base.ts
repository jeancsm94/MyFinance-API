import { IBase } from "../interface/base.interface";

export class Base implements IBase {
    constructor(){}
    
    lastUpdated: Date = new Date();
    tableName: string;
}