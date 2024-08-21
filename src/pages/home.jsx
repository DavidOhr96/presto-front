import React from "react"
import routes from '../routes'
import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { presService } from "../services/pres.service"
import { PresPreview } from "../cmps/pres-preview"
import { PresModal } from '../cmps/pres-modal'


export function HomePage() {
    const [press, setPress] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [presData, setPresData] = useState({ title: '', authors: '', date: new Date, slides:[] })
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
            const newPres = presData
            const addedPres = await presService.create(newPres)
            setPress(prevPress => [...prevPress, addedPres])
            setPresData(({ title: '', authors: '', date: new Date, slides:[] }))

        } catch (err) {
            console.error('Error adding presentation:', err)
        }
        toggleModal(0)
    }

    async function deletePres(title) {
        try {
            await presService.remove(title)
            setPress(prevPress => prevPress.filter(p => p.title !== title))
        } catch (err) {
            console.error('Error deleting presentation:', err)
        }
    }
    function toggleModal(state) {
        setIsModalOpen(Boolean(state))
    }
    return (
            <div className="home">
                <button onClick={()=>toggleModal(true)}>Add New Presentation</button> 
                <PresModal
                isOpen={isModalOpen}
                presData={presData}
                onChange={setPresData}
                onSave={addNewPres}
                onClose={() => toggleModal(0)}
            />
                <h3>Presentations:</h3>
                <div className="pres-grid">
                {press.length > 0 ? (
                    press.map(p => (
                        <div key={p.id}>
                            <PresPreview presentation={p} />
                            <button onClick={() => deletePres(p.title)}>Delete</button>
                        </div>
                    ))) : (
                    <p >No presentations available</p>
                )}
            </div>
            </div>
    )
}
