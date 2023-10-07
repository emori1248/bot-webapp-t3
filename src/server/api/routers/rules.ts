import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure
} from "~/server/api/trpc";

export const ruleRouter = createTRPCRouter({
  getEnabledNonCustom: publicProcedure
    .input(z.object({ guild_id: z.string() }))
    .query(async ({ input, ctx }) => {
      const rules = await ctx.db.enabledStandardRule.findMany({
        where: { guild_id: input.guild_id },
        select: {
          type: true
        }
      });
      return {
        rules
      };
    }),

  getAllCustom: publicProcedure
    .input(z.object({ guild_id: z.string() }))
    .query(async ({ input, ctx }) => {
      const rules = await ctx.db.customRule.findMany({
        where: { guild_id: input.guild_id },
        select: {
          rule_name: true,
          rule_type: true,
          rule_content: true
        }
      });
      return {
        rules
      };
    }),
  addNewRegexRule: privateProcedure
    .input(z.object({ guild_id: z.string(), regex: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.customRule.create({
        data: {
          guild_id: input.guild_id,
          rule_content: input.regex,
          rule_name: "test name",
          rule_type: "REGEX"
        }
      });
    })
});
