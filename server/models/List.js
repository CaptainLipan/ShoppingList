const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        enum: ['active', 'archived'],
        default: 'active',
    },
    owner: {
        type: String,
        required: true,
    },
    memberList: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('List', ListSchema);
