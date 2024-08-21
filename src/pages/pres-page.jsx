import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { presService } from '../services/pres.service'
import { slideService } from '../services/slide.service'
import { SlideModal } from '../cmps/slide-modal'

export function PresPage() {
    const { title } = useParams()
    const [pres, setPres] = useState(null)
    const [slide, setSlide] = useState(null)
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    const [slideData, setSlideData] = useState({ header: '', subHeader: '', content: '' })
    const [editingSlideId, setEditingSlideId] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
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


    function navigateSlides(direction) {
        const newIndex = currentSlideIndex + direction
        if (newIndex >= 0 && newIndex < pres.slides.length) {
            setCurrentSlideIndex(newIndex)
        }
    }

    async function saveSlide() {
        try {
            if (editingSlideId) {
                await slideService.save(slideData)
                setSlide(slideData)
            } else {
                const newSlide = await slideService.save(slideData)
                const updatedPres = { ...pres, slides: [...pres.slides, newSlide._id] }
                setPres(updatedPres)
            }
            setSlideData({ header: '', subHeader: '', content: '' })
            toggleModal(0)
        } catch (err) {
            console.error('Error saving slide:', err)
        }
    }

    async function deleteSlide() {
        try {
            await slideService.remove(slide._id)
            const updatedSlides = pres.slides.filter(s => s !== slide._id)
            const updatedPres = { ...pres, slides: updatedSlides }
            setPres(updatedPres)
            setCurrentSlideIndex(currentSlideIndex - 1)
        } catch (err) {
            console.error('Error deleting slide:', err)
        }
    }

    function goHome() {
        navigate('/')
    }

    function toggleModal(state) {
        setIsModalOpen(Boolean(state))
    }

    function prepModal(slideId) {
        if (slideId) {
            setEditingSlideId(slideId)
            setSlideData(slide)
        } else {
            setEditingSlideId(null)
            setSlideData({ presTitle: pres.title, header: '', subHeader: '', content: '' })
        }
        toggleModal(1)
    }

    if (!pres) return <p>Loading...</p>
    return (
        <div className='pres-page'>
        <button onClick={goHome}>Back to Home</button>
        {pres.slides.length > 0 ? (
            <>
                {slide ? (
                    <>
                        <div className="slide-frame">
                            <div className='slide-content'>
                                {currentSlideIndex === 0 && (
                                    <div>
                                        <h2>{pres.title}</h2>
                                        <p>Presentation by: {pres.authors}</p>
                                        <p>Created on: {pres.dateOfPub}</p>
                                    </div>
                                )}
                                <h2>{slide.header}</h2>
                                <h3>{slide.subHeader}</h3>
                                <p>{slide.content}</p>
                            </div>
                        </div>
    
                        <div className="slide-buttons">
                            <button
                                onClick={() => navigateSlides(-1)}
                                className={currentSlideIndex === 0 ? 'disabled' : ''}>
                                Previous Slide
                            </button>
                            <button
                                onClick={() => navigateSlides(1)}
                                className={currentSlideIndex === pres.slides.length - 1 ? 'disabled' : ''}>
                                Next Slide
                            </button>
                            <button onClick={deleteSlide}>Delete Slide</button>
                            <button onClick={() => prepModal(slide._id)}>Edit Slide</button>
                            <button onClick={() => prepModal(null)}>Add New Slide</button>
                        </div>
                    </>
                ) : (
                    <p>Loading slide data...</p>
                )}
            </>
        ) : (
            <div className="no-content">
                <p>No slides available. Please add a slide.</p>
                <button onClick={() => prepModal(null)}>Add New Slide</button>
            </div>
        )}
    
        <SlideModal
            isOpen={isModalOpen}
            slideData={slideData}
            onChange={setSlideData}
            onSave={saveSlide}
            onClose={() => toggleModal(0)}
            isEditing={!!editingSlideId}
        />
    </div>
    )}