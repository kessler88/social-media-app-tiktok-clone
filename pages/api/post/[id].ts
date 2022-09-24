//since this is a dynamic route it will have a query object.
import type { NextApiRequest, NextApiResponse } from "next";
import { uuid } from "uuidv4";
import { client } from "../../../utils/client";
import { postDetailQuery } from "../../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //In next.js backend each API endpoint can be any HTTP type/methods (POST,GET, etc).
  if (req.method == "GET") {
    const { id } = req.query;
    //sanity query.
    const query = postDetailQuery(id);
    const data = await client.fetch(query);

    res.status(200).json(data[0]);
  } //API endpoint for comments
  else if (req.method == "PUT") {
    const { userId, comment } = req.body;
    const { id }: any = req.query;

    const data = await client
      .patch(id)
      .setIfMissing({ comments: [] })
      .insert("after", "comments[-1]", [
        {
          comment: comment,
          _key: uuid(),
          postedBy: { _type: "postedBy", _ref: userId },
        },
      ])
      .commit();

    res.status(200).json(data);
  }
}
