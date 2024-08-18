import React, { useState, useContext } from 'react';
import { EventContext } from '../context/EventContext';
import styled from 'styled-components';

const EventForm = ({ event, onClose }) => {
    const { addEvent, editEvent } = useContext(EventContext);
    const [title, setTitle] = useState(event?.title || '');
    const [date, setDate] = useState(event?.date || '');
    const [category, setCategory] = useState(event?.category || 'Work');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (title.trim() === '' || date.trim() === '') {
            alert('Title and date are required.');
            return;
        }

        const newEvent = {
            id: event ? event.id : Date.now(),
            title,
            date,
            category,
        };

        if (event) {
            editEvent(event.id, newEvent);
        } else {
            addEvent(newEvent);
        }
        onClose();
    };

    return (
        <FormWrapper onSubmit={handleSubmit}>
            <FormGroup>
                <label htmlFor="title">Event Title</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </FormGroup>
            <FormGroup>
                <label htmlFor="date">Event Date</label>
                <input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </FormGroup>
            <FormGroup>
                <label htmlFor="category">Category</label>
                <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Other">Other</option>
                </select>
            </FormGroup>
            <ButtonGroup>
                <button type="submit">{event ? 'Update Event' : 'Add Event'}</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </ButtonGroup>
        </FormWrapper>
    );
};

export default EventForm;

// Styled Components

const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    label {
        margin-bottom: 5px;
        font-weight: bold;
    }
    input, select {
        padding: 8px;
        border-radius: 4px;
        border: 1px solid #ccc;
        font-size: 1rem;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;

    button {
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        font-size: 1rem;
        cursor: pointer;
    }

    button[type="submit"] {
        background-color: #4CAF50;
        color: white;
    }

    button[type="submit"]:hover {
        background-color: #45a049;
    }

    button[type="button"] {
        background-color: #f44336;
        color: white;
    }

    button[type="button"]:hover {
        background-color: #e53935;
    }
`;
