export const schema = gql`
  type User {
    id: Int!
    name: String
    email: String!
    isAdmin: Boolean!
  }

  type Query {
    users: [User!]!
  }

  input CreateUserInput {
    name: String
    email: String!
    isAdmin: Boolean!
  }

  input UpdateUserInput {
    name: String
    email: String
    isAdmin: Boolean
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
  }
`
