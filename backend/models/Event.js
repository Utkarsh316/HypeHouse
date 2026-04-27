import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
         required: true
    },
    capacity: {
  type: Number,
  required: true,
  min: 1
},

price: {
  type: Number,
  default: 0,
  min: 0
},
 attendees: {
  type: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  default: []
}
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);