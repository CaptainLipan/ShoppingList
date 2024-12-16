const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    listIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "List" }]
});

const User = mongoose.model("User", userSchema);
module.exports = User;
