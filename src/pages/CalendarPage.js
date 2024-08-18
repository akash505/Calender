import React, { useState } from 'react';
import Calendar from '../components/Calendar';
import EventForm from '../components/EventForm';
import Modal from '../components/Modal';

const CalendarPage = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <div>
            <Calendar />
            {/* <button onClick={() => setModalOpen(true)}>Add Event</button> */}
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <EventForm onClose={() => setModalOpen(false)} />
            </Modal>
        </div>
    );
};

export default CalendarPage;
