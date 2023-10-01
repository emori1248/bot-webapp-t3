import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

import { REST } from "@discordjs/rest";
import {
  Routes,
  type RESTGetAPICurrentUserGuildsResult,
} from "discord-api-types/v10";

import { env } from "~/env.mjs";
import { TRPCError } from "@trpc/server";

const discord = new REST({ version: "10" }).setToken(env.DISCORD_API_KEY);

export const discordRouter = createTRPCRouter({
  hello: privateProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      try {
        await discord.post(Routes.channelMessages("867610479601909820"), {
          body: {
            content: input.text,
          },
        });
      } catch (error) {
        console.log(error);
      }
      return;
    }),
  getServersWhereUserIsAdmin: privateProcedure.query(async () => {
    try {
      const data = (await discord.get(
        Routes.userGuilds(),
      )) as RESTGetAPICurrentUserGuildsResult;
      return data;
    } catch (error) {
      console.log(error);
      throw new TRPCError({
        message: "Internal error retreiving from discord.",
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }),
});
