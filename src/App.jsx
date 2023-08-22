import { useState } from 'react'
import './App.css'
import Admin from './pages/Admin'
import Footer from './components/Footer'
import Header from './components/Header'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header />
    <Admin />
    <Footer />
    </>
  )
}

export default App
