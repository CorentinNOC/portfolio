const mongoose = require("mongoose");

const experiencesSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
    tag: { type: [String], required: true },
    link: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Experiences", experiencesSchema);
