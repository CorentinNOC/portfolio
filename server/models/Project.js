const mongoose = require("mongoose");

const projectsSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tag: { type: [String], required: true },
  imageUrls: { type: [String], required: true },
  link: { type: String, required: true },
});

module.exports = mongoose.model("Projects", projectsSchema);
