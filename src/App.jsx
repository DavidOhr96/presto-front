import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import routes from './routes'


function App() {

  return (

    <div>
      <main>
        <Routes>
          {routes.map(route => (
            <Route key={route.path} element={route.component} path={route.path} />
          ))}
        </Routes>
      </main>

    </div>

  )
}

export default App
