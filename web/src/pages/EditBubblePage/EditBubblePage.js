import BubblesLayout from 'src/layouts/BubblesLayout'
import EditBubbleCell from 'src/components/EditBubbleCell'

const EditBubblePage = ({ id }) => {
  return (
    <BubblesLayout>
      <EditBubbleCell id={id} />
    </BubblesLayout>
  )
}

export default EditBubblePage
