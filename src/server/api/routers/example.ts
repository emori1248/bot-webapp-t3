import { z } from "zod";

import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input, ctx }) => {
        
        const example = await ctx.db.example.findFirst({where: {name: input.text}});
      return {
        greeting: `Hello from ${example?.name}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.example.findMany();
  }),
  me: privateProcedure
    .query(({ctx}) => {
        return{id: ctx.userId};
    })
});
