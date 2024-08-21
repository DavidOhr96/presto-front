import React from 'react'

export function SlideModal({ isOpen, slideData, onChange, onSave, onClose, isEditing }) {
    if (!isOpen) return null

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>{isEditing ? 'Edit Slide' : 'Add New Slide'}</h3>
                <input
                    type="text"
                    placeholder={isEditing ? slideData.header : 'Please add header'}
                    value={slideData.header}
                    onChange={(e) => onChange({ ...slideData, header: e.target.value })}
                />
                <input
                    type="text"
                    placeholder={isEditing ? slideData.subHeader : 'You can add a sub-header'}
                    value={slideData.subHeader}
                    onChange={(e) => onChange({ ...slideData, subHeader: e.target.value })}
                />
                <textarea
                    placeholder={isEditing ? slideData.content : 'Please add content'}
                    value={slideData.content}
                    onChange={(e) => onChange({ ...slideData, content: e.target.value })}
                />
                <button onClick={onSave}>{isEditing ? 'Update Slide' : 'Add Slide'}</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )
}