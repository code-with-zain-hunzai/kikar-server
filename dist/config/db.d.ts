import { PrismaClient } from '@prisma/client';
declare const prisma: PrismaClient<{
    log: ("query" | "warn" | "error")[];
}, never, import("@prisma/client/runtime/library").DefaultArgs>;
declare const connectDB: () => Promise<void>;
export { prisma, connectDB };
