import asyncHandler from "../utils/asyncHandler.js"
import Event from "../models/event.model.js"
import ApiError from "../utils/ApiError.js"
import {z} from "zod"
import { v2 as cloudinary } from "cloudinary"
import ApiResponse from "../utils/ApiResponse.js"
import { io } from "../socket.js"

const eventSchema = z.object({
    title: z.string().min(3).max(20),
    description: z.string().min(3).max(1000),
    date: z.preprocess((val) => new Date(val), z.date()),
    location: z.string().min(3).max(20),
    imageUrl: z.string().min(3).max(100),
})

const createEvent = asyncHandler(async (req, res) => {
    console.log(req);
    const image1 = req.file;
    
    if(!image1) {
        throw new ApiError(400, "Image is required")
    }

    const image = await cloudinary.uploader.upload(image1.path, {
        folder: "events",
        resource_type: "image"
    })    

    const imageUrl = image.url

    req.body.date = new Date(req.body.date)    

    const {title, description, date, location} = req.body

    if(!title || !description || !date || !location) {
        throw new ApiError(400, "All fields are required")
    }

    if(!eventSchema.parse({title, description, date, location, imageUrl})) {
        throw new ApiError(400, "Invalid request body")
    }

    await Event.create({title, description, date, location, imageUrl, createdBy: req._id})

    return res.status(201).json(new ApiResponse(201, "Event created successfully"))
})

const getAllEvents = asyncHandler(async (req, res) => {
    const events = await Event.find().select("-description -createdAt -updatedAt")
    return res.status(200).json(new ApiResponse(200,  events, "Events fetched successfully",))
})

const getEventById = asyncHandler(async (req, res) => {
    const {id} = req.params
    const event = await Event.findById(id).select("-createdAt -updatedAt").populate("createdBy", "-password -email -createdAt -updatedAt")
    return res.status(200).json(new ApiResponse(200, event, "Event fetched successfully"))
})

const updateEvent = asyncHandler(async (req, res) => {
    
    const { id } = req.params;    
    const updateData = {};

    console.log(req.body);
    
    Object.keys(req.body).forEach((key) => {
        if (req.body[key] !== undefined) {
            updateData[key] = req.body[key];
        }
    });

    if (req.file) {
        try {
            const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
                folder: "events", 
            });
            updateData.imageUrl = uploadedImage.secure_url;
        } catch (error) {
            return res.status(500).json({ message: "Image upload failed", error });
        }
    }

    const event = await Event.findByIdAndUpdate(id, updateData, { new: true });

    return res.status(200).json(new ApiResponse(200, event, "Event updated successfully"));
});

const deleteEvent = asyncHandler(async (req, res) => {  
    const {id} = req.params
    await Event.findByIdAndDelete(id)
    return res.status(200).json(new ApiResponse(200, "Event deleted successfully"))
})

const bookTicket = asyncHandler(async (req, res) => {
    const {id} = req.params
    const userId = req._id
    
    const event = await Event.findById(id)

    if(!event) {
        throw new ApiError(404, "Event not found")
    }
    if(event.attendees.includes(userId)) {
        throw new ApiError(400, "You have already booked a ticket for this event")
    }
    
    event.attendees.push(userId)
    await event.save()

    // Emit real-time update
    io.emit(`event-${id}-attendees`, {
        attendeeCount: event.attendees.length,
        eventId: id
    });

    return res.status(200).json(new ApiResponse(200, "Ticket booked successfully"))
})

const cancelTicket = asyncHandler(async (req, res) => {
    const {id} = req.params
    const userId = req._id
    const event = await Event.findById(id) 
    if(!event) {
        throw new ApiError(404, "Event not found")
    }
    if(!event.attendees.includes(userId)) {
        throw new ApiError(400, "You have not booked a ticket for this event")
    }
    
    event.attendees = event.attendees.filter((user) => user.toString() !== userId)
    await event.save()

    // Emit real-time update
    io.emit(`event-${id}-attendees`, {
        attendeeCount: event.attendees.length,
        eventId: id
    });

    return res.status(200).json(new ApiResponse(200, "Ticket cancelled successfully"))
})

export {createEvent, getAllEvents, getEventById, updateEvent, deleteEvent, bookTicket, cancelTicket}