import { useState } from 'react'
import './App.css'
import Navbar from "./components/Navbar"
import Manager from './components/Manager'
import Footer from './components/Footer'
function App() {

  return (
    <>
    <Navbar/>
    <div className='h-[80.5vh] overflow-auto'>
    <Manager/>
    </div>
    <Footer/>
    </>
  )
}

export default App
