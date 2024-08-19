import React from "react"
import routes from '../routes'
import { Link, NavLink } from 'react-router-dom'



export function HomePage() {

    return (
        <section>
            <h2>im home</h2>
            <nav>
                {routes.map(route => <NavLink key={route.path} to={route.path}>{route.label}</NavLink>)}
            </nav>

        </section>
    )
}
