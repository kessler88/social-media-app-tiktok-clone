import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../utils/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //In next.js backend each API endpoint can be any HTTP type/methods (POST,GET, etc).
  if (req.method === "POST") {
    const user = req.body;
    //create new user in Sanity database.
    client.createIfNotExists(user)
      .then(() => res.status(200).json("Login success"));
  }
}
