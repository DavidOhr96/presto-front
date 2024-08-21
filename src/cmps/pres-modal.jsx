import React from 'react'
export function PresModal({isOpen, presData, onChange, onSave, onClose}){
    if (!isOpen) return null

    return(
        <div className="pres-modal modal">
            <div className="modal-content">
                {console.log(presData)}
                <input
                    type="text"
                    placeholder= 'Please add title'
                    value={presData.title}
                    onChange={(e) => onChange({ ...presData, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder='Who are the author/s?'
                    value={presData.authors}
                    onChange={(e) => onChange({ ...presData, authors: e.target.value })}
                />
                
                <button onClick={onSave}> Add presentation</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )
}