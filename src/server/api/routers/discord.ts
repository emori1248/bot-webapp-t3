import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";

import { env } from "~/env.mjs";

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
});
