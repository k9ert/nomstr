import { Link } from "react-router-dom";
import { Tag } from './components/Tag.js'
import { BookmarkCard } from "./components/BookmarkCard.js";

  
  const Card = (props) => {
    return (
      <div className='p-6 max-w-5xl mx-auto bg-gray-300 rounded-xl shadow-md block items-center mt-2' >
        <div className="text-xl font-medium text-black">{props.title}</div>
          <p className="text-slate-500">{props.message}</p>
          <div>
            {props.children}
          </div>
      </div>
      
    )
  }
  
  const TopNavBarItem = (props) => {
  
    return (
      <div className='w-full block flex-grow sm:flex sm:items-center sm:w-auto' >
        <div className='text-sm sm:flex-grow'>
          <Link to={props.href} className='block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white'>
            {props.title}
          </Link>
        </div>
      </div>
    )
  }
  
  const TopNavBar = () => {
  
    return (
      <nav className='flex items-center justify-between flex-wrap bg-gray-800 p-6'>
        <div className='flex items-center flex-shrink-0 text-white mr-6'>
          <span className='font-bold text-xl'>nomstr</span>
        </div>
        <TopNavBarItem title="Home" href="/"/>
        <TopNavBarItem title="About" href="/about"/>
    </nav>
    )
  }
  
  const TagCloud = (props) => {
  
    return (
      <div className='flex justify-center flex-wrap max-w-4xl'>
        { 
          props.tags.map((tag) => (
            <Tag key={tag.name} tag={tag}/>
          ))
        }
      </div>
    )
  }
  


  const LinkList = (props) => {
    const bookmarks = props.bookmarks
    return (
        <div className='col-span-5'>

          {bookmarks.map((bookmark) => (
            <BookmarkCard key={bookmark.url} bookmark={bookmark}/>
          ))
          }
        </div>

    )
  }

  const Alert = (props) => {
    const text = props.alertText

    if (text) {
        return (
            <div className='bg-red-100 border border-red-400 text-red-700 px-4 rounded relative m-5' role="alert">
                <strong className='font-bold'>Alert</strong>
                <span className='block sm:inline'>{text}</span>
            </div>
        )
    } else {
        return 
    }
  }
  
  export { Card, TopNavBar, TagCloud, LinkList, Alert};