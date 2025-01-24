import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import Header from "./components/custom/Header";
import Hero from "./components/custom/Hero";



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Hero/>
    </>
  )
}

export default App
