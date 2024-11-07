import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import Songs from './pages/music'
import Dashboard from './pages/dashboard'

/**
 * App component that sets up the main routing for the application.
 * 
 * This component uses React Router to define the different routes available in the app.
 * 
 * Routes:
 * - `/` renders the Home component
 * - `/login` renders the Login component
 * - `/songs` renders the Songs component
 * - `/dashboard` renders the Dashboard component
 * 
 * Example usage:
 * ```jsx
 * import React from 'react';
 * import ReactDOM from 'react-dom';
 * import App from './App';
 * 
 * ReactDOM.render(<App />, document.getElementById('root'));
 * ```
 * 
 * @returns {JSX.Element} The rendered App component with routing.
 */
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