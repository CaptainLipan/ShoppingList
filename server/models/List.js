const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
    name: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to creator
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Members as references
    createdAt: { type: Date, default: Date.now },
    archived: { type: Boolean, default: false }, // New field to indicate if the list is archived
});

module.exports = mongoose.model("List", ListSchema);
