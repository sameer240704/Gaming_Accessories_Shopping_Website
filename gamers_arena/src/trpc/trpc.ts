import { ExpressContext } from "@/server";
import { initTRPC } from "@trpc/server";

const trpc = initTRPC.context<ExpressContext>().create();
export const router = trpc.router;
export const publicProcedure = trpc.procedure; // Anyone will be able to call this public endpoint
