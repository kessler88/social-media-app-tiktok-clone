import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../utils/client";
import { allUsersQuery } from "../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //In next.js backend each API endpoint can be any HTTP type/methods (POST,GET, etc).
  if (req.method === "GET") {
    const query = allUsersQuery();
    const data = await client.fetch(query);

    if(data) {
      res.status(200).json(data);
    } else {
      res.json([]);
    }
  }
}
