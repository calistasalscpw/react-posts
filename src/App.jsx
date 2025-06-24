import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Routers, Route} from 'react-router-dom';
import Home from './pages/Home'
import PostList from './pages/PostList'
import PostDetail from './pages/PostDetail'

function App() {

  return (
      <BrowserRouter>
      <div>Navigation bar is here</div>
        <Routers>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/posts' element={<PostList/>}></Route>
          <Route path='/posts/:postId' element={<PostDetail/>}></Route>
        </Routers>
      </BrowserRouter>
  )
}

export default App
