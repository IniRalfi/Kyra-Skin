import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// Setup pool connection PostgreSQL
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

// EKSPOR DALAM BENTUK NAMED CONSTRUCTOR
export const prisma = new PrismaClient({ adapter });

// EKSPOR JUGA SEBAGAI DEFAULT UNTUK BACKWARD COMPABILITY
export default prisma;
