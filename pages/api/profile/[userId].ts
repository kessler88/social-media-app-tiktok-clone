import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import {
  singleUserQuery,
  userCreatedPostsQuery,
  userLikedPostsQuery,
} from "../../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //In next.js backend each API endpoint can be any HTTP type/methods (POST,GET, etc).
  if (req.method === "GET") {
    const { userId } = req.query;
   
    const userData = await client.fetch(singleUserQuery(userId));
    const userVideos = await client.fetch(userCreatedPostsQuery(userId));
    const userLikedVideos = await client.fetch(userLikedPostsQuery(userId));

    res.status(200).json({user: userData[0], userVideos, userLikedVideos});
  }
}
