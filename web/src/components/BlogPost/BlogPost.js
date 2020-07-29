import { Link, routes } from '@redwoodjs/router'

const BlogPost = ({ post }) => {
  return (
    <article className="max-w-sm rounded overflow-hidden shadow-lg p-8 m-8 bg-green-100">
      <header>
        <h2 className="text-3xl font-bold mb-4 mt-0">
          <Link to={routes.blogPost({ id: post.id })}>{post.title}</Link>
        </h2>
      </header>
      <div className="text-gray-700 text-sm">{post.body}</div>
    </article>
  )
}

export default BlogPost
