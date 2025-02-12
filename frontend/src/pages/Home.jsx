import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard';
import EventCard from '../components/EventCard';
import { cover } from '../assets';
import { EventContext } from '../context/EventContext';

const Landing = () => {
  const {events, getAllEvents} = useContext(EventContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllEvents()
    setLoading(false)
  }, [])

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[600px] overflow-hidden">
        <img 
          src={cover}
          alt="Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-70">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-bold text-white mb-6">
                Create Unforgettable Events
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Your all-in-one platform for planning, managing, and hosting successful events of any size
              </p>
              <div className="flex gap-4">
                <NavLink to="/create" className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition">
                  Create Event
                </NavLink>
                <NavLink to="/events" className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-black transition">
                  Explore Events
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon="🎯"
            title="Easy Planning"
            description="Intuitive tools for seamless event planning and management"
          />
          <FeatureCard
            icon="📊"
            title="Real-time Analytics"
            description="Track registrations, attendance, and engagement metrics"
          />
          <FeatureCard
            icon="💫"
            title="Custom Branding"
            description="Personalize your event page with your brand identity"
          />
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div className="bg-slate-900 rounded-2xl py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-white">Upcoming Events</h2>
            <NavLink to="/events" className="text-red-500 hover:text-red-400">
              View All →
            </NavLink>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event) => (
              <EventCard
                key={event._id}
                title={event.title}
                date={event.date}
                location={event.location}
                image={event.imageUrl}
              />
            ))}
            {loading && <div className="col-span-3">Loading...</div>}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r bg-slate-900 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Host Your Next Event?
          </h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of event organizers who trust our platform for their events
          </p>
          <button className="bg-white text-red-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition font-bold">
            Get Started for Free
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className=" py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold mb-4">About</h3>
              <ul className="text-gray-400 space-y-2">
                <li>Company</li>
                <li>Team</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Solutions</h3>
              <ul className="text-gray-400 space-y-2">
                <li>Event Planning</li>
                <li>Virtual Events</li>
                <li>Ticketing</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Resources</h3>
              <ul className="text-gray-400 space-y-2">
                <li>Blog</li>
                <li>Guides</li>
                <li>Help Center</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Contact</h3>
              <ul className="text-gray-400 space-y-2">
                <li>Support</li>
                <li>Sales</li>
                <li>Press</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            © 2025 Event Management. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;