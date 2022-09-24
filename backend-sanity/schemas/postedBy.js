export default {
    name: 'postedBy',
    title: "Posted By",
    type: "reference", 
    to: [{type: 'user'}],  
    //reference type means connect two different document
    //in this case, reference to an array of users.
    //meaning one user can post multiple comments 
    //and this will keep track of which comments the user posted
}