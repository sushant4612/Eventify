import { useNavigate } from 'react-router-dom';

const EventCard = ({ id, title, date, location, image }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/events/${id}`);
  };

  return (
    <div 
      className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
      onClick={handleClick}
    >
      <img src={image} alt={title} className="w-full h-48 object-cover"/>
      <div className="p-4">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-red-500 mt-2">{date}</p>
        <p className="text-gray-400">{location}</p>
        <button 
          className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          onClick={(e) => {
            e.stopPropagation(); // Prevents navigation when clicking "Book Now"
            console.log(`Booking event: ${id}`);
          }}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default EventCard;
