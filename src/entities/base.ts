import { IBase } from "../interface/base.interface";

export class Base implements IBase {
    lastUpdated: Date = new Date();
}