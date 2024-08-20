import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { presService } from '../services/pres.service'
import { slideService } from '../services/slide.service'

export function PresPage() {
    const { title } = useParams()
    const [pres, setPres] = useState(null)
    const [slide, setSlide] = useState(null)

    useEffect(() => {
        async function fetchPres() {
            try {
                const presData = await presService.getByTitle(title)
                setPres(presData)
            } catch (err) {
                console.error('Error fetching presentation:', err)
            }
        }
        fetchPres()
    }, [title])

    useEffect(() => {
        async function slideNav() {
            if (pres && pres.slides.length > 0) {
                try {
                    const calledSlide = await slideService.getById(pres.slides[0])
                    setSlide(calledSlide)
                } catch (err) {
                    console.error('Error fetching slide:', err)
                }
            }
        }
        slideNav()
    }, [pres]) 

    if (!pres||!slide) return <p>Loading...</p>

    async function slideNav() {
        console.log(pres.slides[0])
        const calledSlide = await slideService.getById(pres.slides[0])
        setSlide(calledSlide)
    }
    console.log(pres.slides, 'slide', slide)
    return (
        <div>
            <h2>{slide.header}</h2>
            <h2>{pres.title}</h2>
            <p>{pres.description}</p>

        </div>
    );
}