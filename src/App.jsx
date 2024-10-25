import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import Songs from './pages/music'
import Dashboard from './pages/dashboard'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='songs' element={<Songs />} />
          <Route path='dashboard' element={<Dashboard />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
