import { db } from '@/lib/prisma';
import { publicProcedure, router } from './trpc';
import { z } from "zod"

export const appRouter = router({
    getTodos: publicProcedure.query(async () => {
        return [10, 20, 30, 40]
    }),

    getDick: publicProcedure.query(async () => {
        return "DICKMEUP"
    })
});
export type AppRouter = typeof appRouter;
