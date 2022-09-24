//schema for users
export default {
    name: "comment",
    title: "Comment",
    type: "document",
    //in sanity for each field add a new object.
    fields: [
      { 
          name: "postedBy",
          title: "posted By",
          type: "postedBy",  //special type (custome type)
      }, 
      {
         name: 'comment',
         title: 'Comment',
         type: "string"
      }
  ],
  };
  