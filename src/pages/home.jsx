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
    const [presData, setPresData] = useState({ title: '', authors: '', dateOfPub: new Date, slides: [] })
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
            const dateOfPub = getDate(Date.now())
            const newPres = { ...presData, dateOfPub }
            const addedPres = await presService.create(newPres)
            setPress(prevPress => [...prevPress, addedPres])
            setPresData(({ title: '', authors: '', dateOfPub: new Date, slides: [] }))

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
    function getDate(timestamp) {
        const today = new Date(timestamp)
        const yyyy = today.getFullYear()
        let mm = today.getMonth() + 1
        let dd = today.getDate()

        if (dd < 10) dd = '0' + dd
        if (mm < 10) mm = '0' + mm

        const formattedToday = dd + '/' + mm + '/' + yyyy
        return formattedToday
    }
    return (
        <div className="home">
            <button onClick={() => toggleModal(true)}>Add New Presentation</button>
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
                    <p className="no-content">No presentations available</p>
                )}
            </div>
        </div>
    )
}
