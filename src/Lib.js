

  
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
  
  export { Card, Alert};