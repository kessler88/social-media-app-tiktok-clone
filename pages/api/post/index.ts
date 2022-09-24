
//fetch all videos from Sanity to handle our API call.
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client';
import { allPostsQuery } from '../../../utils/queries'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //In next.js backend each API endpoint can be any HTTP type/methods (POST,GET, etc).
    if (req.method == "GET") {
        const query = allPostsQuery();
        const data = await client.fetch(query);
        
        res.status(200).json(data);
    }
    else if (req.method == "POST") { 
        const postDocument = req.body;
        
        client.create(postDocument).then(() => res.status(201).json("Post Created"))
    }
}
