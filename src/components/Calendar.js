import React, { useContext, useState } from 'react';
import { EventContext } from '../context/EventContext';
import styled from 'styled-components';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameDay, addMonths, subMonths, setMonth, setYear, startOfWeek, endOfWeek } from 'date-fns';
import Modal from './Modal';
import EventDetails from './EventDetails';
import EventForm from './EventForm';

const Calendar = () => {
    const { events, setFilter } = useContext(EventContext);
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const years = Array.from(new Array(50), (val, index) => index + (today.getFullYear() - 25));

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isFormOpen, setFormOpen] = useState(false);

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const firstDayOfMonth = startOfMonth(currentMonth);
    const lastDayOfMonth = endOfMonth(currentMonth);
    const startDate = startOfWeek(firstDayOfMonth);
    const endDate = endOfWeek(lastDayOfMonth);

    const days = eachDayOfInterval({
        start: startDate,
        end: endDate,
    });

    const getEventsForDay = (day) => {
        return events.filter(event => isSameDay(new Date(event.date), day));
    };

    const handleMonthChange = (event) => {
        const month = months.indexOf(event.target.value);
        setCurrentMonth(setMonth(currentMonth, month));
    };

    const handleYearChange = (event) => {
        const year = parseInt(event.target.value, 10);
        setCurrentMonth(setYear(currentMonth, year));
    };

    const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
    const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setModalOpen(true);
    };

    const handleOpenForm = (event = null) => {
        setSelectedEvent(event);
        setFormOpen(true);
    };

    const handleCloseForm = () => {
        setSelectedEvent(null);
        setFormOpen(false);
    };

    return (
        <CalendarContainer>
            <CalendarHeader>
                <button onClick={handlePrevMonth}>{"<"}</button>
                <MonthYearSelector>
                    <select value={format(currentMonth, 'MMMM')} onChange={handleMonthChange}>
                        {months.map((month, index) => (
                            <option key={index} value={month}>{month}</option>
                        ))}
                    </select>
                    <select value={format(currentMonth, 'yyyy')} onChange={handleYearChange}>
                        {years.map((year, index) => (
                            <option key={index} value={year}>{year}</option>
                        ))}
                    </select>
                </MonthYearSelector>
                <button onClick={handleNextMonth}>{">"}</button>
                <select onChange={(e) => setFilter(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Other">Other</option>
                </select>
            </CalendarHeader>

            <CalendarGrid>
                {/* Display days of the week */}
                {daysOfWeek.map((day, index) => (
                    <DayHeader key={index}>{day}</DayHeader>
                ))}
                
                {/* Display days of the month */}
                {days.map((day) => (
                    <DayCell key={day}>
                        <DayNumber>{format(day, 'd')}</DayNumber>
                        <EventsContainer>
                            {getEventsForDay(day).map(event => (
                                <Event key={event.id} onClick={() => handleEventClick(event)}>
                                    {event.title}
                                </Event>
                            ))}
                        </EventsContainer>
                    </DayCell>
                ))}
            </CalendarGrid>

            <AddEventButton onClick={() => handleOpenForm()}>Add Event</AddEventButton>

            {/* Event Details Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                {selectedEvent && (
                    <EventDetails 
                        event={selectedEvent} 
                        onClose={() => setModalOpen(false)} 
                        onEdit={() => {
                            setModalOpen(false);
                            handleOpenForm(selectedEvent);
                        }}
                    />
                )}
            </Modal>

            {/* Event Form Modal */}
            <Modal isOpen={isFormOpen} onClose={handleCloseForm}>
                <EventForm event={selectedEvent} onClose={handleCloseForm} />
            </Modal>
        </CalendarContainer>
    );
};

export default Calendar;

// Styled Components

const CalendarContainer = styled.div`
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    background-color: #EAE2B7;
    
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        padding: 15px;
    }

    @media (max-width: 480px) {
        padding: 10px;
    }
`;

const CalendarHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    
    
    

    h2 {
        margin: 0;
        font-size: 1.5rem;
        

        @media (max-width: 768px) {
            font-size: 1.25rem;
        }

        @media (max-width: 480px) {
            font-size: 1rem;
        }
    }

    button {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        

        @media (max-width: 768px) {
            font-size: 1.25rem;
        }

        @media (max-width: 480px) {
            font-size: 1rem;
        }
    }

    select {
        padding: 5px;
        font-size: 1rem;
        border-radius: 5px;
        border: 1px solid #ccc;

        @media (max-width: 768px) {
            font-size: 0.9rem;
        }

        @media (max-width: 480px) {
            font-size: 0.8rem;
        }
    }
`;

const MonthYearSelector = styled.div`
    display: flex;
    gap: 10px;
    
    

    select {
        padding: 5px;
        font-size: 1rem;
        border-radius: 5px;
        border: 1px solid #ccc;
        background-color: #4CAF50;
        color: white;

        @media (max-width: 768px) {
            font-size: 0.9rem;
        }

        @media (max-width: 480px) {
            font-size: 0.8rem;
        }
    }
`;

const CalendarGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 10px;
    background-color: #F77F00;
    border-radius:50%;
    @media (max-width: 768px) {
        gap: 8px;
    }

    @media (max-width: 480px) {
        gap: 5px;
    }
`;

const DayHeader = styled.div`
    font-weight: bold;
    text-align: center;
    
    padding: 10px;
    background-color: #F77F00;
    border-radius: 5px;

    @media (max-width: 768px) {
        padding: 8px;
        font-size: 0.9rem;
    }

    @media (max-width: 480px) {
        padding: 5px;
        font-size: 0.7rem;
    }
`;

const DayCell = styled.div`
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 5px;
    
    min-height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
     background-color: #FCBF49;

    @media (max-width: 768px) {
        padding: 8px;
        min-height: 80px;
    }

    @media (max-width: 480px) {
        padding: 4px;
        min-height: 60px;
    }
`;

const DayNumber = styled.div`
    font-weight: bold;
    margin-bottom: 5px;
    background-color: #EAE2B7;

    @media (max-width: 768px) {
        font-size: 0.9rem;
    }

    @media (max-width: 480px) {
        font-size: 0.8rem;
    }
`;

const EventsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const Event = styled.div`
    background-color: #D62828;
    color: white;
    padding: 5px;
    border-radius: 3px;
    font-size: 0.8rem;
    cursor: pointer;

    &:hover {
        background-color: #45a049;
    }

    @media (max-width: 768px) {
        font-size: 0.7rem;
        padding: 4px;
    }

    @media (max-width: 480px) {
        font-size: 0.6rem;
        padding: 3px;
    }
`;

const AddEventButton = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
        background-color: #45a049;
    }

    @media (max-width: 768px) {
        padding: 8px 16px;
        font-size: 0.9rem;
    }

    @media (max-width: 480px) {
        padding: 6px 12px;
        font-size: 0.8rem;
    }
`;
