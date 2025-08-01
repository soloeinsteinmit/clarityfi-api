import { PrismaClient } from "../../generated/prisma";

/**
 * Create a single Prisma client instance across the whole app
 */
const prisma = new PrismaClient();

export default prisma;
