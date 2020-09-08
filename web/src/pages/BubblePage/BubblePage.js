import BubblesLayout from 'src/layouts/BubblesLayout'
import BubbleCell from 'src/components/BubbleCell'

const BubblePage = ({ id }) => {
  return (
    <BubblesLayout>
      <BubbleCell id={id} />
    </BubblesLayout>
  )
}

export default BubblePage
