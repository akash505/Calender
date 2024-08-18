import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { EventContext } from '../context/EventContext';
import EventDetails from '../components/EventDetails';

const EventDetailsPage = () => {
    const { id } = useParams();
    const { events } = useContext(EventContext);
    const event = events.find(event => event.id === parseInt(id));

    return event ? <EventDetails event={event} /> : <p>Event not found</p>;
};

export default EventDetailsPage;
