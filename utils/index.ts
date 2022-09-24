//this file fetch our google response
import axios from "axios";
import jwt_decode from "jwt-decode";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

//if user doesn;t exist create it in Sanity database else fetch it in our API call.
export const createOrGetUser = async (response: any, addUser: any) => {
  //response.credential is a jwt, json web token
  //decoded is a type of object with the following properties:
  //sub is a unique identify for every user.
  const decoded: { name: string; picture: string; sub: string } =  jwt_decode(response.credential);

  const { name, picture, sub } = decoded;

 //the user object that is going to be created in Sanity database
 //every single Sanity document has to have a _id and _type
  const user = {
    _id: sub,
    _type: "user",
    userName: name,
    image: picture,
  };
    
   addUser(user);

  //make a API call (a post request b/c we want to pass data to handle)
  await axios.post(`${BASE_URL}/api/auth`, user);
};
