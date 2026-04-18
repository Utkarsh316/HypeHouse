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
  console.error("FETCH EVENTS ERROR:", error); // 👈 ADD THIS
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

// DELETE EVENT
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // only creator can delete
    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await event.deleteOne();

    res.json({ message: "Event deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


    //leave event
router.post("/leave/:id", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // remove user from attendees
    event.attendees = event.attendees.filter(
      (userId) => userId.toString() !== req.user.id
    );

    await event.save();

    res.json({ message: "Left event successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


export default router;