
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import dotenv from 'dotenv'

dotenv.config()

const db_connect = process.env.DATABASE_URL;
if(!db_connect){
    throw new Error("Database url not found!")
}


const adapter = new PrismaPg({
  connectionString: db_connect,
});

const prisma = new PrismaClient({ adapter });

export default prisma