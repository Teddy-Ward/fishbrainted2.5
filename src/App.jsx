import { useState } from 'react'
import './App.css'
import Admin from './pages/Admin'
import Footer from './components/Footer'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Admin />
    <Footer />
    </>
  )
}

export default App
