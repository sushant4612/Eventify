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
    attendees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }]
}, { timestamps: true })

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema)

export default Event