import React from 'react'
import { Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import routes from './routes'
// import { AppHeader } from './cmps/header'
// import { AppFooter } from './cmps/footer'

function App() {

  return (

    <div>
      {/* <AppHeader /> */}
      <main>
        <Routes>
          {routes.map(route =>(
             <Route key={route.path} element={route.component} path={route.path} />
            ))}
        </Routes>
      </main>
      {/* <AppFooter /> */}
    </div>

  )
}

export default App
