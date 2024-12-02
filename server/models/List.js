const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
    name: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to creator
    archived: { type: Boolean, default: false }, // Field to indicate if the list is archived
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("List", ListSchema);
