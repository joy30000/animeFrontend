import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import About from './pages/about'
import Contact from './pages/contact'
import Homepage from './pages/Homepage'
import AnimeDetail from './pages/AnimeDetail'
import Episode from './pages/Episode'
import Category from './pages/Category'
import SearchResult from './pages/SearchResult'


function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/homepage' element={<Homepage/>} />
      <Route path='/anime_detail' element={<AnimeDetail/>} />
      <Route path='/anime_episode' element={<Episode/>}  />
      <Route path='/home_cat' element={<Category/>}  />
      <Route path='/search' element={<SearchResult/>}  />
    </Routes>
    

    </>
  )
}

export default App