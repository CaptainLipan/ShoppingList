const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
}],
    isArchived: {
        type: Boolean,
        default: false,
    },
});

const List = mongoose.model("List", listSchema);
module.exports = List;
