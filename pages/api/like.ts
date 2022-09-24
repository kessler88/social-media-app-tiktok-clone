import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../utils/client";
import { uuid } from "uuidv4"; //uuid == unique identifier, allow us to attach a uuid to every like by user.

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //In next.js backend each API endpoint can be any HTTP type/methods (POST,GET, etc).
  if (req.method === "PUT") {
    const { userId, postId, like } = req.body;

    //update the likes of a video post in Sanity
    const data = like
      ? await client
          .patch(postId)
          .setIfMissing({ likes: [] })
          .insert("after", "likes[-1]", [
            {
              _key: uuid(),
              _ref: userId,
            },
          ])
          .commit()
      : await client
          .patch(postId)
          .unset([`likes[_ref=="${userId}"]`])
          .commit();
    //checking all the likes to find the like inside the likes array that has the _ref == userId
      
    //return the updated data
    res.status(200).json(data);
  }
}
