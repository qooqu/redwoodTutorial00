import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'

const BlogLayout = ({ children }) => {
  const { logIn, logOut, isAuthenticated, currentUser } = useAuth()

  return (
    <>
      <div className="bg-teal-200">
        <div className="container mx-auto bg-blue-100">
          <header className="pb-8 bg-orange-300">
            <h1 className="text-5xl font-bold mb-4 mt-0">
              <Link to={routes.home()}>Redwood Blog</Link>
            </h1>
            <nav className="bg-pink-100">
              <ul className="flex">
                <li className="mr-6">
                  <Link
                    class="text-blue-500 hover:text-blue-800"
                    to={routes.about()}
                  >
                    About
                  </Link>
                </li>
                <li className="mr-6">
                  <Link
                    class="text-blue-500 hover:text-blue-800"
                    to={routes.contact()}
                  >
                    Contact
                  </Link>
                </li>
                <li className="mr-6">
                  <a
                    className="text-blue-500 hover:text-blue-800"
                    href="#"
                    onClick={isAuthenticated ? logOut : logIn}
                  >
                    {isAuthenticated ? 'Log out' : 'Log in'}
                  </a>
                </li>
                {isAuthenticated && (
                  <li className="mr-6 text-blue-500 hover:text-blue-800">
                    {currentUser.email}
                  </li>
                )}
              </ul>
            </nav>
          </header>
          <main>{children}</main>
        </div>
      </div>
    </>
  )
}

export default BlogLayout
