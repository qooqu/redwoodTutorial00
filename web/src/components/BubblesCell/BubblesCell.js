import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

export const QUERY = gql`
  query BUBBLES {
    bubbles {
      id
      value
    }
  }
`
const UPDATE_BUBBLE_MUTATION = gql`
  mutation UpdateBubbleMutation($id: Int!, $input: UpdateBubbleInput!) {
    updateBubble(id: $id, input: $input) {
      id
      value
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No bubbles yet. '}
      <Link to={routes.newBubble()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ bubbles }) => {
  const [update] = useMutation(UPDATE_BUBBLE_MUTATION)
  const handleClick = (id, data) => {
    data.value = data.value + 25
    data.value = data.value > 100 ? 0 : data.value
    update({
      variables: { id, input: data },
      optimisticResponse: {
        __typename: 'Mutation',
        updateBubble: {
          __typename: 'Bubble',
          id: id,
          value: data.value,
        },
      },
    })
  }
  return bubbles.map((bubble) => (
    <button
      key={bubble.id}
      className="h-24 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500"
      onClick={() => handleClick(bubble.id, { value: bubble.value })}
    >
      {bubble.value}
    </button>
  ))
}
