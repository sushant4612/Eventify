import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    totalSeats : {
        type: Number,
        required: true,
    },
    bookedSeats: {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
        required: true,
    },
}, { timestamps: true })

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema)

export default Event