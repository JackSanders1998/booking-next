import { createTRPCRouter } from "./trpc";
import { venueRouter } from "./routers/venue";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  venue: venueRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
