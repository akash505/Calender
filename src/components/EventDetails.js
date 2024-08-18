import React, { useContext } from 'react';
import { EventContext } from '../context/EventContext';
import styled from 'styled-components';

const EventDetails = ({ event, onClose, onEdit }) => {
    const { deleteEvent } = useContext(EventContext);

    const handleDelete = () => {
        deleteEvent(event.id);
        onClose();
    };

    return (
        <DetailsWrapper>
            <h2>{event.title}</h2>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Category:</strong> {event.category}</p>
            <ButtonGroup>
                <button onClick={onEdit}>Edit</button>
                <button onClick={handleDelete} style={{ backgroundColor: '#f44336' }}>Delete</button>
                <button onClick={onClose}>Close</button>
            </ButtonGroup>
        </DetailsWrapper>
    );
};

export default EventDetails;

// Styled Components

const DetailsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    

    button {
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        font-size: 1rem;
        cursor: pointer;
    }

    button:first-of-type {
        background-color: #4CAF50;
        color: white;
    }

    button:first-of-type:hover {
        background-color: #45a049;
    }

    button:last-of-type:hover {
        background-color: #e53935;
    }
`;
