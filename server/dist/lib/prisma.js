"use strict";
// import { PrismaPg } from "@prisma/adapter-pg";
// import { PrismaClient } from "../generated/prisma/client";
// import dotenv from 'dotenv'
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// dotenv.config()
// const db_connect = process.env.DATABASE_URL;
// if(!db_connect){
//     throw new Error("Database url not found!")
// }
// const adapter = new PrismaPg({
//   connectionString: db_connect,
// });
// const prisma = new PrismaClient({ adapter });
// export default prisma
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("../generated/prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_connect = process.env.DATABASE_URL;
if (!db_connect) {
    throw new Error("Database url not found!");
}
const adapter = new adapter_pg_1.PrismaPg({ connectionString: db_connect });
const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new client_1.PrismaClient({ adapter });
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
exports.default = prisma;
