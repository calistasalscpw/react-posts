import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import PostList from './pages/PostList'
import PostDetail from './pages/PostDetail'
import Navigation from './components/Navigation';

function App() {

  return (
      <BrowserRouter>
      <Navigation>Navigation bar is here</Navigation>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/posts' element={<PostList/>}/>
          <Route path='/posts/:postId' element={<PostDetail/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
