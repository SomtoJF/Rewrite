const typeDefs = `#graphql 

type Account{
    _id: String!
    firstname: String!
    lastname: String!
    profile_picture: String
    posts: [Post!]
}

type Post{
    _id: String!
    author_id: Account!
    title: String!
    description: String!
    content: String!
    tags: [String!]
}

input CreateAccountArgs{
    _id: String!
    firstname: String!
    lastname: String!
    profile_picture: String
}

input UpdateAccountArgs{
    username: String!
    profile_picture: String
}

type Mutation{
    createAccount(account: CreateAccountArgs!): Account
    updateAccount(id: String!, edits: UpdateAccountArgs): Account
    deleteAccount(id: String!): Account
}


type Query{
    account(id: String!): Account 
    posts: [Post]
    post(id:String!): Post
}`;
export default typeDefs;
