import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import BubbleForm from 'src/components/BubbleForm'

export const QUERY = gql`
  query FIND_BUBBLE_BY_ID($id: Int!) {
    bubble: bubble(id: $id) {
      id
      value
    }
  }
`
const UPDATE_BUBBLE_MUTATION = gql`
  mutation UpdateBubbleMutation($id: Int!, $input: UpdateBubbleInput!) {
    updateBubble(id: $id, input: $input) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ bubble }) => {
  const { addMessage } = useFlash()
  const [updateBubble, { loading, error }] = useMutation(
    UPDATE_BUBBLE_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.bubbles())
        addMessage('Bubble updated.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input, id) => {
    updateBubble({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Bubble {bubble.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <BubbleForm
          bubble={bubble}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
