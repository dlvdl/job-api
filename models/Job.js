const mongoose = require("mongoose")

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company name"],
      maxLength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxLength: 50,
    },
    // Mongoose String and Number types have an enum validator. The enum validator is an
    // array that will check if the value given is an item in
    // the array. If the value is not in the array, Mongoose will throw a ValidationError
    // when you try to save().
    status: {
      type: String,
      enum: ["Interniew", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  // timestamps property adds to document extra fields with informations
  // about create time of the document
  { timestamps: true }
)

module.exports = mongoose.model("Job", JobSchema)
