import { Tag } from "./Tag.js"

  const TagCloud = (props) => {
    const sortedTags = [...props.tags].sort((a, b) => a.name.localeCompare(b.name));
  
    return (
      <div className='flex justify-center flex-wrap max-w-4xl'>
        { 
          sortedTags.map((tag) => (
            <Tag key={tag.name} tag={tag}/>
          ))
        }
      </div>
    )
  }

export { TagCloud }