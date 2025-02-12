import React, { useState, useContext, useEffect } from 'react';
import { EventContext } from '../context/EventContext';
import EventCard from '../components/EventCard';

const EventDetails = () => {
  const { events, getAllEvents } = useContext(EventContext);

  useEffect(() => {
    getAllEvents();
  }, [getAllEvents]);

  useEffect(() => {
    setFilteredEvents(events);
  }, [events]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(events);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = events.filter(event => 
      event.title.toLowerCase().includes(term) ||
      event.location.toLowerCase().includes(term) ||
      event.category.toLowerCase().includes(term)
    );

    setFilteredEvents(filtered);
  };

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Upcoming Events</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover and book the most exciting events happening around you
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search events by title, location, or category..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full bg-gray-900 text-white px-6 py-4 rounded-lg pl-12 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map(event => (
              <EventCard 
                key={event._id} 
                id={event._id} 
                title={event.title} 
                date={event.date} 
                location={event.location} 
                image={event.imageUrl} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-12">
            <p className="text-xl">No events found matching "{searchTerm}"</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setFilteredEvents(events);
              }}
              className="mt-4 text-red-500 hover:text-red-400"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
