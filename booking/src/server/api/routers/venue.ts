import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const venueRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.venue.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
  }),

  getById: publicProcedure
    .input(z.object({id: z.string()}))
    .query(({ input, ctx }) => {
    return ctx.prisma.venue.findUnique({where: {id: input.id}});
  }),

  new: publicProcedure
  .input(z.object({
    title: z.string(),
    description: z.string(),
    seats: z.number(),
    published: z.boolean(),
    ownerId: z.string(),
  }))
  .mutation(({ input, ctx }) => {
    return ctx.prisma.venue.create({
      data: input
    });
  }),
});
