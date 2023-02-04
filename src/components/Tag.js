import { Link } from "react-router-dom";

const Tag = (props) => {
    const tagString = typeof props.tag === 'string' ? props.tag : props.tag.name;
    return (
      <div className='rounded-lg bg-gray-500 py-0 px-3 m-1'>
        <Link to={"/tag/"+tagString}>
            <span className='text-sm'>{tagString}</span>
        </Link>
      </div>
    )
  }

export { Tag }