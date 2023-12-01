const typeDefs = `#graphql 
# Define Your Schema Here
type Name{
    name: String
}

type Query{
    name: Name
}`;

export default typeDefs;
