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
    <>
      <button
        key={bubble.id}
        className={'h-24 w-24 rounded-full border-4'}
        onClick={() => handleClick(bubble.id, { value: bubble.value })}
      >
        {bubble.value}
      </button>
      <button
        key={bubble.id}
        className={
          'h-24 w-24 rounded-full border-4 ' +
          (bubble.value === 25 ? 'border-black' : null)
        }
        onClick={() => handleClick(bubble.id, { value: bubble.value })}
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="50%"
            cy="50%"
            r={(() => {
              switch (bubble.value) {
                case 25:
                  return '10%'
                case 50:
                  return '20%'
                case 75:
                  return '35%'
                case 100:
                  return '50%'
                default:
                  return ''
              }
            })()}
          />
        </svg>
      </button>
    </>
  ))
}
