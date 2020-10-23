export const schema = gql`
  type Post {
    id: Int!
    title: String!
    body: String!
    author: String!
    createdAt: DateTime!
  }

  type Query {
    posts: [Post!]!
    post(id: Int!): Post
  }

  input CreatePostInput {
    title: String!
    body: String!
    author: String!
  }

  input UpdatePostInput {
    title: String
    body: String
    author: String
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post!
    updatePost(id: Int!, input: UpdatePostInput!): Post!
    deletePost(id: Int!): Post!
  }
`
