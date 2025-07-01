// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import PostList from './pages/PostList'
import PostDetail from './pages/PostDetail'
import Navigation from './components/Navigation';
import PostCreate from './pages/PostCreate';
import PostModify from './pages/PostModify';

function App() {

  return (
      <BrowserRouter>
      <Navigation/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/posts' element={<PostList/>}/>
          <Route path='/posts/:postId' element={<PostDetail/>}/>
          <Route path='/posts/create' element={<PostCreate/>}/>
          <Route path='/posts/:postId/edit' element={<PostModify/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
