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
import Signup from './pages/Signup';
import Login from './pages/Login';

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
          <Route path='/auth/signup' element={<Signup/>}/>
          <Route path='/auth/login' element={<Login/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
