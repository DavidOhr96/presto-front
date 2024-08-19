import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { presService } from '../services/pres.service';

export function PresPage() {
    const { title } = useParams();
    const [pres, setPres] = useState(null);

    useEffect(() => {
        async function fetchPres() {
            try {
                const presData = await presService.getByTitle(title);
                setPres(presData);
            } catch (err) {
                console.error('Error fetching presentation:', err);
            }
        }
        fetchPres();
    }, [title]);

    if (!pres) return <p>Loading...</p>;

    return (
        <div>
            <h2>{pres.title}</h2>
            <p>{pres.description}</p>
        </div>
    );
}