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

    async function addNewPres() {
        try {
            const newPres = { title: 'New Presentation3', description: 'Description of the new presentation', slides: [] }
            const addedPres = await presService.create(newPres)
            setPress(prevPress => [...prevPress, addedPres])
        } catch (err) {
            console.error('Error adding presentation:', err)
        }
    }

    async function deletePres(title) {
        try {
            await presService.remove(title)
            setPress(prevPress => prevPress.filter(p => p.title !== title))
        } catch (err) {
            console.error('Error deleting presentation:', err)
        }
    }

    return (
        <section>
            <div>
                <h3>Presentations:</h3>
                <button onClick={addNewPres}>Add New Presentation</button> {/* Add Presentation Button */}
                {press.length > 0 ? (
                    press.map(p => (
                        <div key={p.id}>
                            <PresPreview presentation={p} />
                            <button onClick={() => deletePres(p.title)}>Delete</button> {/* Delete Button */}
                        </div>
                    ))) : (
                    <p>No presentations available</p>
                )}
            </div>
        </section>
    )
}
