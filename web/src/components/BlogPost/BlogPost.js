import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import BubblesCell from 'src/components/BubblesCell'

const UPDATE_POST_MUTATION = gql`
  mutation UpdatePostMutation($id: Int!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
      title
    }
  }
`
const BlogPost = ({ post }) => {
  const [update] = useMutation(UPDATE_POST_MUTATION)
  const handleClick = (id, data) => {
    update({
      variables: { id, input: data },
      optimisticResponse: {
        __typename: 'Mutation',
        updatePost: {
          __typename: 'Post',
          id: id,
          title: data.title,
        },
      },
    })
  }
  return (
    <article className="max-w-sm rounded overflow-hidden shadow-lg p-8 mb-8 last:mb-0 bg-green-100">
      <header>
        <h2 className="text-3xl font-bold mb-4 mt-0">
          <Link to={routes.blogPost({ id: post.id })}>{post.title}</Link>
        </h2>
      </header>
      <div className="text-gray-700 text-sm">{post.body}</div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => handleClick(post.id, { title: post.title + 'yo' })}
      >
        Add yo
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() =>
          handleClick(post.id, { title: post.title.replace('yo', '') })
        }
      >
        Remove yo
      </button>
      {/* <BubblesCell /> */}
    </article>
  )
}

export default BlogPost
