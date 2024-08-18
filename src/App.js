import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CalendarPage from './pages/CalendarPage';
import EventDetailsPage from './pages/EventDetailsPage';
import { EventProvider } from './context/EventContext';

const App = () => (
    <EventProvider>
        <Router>
            <Routes>
                <Route path="/" element={<CalendarPage />} />
                <Route path="/event/:id" element={<EventDetailsPage />} />
            </Routes>
        </Router>
    </EventProvider>
);

export default App;
