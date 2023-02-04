import { Card } from '../Lib'
import { Tag } from './Tag'

const BookmarkCard = (props) => {

    const bm = props.bookmark;
    

    return (
      <Card title={bm.title} className="py-7">
        <div className=''>
          <div className=''>
            {bm.url}
          </div>
          <div className=''>
            {bm.desc}
          </div>
          <div className='flex justify-center'>
            { 
              bm.tags.map((tag) => (
              <Tag key={tag.name} tag={tag}/>
            ))
  
            }
          </div>
          <div className='text-xs'>
            {bm.created_at}
          </div>
        </div>
      </Card>
    )
  }

export {BookmarkCard}