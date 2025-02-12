import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { EventContext } from '../context/EventContext';

const EventDetails = () => {
  const { id } = useParams(); // Get the event ID from URL
  const { events, getAllEvents } = useContext(EventContext);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (!events.length) {
      getAllEvents();
    }
  }, [getAllEvents, events.length]);

  useEffect(() => {
    if (events.length > 0) {
      const foundEvent = events.find((e) => e._id === id);
      setEvent(foundEvent);
    }
  }, [id, events]);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>Loading event details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-4 text-white">
        <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
        <img src={event.imageUrl} alt={event.title} className="w-full max-h-96 object-cover rounded-lg mb-6" />
        <p className="text-lg mb-4"><strong>Date:</strong> {event.date}</p>
        <p className="text-lg mb-4"><strong>Location:</strong> {event.location}</p>
        <p className="text-lg"><strong>Description:</strong> {event.description}</p>
      </div>
    </div>
  );
};

export default EventDetails;
