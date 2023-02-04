function extractTags(data) {
    if (!data) {
      return []
    }
    console.log(data)
    let tags = [];
    if (Array.isArray(data)) {
      data.forEach(item => {
        if (typeof item.tags === "string") {
          tags = [...tags, ...item.tags.split(",")];
        } else if (Array.isArray(item.tags)) {
          tags = [...tags, ...item.tags];
        }
      });
    } else {
      if (typeof data.tags === "string") {
        tags = [...tags, ...data.tags.split(",")];
      } else if (Array.isArray(data.tags)) {
        tags = [...tags, ...data.tags];
      }
    }
    return [...new Set(tags)];
  }
  
  
  const Card = (props) => {
    return (
      <div className='p-6 max-w-5xl mx-auto bg-gray-300 rounded-xl shadow-md block items-center mt-2' >
        <div class="text-xl font-medium text-black">{props.title}</div>
          <p class="text-slate-500">{props.message}</p>
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
          <a href={props.href} className='block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white'>
            {props.title}
          </a>
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
  
  const Tag = (props) => {
  
    return (
      <div className='rounded-lg bg-gray-500 py-0 px-3 m-1'>
        <span className='text-sm'>{props.tag}</span>
      </div>
    )
  }
  
  const TagCloud = (props) => {
  
    return (
      <div className='flex justify-center flex-wrap max-w-4xl'>
        { 
          props.tags.map((tag) => (
            <Tag tag={tag}/>
          ))
        }
      </div>
    )
  }
  
  const LinkCard = (props) => {
  
  
    const tag_array = props.tags.split(",")
    return (
      <Card title={props.title} className="py-7">
        <div className=''>
          <div className=''>
            {props.url}
          </div>
          <div className=''>
            {props.desc}
          </div>
          <div className='flex justify-center'>
            {console.log(tag_array)}
            { 
              tag_array.map((tag) => (
              <Tag tag={tag}/>
            ))
  
            }
          </div>
          <div className='text-xs'>
            {props.created_at}
          </div>
        </div>
      </Card>
    )
  }

  const LinkList = (props) => {
    const bookmarks = props.bookmarks
    return (
        <div className='col-span-5'>

          {bookmarks.map(({readlater, annotations, tags, comments, shared, url, created_at, desc, updated_at, title}) => (
            <LinkCard
              readlater={readlater}
              annotations={annotations}
              tags={tags}
              comments = {comments}
              shared= {shared}
              url = {url}
              created_at= {created_at}
              desc = {desc}
              updated_at= {updated_at}
              title= {title}/>


          ))}
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
  
  export { Card, TopNavBar, Tag, TagCloud, LinkCard, LinkList, extractTags, Alert};