// Define what you want `currentUser` to return throughout your app. For example,
// to return a real user from your database, you could do something like:
//
//   export const getCurrentUser = async ({ email }) => {
//     return await db.user.findUnique({ where: { email } })
//   }

import { AuthenticationError } from '@redwoodjs/api'

import { createUser } from 'src/services/users/users'

import { db } from './db'

// old
// export const getCurrentUser = async (jwt) => {
//   return jwt
// }

// new
// export const getCurrentUser = async (decoded, { token, type }) => {
//   return decoded
// }

export const getCurrentUser = async (decoded, { _type, _token }) => {
  const data = {
    name: decoded.user_metadata.full_name,
    email: decoded.email,
    isAdmin: false,
  }
  return (
    (await db.user.findUnique({ where: { email: decoded.email } })) ||
    (await createUser({ input: data }))
  )
}

// Use this function in your services to check that a user is logged in, and
// optionally raise an error if they're not.

export const requireAuth = () => {
  if (!context.currentUser) {
    throw new AuthenticationError("You don't have permission to do that.")
  }
}
