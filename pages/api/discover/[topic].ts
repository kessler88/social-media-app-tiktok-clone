import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import { topicPostsQuery } from "../../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //In next.js backend each API endpoint can be any HTTP type/methods (POST,GET, etc).
  if (req.method === "GET") {
      const { topic } = req.query;
      const videoTopicQuery = topicPostsQuery(topic);
      const videos = await client.fetch(videoTopicQuery);
      
      res.status(200).json(videos);
  }
}
