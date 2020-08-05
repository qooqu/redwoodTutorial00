import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'

const BlogLayout = ({ children }) => {
  const { logIn, logOut, isAuthenticated, currentUser } = useAuth()

  return (
    <>
      <div className="bg-red-400">
        <div className="container mx-auto shadow-lg">
          <header>
            <h1 className="text-5xl font-bold text-pink-400 py-6 pl-10 bg-green-400">
              <Link to={routes.home()}>Bloopy's Blog</Link>
            </h1>
            <nav className="py-4 pl-10 bg-pink-400">
              <ul className="flex">
                <li className="mr-6">
                  <Link
                    class="text-yellow-500 hover:text-blue-800"
                    to={routes.home()}
                  >
                    Home
                  </Link>
                </li>
                <li className="mr-6">
                  <Link
                    class="text-yellow-500 hover:text-blue-800"
                    to={routes.about()}
                  >
                    About
                  </Link>
                </li>
                <li className="mr-6">
                  <Link
                    class="text-yellow-500 hover:text-blue-800"
                    to={routes.contact()}
                  >
                    Contact
                  </Link>
                </li>
                <li className="mr-6">
                  <a
                    className="text-yellow-500 hover:text-blue-800"
                    href="#"
                    onClick={isAuthenticated ? logOut : logIn}
                  >
                    {isAuthenticated ? 'Log out' : 'Log in'}
                  </a>
                </li>
                {isAuthenticated && (
                  <li className="mr-6 text-yellow-500 hover:text-blue-800">
                    {currentUser.email}
                  </li>
                )}
              </ul>
            </nav>
          </header>
          <main className="p-8 bg-blue-400">{children}</main>
        </div>
      </div>
    </>
  )
}

export default BlogLayout
