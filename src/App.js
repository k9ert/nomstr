import './App.css';

import {Layout} from './pages/Layout.js'
import {Home} from './pages/Home.js'
import {About} from './pages/About.js'
import {Tag} from './pages/Tag.js'
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
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="/tag/:tag" element={<Tag/>}/>
          <Route path="/about" element={<About/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}



export default App;
