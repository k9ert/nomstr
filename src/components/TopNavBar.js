import { Link } from "react-router-dom";

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
        <TopNavBarItem title="TagCloud" href="/tags"/>
        <TopNavBarItem title="Nostr" href="/nostr"/>
        <TopNavBarItem title="About" href="/about"/>

    </nav>
    )
  }

export {TopNavBar}