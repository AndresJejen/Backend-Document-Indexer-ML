const { buildSchema } = require('graphql');           //COnstructor de schema GraphQL

module.exports = buildSchema(`
         
type Doc{
    _id : ID!
    titulo : String!
    name: String!
    author: String!
    mlanguage: String!
    typedoc: String!
    wlanguage: String!
    ilevel: String!
    flevel: String!
    date: String!
    link: String!
    helper:  User!
}

type User{
    _id : ID!
    name : String!
    email : String!
    password: String
    level: String!
    documentsadded : [Doc!]
}

input InputDoc{
    name: String!
    titulo : String!
    author: String!
    mlanguage: String!
    typedoc: String!
    wlanguage: String!
    ilevel: String!
    flevel: String!
    date: String!
    link: String!
}

input InputUser{
    name : String!
    email : String!
    password: String!
    level: String!
}

type RootQuery{
    docs: [Doc!]!
}

type RootMutation{
    createDoc(docInput: InputDoc) : Doc
    createUser(userInput: InputUser) : User
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);