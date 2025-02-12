import React, { useContext, useEffect } from "react";
import { EventContext } from "../context/EventContext";
import EventCard from "../components/EventCard";
import { Link } from "react-router-dom";

const MyEvents = () => {
  const { events, getMyEvents, deleteEvent } = useContext(EventContext);

  useEffect(() => {
    getMyEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">My Events</h1>

        {events.length === 0 ? (
          <p className="text-gray-400 text-center">No events created yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event._id} className="relative">
                <EventCard
                  id={event._id}
                  title={event.title}
                  date={new Date(event.date).toDateString()}
                  location={event.location}
                  image={event.imageUrl}
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEvents;
