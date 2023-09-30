import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const ruleRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ guild_id: z.string() }))
    .query(async ({ input, ctx }) => {
      const rules = await ctx.db.rule.findMany({
        where: { guild_id: input.guild_id },
        select: {
            rule_name: true,
            rule_type: true,
            rule_content: true,
        }
      });
      return {
        rules
      };
    }),
});
