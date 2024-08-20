import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { presService } from '../services/pres.service'
import { slideService } from '../services/slide.service'

export function PresPage() {
    const { title } = useParams()
    const [pres, setPres] = useState(null)
    const [slide, setSlide] = useState(null)
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    const navigate = useNavigate()

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
        async function fetchSlide() {
            if (pres && pres.slides.length > 0) {
                try {
                    const slideId = pres.slides[currentSlideIndex]
                    const calledSlide = await slideService.getById(slideId)
                    setSlide(calledSlide)
                } catch (err) {
                    console.error('Error fetching slide:', err)
                }
            }
        }
        fetchSlide()
    }, [pres, currentSlideIndex])

    if (!pres || !slide) return <p>Loading...</p>

    function navigateSlides(direction) {
        const newIndex = currentSlideIndex + direction
        if (newIndex >= 0 && newIndex < pres.slides.length) {
            setCurrentSlideIndex(newIndex)
        }
    }
    function goHome() {
        navigate('/')
    }
    console.log(pres.slides, 'slide', slide,)
    return (
        <div>
            <button onClick={goHome}>Back to Home</button> {/* Back to Home Button */}
            <h2>{pres.title}</h2>
            <p>{pres.description}</p>

            <div>
                <h3>{slide.header}</h3>
                <h3>{slide._id}</h3>
                <p>{slide.content}</p>

                <button onClick={() => navigateSlides(-1)} disabled={currentSlideIndex === 0}>
                    Previous Slide
                </button>
                <button onClick={() => navigateSlides(1)} disabled={currentSlideIndex === pres.slides.length - 1}>
                    Next Slide
                </button>
            </div>
        </div>
    )
}