import Bubble from 'src/components/Bubble'

export const QUERY = gql`
  query FIND_BUBBLE_BY_ID($id: Int!) {
    bubble: bubble(id: $id) {
      id
      value
    }
  }
`
export const beforeQuery = (props) => {
  return { variables: props }
}

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Bubble not found</div>

export const Success = ({ bubble }) => {
  return <Bubble bubble={bubble} />
}
