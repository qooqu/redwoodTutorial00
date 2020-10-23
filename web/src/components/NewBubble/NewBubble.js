import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import BubbleForm from 'src/components/BubbleForm'

import { QUERY } from 'src/components/BubblesCell'

const CREATE_BUBBLE_MUTATION = gql`
  mutation CreateBubbleMutation($input: CreateBubbleInput!) {
    createBubble(input: $input) {
      id
    }
  }
`

const NewBubble = () => {
  const { addMessage } = useFlash()
  const [createBubble, { loading, error }] = useMutation(
    CREATE_BUBBLE_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.bubbles())
        addMessage('Bubble created.', { classes: 'rw-flash-success' })
      },
      // This refetches the query on the list page. Read more about other ways to
      // update the cache over here:
      // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
    }
  )

  const onSave = (input) => {
    createBubble({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Bubble</h2>
      </header>
      <div className="rw-segment-main">
        <BubbleForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewBubble
