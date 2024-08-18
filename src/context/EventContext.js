import React, { createContext, useState } from 'react';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [filter, setFilter] = useState('All');

    const addEvent = (event) => setEvents([...events, event]);

    const editEvent = (id, updatedEvent) => {
        setEvents(events.map(event => (event.id === id ? updatedEvent : event)));
    };

    const deleteEvent = (id) => {
        setEvents(events.filter(event => event.id !== id));
    };

    const filteredEvents = filter === 'All' ? events : events.filter(event => event.category === filter);

    return (
        <EventContext.Provider value={{ events: filteredEvents, addEvent, editEvent, deleteEvent, setFilter }}>
            {children}
        </EventContext.Provider>
    );
};
