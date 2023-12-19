const typeDefs = `#graphql 

type Account{
    _id: String!
    firstname: String!
    lastname: String!
    profile_picture: String
    Articles: [Article!]
    bookmarked_articles: [Article!]
}

type Article{
    _id: String!
    author_id: Account!
    title: String!
    description: String!
    content: String!
    tags: [String!]
    related_articles: [Article!]
}

input CreateAccountArgs{
    _id: String!
    firstname: String!
    lastname: String!
    profile_picture: String
}

input UpdateAccountArgs{
    firstname: String
    lastname: String
    profile_picture: String
}

type Mutation{
    createAccount(account: CreateAccountArgs!): Account
    updateAccount(id: String!, edits: UpdateAccountArgs): Account
    deleteAccount(id: String!): Account
}


type Query{
    account(id: String!): Account 
    articles: [Article]
    article(id:String!): Article
}`;
export default typeDefs;
