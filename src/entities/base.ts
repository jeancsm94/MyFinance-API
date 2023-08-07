import { DbIgnore } from "../decorator/db-ignore.decorator";
import { IBase } from "../interface/base.interface";
import { ObjectId, OptionalId,  } from 'mongodb';
import { Document } from 'mongodb'
export class Base implements IBase {
    
    constructor() {
        this.dbIgnoreProps = this.constructor.prototype.dbIgnoreProps || [];
        this.childrenTablesProps = this.constructor.prototype.childrenTablesProps || [];
        this.tableName = this.constructor.prototype.tableName || '';
      }

    _id?: ObjectId;
    lastUpdated?: Date = new Date();
    @DbIgnore()
    tableName?: string;
    @DbIgnore()
    childrenTablesProps?: { propertyName: string; typeInstance: Base }[];
    @DbIgnore()
    dbIgnoreProps?: string[];

}