import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/BubblesCell'

const DELETE_BUBBLE_MUTATION = gql`
  mutation DeleteBubbleMutation($id: Int!) {
    deleteBubble(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const BubblesList = ({ bubbles }) => {
  const { addMessage } = useFlash()
  const [deleteBubble] = useMutation(DELETE_BUBBLE_MUTATION, {
    onCompleted: () => {
      addMessage('Bubble deleted.', { classes: 'rw-flash-success' })
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete bubble ' + id + '?')) {
      deleteBubble({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Value</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {bubbles.map((bubble) => (
            <tr key={bubble.id}>
              <td>{truncate(bubble.id)}</td>
              <td>{truncate(bubble.value)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.bubble({ id: bubble.id })}
                    title={'Show bubble ' + bubble.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editBubble({ id: bubble.id })}
                    title={'Edit bubble ' + bubble.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete bubble ' + bubble.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(bubble.id)}
                  >
                    Delete
                  </a>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BubblesList
