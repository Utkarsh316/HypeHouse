import express from "express";
import Event from "../models/Event.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE EVENT
router.post("/create", authMiddleware, async (req, res) => {
    try {
        const { title, description, date, location } = req.body;

        const event = new Event({
            title,
            description,
            date,
            location,
            createdBy: req.user.id
        });

        await event.save();

        res.status(201).json({
            message: "Event created successfully",
            event
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// GET ALL EVENTS (sorted by date)
router.get("/", async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1 });

        res.json(events);
 
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// JOIN EVENT
router.post("/join/:id", authMiddleware, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        // prevent duplicate join
        if (event.attendees.includes(req.user.id)) {
            return res.status(400).json({ message: "Already joined" });
        }

        event.attendees.push(req.user.id);

        await event.save();

        res.json({
            message: "Joined event successfully",
            event
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});



export default router;