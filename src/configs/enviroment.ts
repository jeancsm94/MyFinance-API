import * as dotenv from 'dotenv';
dotenv.config();

export const mongoUrl = process.env.MONGODB_URI ?? "";
export const mongoUrlVscode = process.env.Mongo_VSCODE ?? "";
export const userMongo = process.env.USER_MONGO ?? "";
export const passwdMongo = process.env.PASS_MONGO ?? "";