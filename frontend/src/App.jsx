
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Success from './components/Success'
import Cancel from './components/Cancel'

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/success" element={<Success/>}/>
          <Route path="/cancel" element={<Cancel/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
