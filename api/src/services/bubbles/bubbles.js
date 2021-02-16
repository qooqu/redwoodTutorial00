import { db } from 'src/lib/db'

export const bubbles = () => {
  return db.bubble.findMany()
}

export const bubble = ({ id }) => {
  return db.bubble.findUnique({
    where: { id },
  })
}

export const createBubble = ({ input }) => {
  return db.bubble.create({
    data: input,
  })
}

export const updateBubble = ({ id, input }) => {
  return db.bubble.update({
    data: input,
    where: { id },
  })
}

export const deleteBubble = ({ id }) => {
  return db.bubble.delete({
    where: { id },
  })
}
