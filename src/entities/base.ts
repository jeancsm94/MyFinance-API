import { DbIgnore } from "../decorator/db-ignore.decorator";
import { IBase } from "../interface/base.interface";
import { ObjectId } from 'mongodb';

export class Base implements IBase {
    constructor() {
        this.constructor.prototype.dbIgnoreProps = this.constructor.prototype.dbIgnoreProps || [];
        this.constructor.prototype.childrenTablesProps = this.constructor.prototype.childrenTablesProps || [];
      }
    id: ObjectId;
    lastUpdated: Date = new Date();
    @DbIgnore()
    tableName: string;
    @DbIgnore()
    childrenTablesProps?: { propertyName: string; typeInstance: Base }[];

}