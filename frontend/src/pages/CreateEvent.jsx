import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { EventContext } from "../context/EventContext";

const CreateEvent = () => {
  const { createEvent } = useContext(EventContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    location: "",
    totalSeats: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // Added missing state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.title || !formData.description || !formData.date || !formData.location || !formData.category || !image || !formData.totalSeats) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      // Prepare form data for API
      const eventData = new FormData();
      eventData.append("title", formData.title);
      eventData.append("description", formData.description);
      eventData.append("category", formData.category);
      eventData.append("date", formData.date);
      eventData.append("location", formData.location);
      eventData.append("totalSeats", formData.totalSeats);
      eventData.append("image", image);
      

      const response = await createEvent(eventData);

      if (response.success) {
        navigate("/events");
      } else {
        setError(response.message || "Event creation failed.");
      }
    } catch (err) {
      console.error("Event creation failed:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "Technology",
    "Music",
    "Food",
    "Sports",
    "Business",
    "Art",
    "Education",
    "Other",
  ];

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Create New Event
        </h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="bg-gray-900 rounded-lg p-6 space-y-6">
          <div>
            <label className="block text-white mb-2">Event Image</label>
            <div className="border-2 border-dashed border-gray-700 rounded-lg p-4">
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="image-upload" />
              <label htmlFor="image-upload" className="cursor-pointer block">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                ) : (
                  <div className="h-48 flex items-center justify-center text-gray-400 hover:text-red-500 transition">
                    <div className="text-center">
                      <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Click to upload image
                    </div>
                  </div>
                )}
              </label>
            </div>
          </div>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg"
            placeholder="Enter event title"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg h-32"
            placeholder="Enter event description"
            required
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg"
            required
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg"
            required
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg"
            placeholder="Enter event location"
            required
          />
          <input
            type="number"
            name="totalSeats"
            value={formData.totalSeats}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg"
            placeholder="Enter total seats"
            required
          />
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-semibold mt-6"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
