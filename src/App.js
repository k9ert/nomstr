import './App.css';


import {Home} from './pages/Home.js'
import {About} from './pages/About.js'
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/about" element={<About/>}/>
      </Routes>
    </BrowserRouter>
  );
}



export default App;
