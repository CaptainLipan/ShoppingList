const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // Custom user ID (e.g., "u1", "u2")
    name: { type: String, required: true },
    listIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "List" }], // Array of references to lists
});

module.exports = mongoose.model("User", UserSchema);
