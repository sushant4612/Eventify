import {Router} from "express"
import authenticate from "../middlewares/auth.middleware.js"
import {createEvent, deleteEvent, getAllEvents, getEventById, updateEvent, bookTicket, cancelTicket, getMyEvents} from "../controllers/event.controller.js"
import upload from "../middlewares/multer.js"

const router = Router()

router.post("/create", authenticate, upload.single("image"), createEvent)
router.put("/:id", authenticate, upload.single("image"), updateEvent)
router.delete("/:id", authenticate, deleteEvent)

router.get("/", getAllEvents)
router.get("/:id", getEventById)

router.post("/:id/book", authenticate, bookTicket)
router.post("/:id/cancel", authenticate, cancelTicket)

router.get("/my-events", authenticate, getMyEvents)

export default router