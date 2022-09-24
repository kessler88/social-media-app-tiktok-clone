//schema for users
export default {
  name: "user",
  title: "Users",
  type: "document",
  //in sanity for each field add a new object.
  fields: [
    { 
        name: "userName",
        title: "User Name",
        type: "string", 
    }, 
    {
       name: 'image',
       title: 'Image',
       type: "string"
    }
],
};
