import './App.css';
import { useState, useEffect } from 'react';


const Button = () => {
  return (
    <div className='btn'>Button</div>

  )
}

const Card = (props) => {
  return (
    <div className='p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4' >
      <div class="text-xl font-medium text-black">ChitChat</div>
        <p class="text-slate-500">You have a new message!</p>
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
      <TopNavBarItem title="Business" href="/solutions"/>
      <TopNavBarItem title="Problems"/>
      <TopNavBarItem title="Solutions"/>
  </nav>
  )
}


const App = () => {

  const [counter, setCounter] = useState(0)

  useEffect(() => {
    setCounter(199)
  }, [])

  return (
    <div className="App bg-blue-700">
      <TopNavBar/>
      
      

      <div className='bg-red-100 border border-red-400 text-red-700 px-4 rounded relative m-5' role="alert">
          <strong className='font-bold'>Alert</strong>
          <span className='block sm:inline'>There is a problem</span>
      </div>
      
    <Card>
      <p>Muh</p>
    </Card>


      <div className='flex flex-wrap center items-center border mt-4'>
        <button className='btn ' onClick={() => setCounter(counter-1)}>-</button>
        <br></br>
        <h1>{counter}</h1>
        <button className='btn' onClick={() => setCounter(counter+1)}>+</button>
      </div>
      <div className='w-full bg-slate-500 m-6'>
      </div>

      
    </div>
  );
}

export default App;
