export const schema = gql`
  type Bubble {
    id: Int!
    value: Int!
  }

  type Query {
    bubbles: [Bubble!]!
    bubble(id: Int!): Bubble
  }

  input CreateBubbleInput {
    value: Int!
  }

  input UpdateBubbleInput {
    value: Int
  }

  type Mutation {
    createBubble(input: CreateBubbleInput!): Bubble!
    updateBubble(id: Int!, input: UpdateBubbleInput!): Bubble!
    deleteBubble(id: Int!): Bubble!
  }
`
