const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    listIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "List" }], // References to lists
});

module.exports = mongoose.model("User", UserSchema);
