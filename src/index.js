const { GraphQLServer } = require("graphql-yoga");

// 1
const typeDefs = `
  type Query {
    info: String!
    feed: [Link!]!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
  }
`;
// the exclamation mark at the end of the type String means what you are returning cannot be null

// 2
let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
];

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    // 2
    //when you query for the feed root field, what ever you return in your resolver must confirm to
    //the object type that is being returned. in this case, links must have an id,with type id, description with string type,
    //url with string type. they must all the present in links.
    feed: () => links,
  },
  // 3
  //the parent refers to the links array that is returned. so when you ,ask' for Link in your playground
  //the links constant is passed as parent to this Link resolver and you can select which object field to resolve.
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
  },
};
//the above resolver for link object type is known as a trivial resolver

// 3
const server = new GraphQLServer({
  typeDefs,
  resolvers,
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
