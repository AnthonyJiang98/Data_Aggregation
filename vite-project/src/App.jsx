import { useState } from 'react'
import Weather from './Weather'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div>
      <Weather/>
    </div>
    </>
  )
}

export default App
