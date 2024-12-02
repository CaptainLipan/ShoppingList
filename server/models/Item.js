const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    listId: { type: mongoose.Schema.Types.ObjectId, ref: "List", required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Item", ItemSchema);
