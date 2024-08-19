import React from "react"
import routes from '../routes'
import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { presService } from "../services/pres.service"
import { PresPreview } from "../cmps/pres-preview"


export function HomePage() {
    const [press, setPress] = useState([])
    useEffect(() => {
        async function fetchPress() {
            try {
                const pressData = await presService.query() 
                setPress(pressData)
            } catch (err) {
                console.error('Error fetching presentations:', err)
            }
        }
        fetchPress()
    }, [])

    return (
        <section>
            <h2>im home</h2>
            <nav>
                {routes.map(route => <NavLink key={route.path} to={route.path}>{route.label}</NavLink>)}
            </nav>

            <div>
                <h3>Presentations:</h3>
                {press.length > 0 ? (
                    press.map(p =>(

                        <PresPreview key={p.id} presentation={p} />
               ) )) : (
                    <p>No presentations available</p>
                )}
            </div>
        </section>
    )
}
