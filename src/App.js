import './App.css';

import {Layout} from './pages/Layout.js'
import {Home} from './pages/Home.js'
import {About} from './pages/About.js'
import {NostrPage} from './pages/NostrPage'
import {Tag} from './pages/Tag.js'
import {TagListPage} from './pages/TagListPage'
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
          <Route path="/tags" element={<TagListPage/>}/>
          <Route path="/nostr" element={<NostrPage/>}/>
          <Route path="/about" element={<About/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}



export default App;
