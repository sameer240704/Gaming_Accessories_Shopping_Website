import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  anyApiRoute: publicProcedure.query(() => {
    return "Sameer";
  }),
});

export type AppRouter = typeof appRouter;
