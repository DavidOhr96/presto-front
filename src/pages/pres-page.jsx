import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { presService } from '../services/pres.service'
import { slideService } from '../services/slide.service'

export function PresPage() {
    const { title } = useParams()
    const [pres, setPres] = useState(null)
    const [slide, setSlide] = useState(null)
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    const [slideData, setSlideData] = useState(slide)
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

    if (!pres || !slide) return <p>Loading...</p>

    function navigateSlides(direction) {
        const newIndex = currentSlideIndex + direction
        if (newIndex >= 0 && newIndex < pres.slides.length) {
            setCurrentSlideIndex(newIndex)
        }
    }

    async function saveSlide(slideId) {
        try {
            if (slideId) {
                await slideService.save(slideData)
                setSlide(slideData)
            } else {
                const newSlide = await slideService.save(slideData)
                constupdatedPres = { ...pres, slides: [...pres.slides, newSlide._id] }
                setPres(updatedPres)
            }
            setSlideData({ header: '', content: '' })
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
    function openModal(slideId) {
        if (slideId) {
            setEditingSlideId(slideId)
            setSlideData(slide)
            toggleModal(true)
        } else {
            console.log('wow look nothing')
            setEditingSlideId(null)
            setSlideData({ presTitle: pres.title, header: '', content: '' })
            toggleModal(true)
        }
        // setEditingSlideId(slideId) // Set editingSlideId for editing a slide
        // toggleModal(true)
    }


    return (
        <div>
            <button onClick={goHome}>Back to Home</button> {/* Back to Home Button */}
            <h2>{pres.title}</h2>
            <p>{pres.description}</p>

            <div>
            <h3>{slide.header}</h3>
                <h3>{slide.subHeader}</h3>
                <h3>{slide._id}</h3>
                <p>{slide.content}</p>

                <button onClick={() => navigateSlides(-1)} disabled={currentSlideIndex === 0}>
                    Previous Slide
                </button>
                <button onClick={() => navigateSlides(1)} disabled={currentSlideIndex === pres.slides.length - 1}>
                    Next Slide
                </button>
                <button onClick={deleteSlide}>Delete Slide</button>

                <button onClick={() => openModal(slide._id)}>Edit Slide</button>
                <button onClick={() => openModal(null)}>Add new slide</button>
                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <h3>{editingSlideId ? 'Edit Slide' : 'Add New Slide'}</h3>
                            <input
                                type="text"
                                placeholder={editingSlideId ? slideData.header : 'please add header'}
                                value={slideData.header}
                                onChange={(e) => setSlideData({ ...slideData, header: e.target.value })}
                            />
                            <textarea
                                placeholder={editingSlideId ? slideData.subHeader : 'please add content'}
                                value={slideData.content}
                                onChange={(e) => setSlideData({ ...slideData, content: e.target.value })}
                            />
                            <button onClick={saveSlide}>{editingSlideId ? 'Update Slide' : 'Add Slide'}</button>
                            <button onClick={() => toggleModal(0)}>Close</button> {/* Button to close the modal */}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

