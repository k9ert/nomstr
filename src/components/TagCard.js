import { Card } from '../Lib'

const TagCard = (props) => {

    const tag = props.tag
    return (
      <Card title={tag.name} className="py-7">
        {tag.count}
      </Card>
    )
  }

export {TagCard}