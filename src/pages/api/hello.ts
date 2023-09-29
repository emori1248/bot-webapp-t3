import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";

import { env } from "~/env.mjs";

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

const discord = new REST({version:'10'}).setToken(env.DISCORD_API_KEY)

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function,
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  try {
    await discord.post(Routes.channelMessages("1155195072703377418"), {
        body: {
            content: 'A message from rest'
        }
    });
  } catch (error) {
    console.log(error)
  }

  // Rest of the API logic
  res.json({ message: "Hello Everyone!" });
}
