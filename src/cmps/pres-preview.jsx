import React from 'react';
import { Link } from 'react-router-dom';

export function PresPreview({ presentation }) {
    return (
        <div>
            <Link to={`/pres/${presentation.title}`}>
                <h4>{presentation.title}</h4>
                <p>{presentation.description}</p>
            </Link>
        </div>
    );
}