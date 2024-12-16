// src/controllers/listController.js
const List = require('../models/List');
const User = require('../models/User');

exports.createList = async (req, res) => {
    const { name, members = [], loggedInUser } = req.body;

    try {
        // Validate input
        if (!name || !loggedInUser) {
            return res.status(400).json({ error: "Name and loggedInUser are required." });
        }

        // Find the creator
        const creator = await User.findOne({ id: loggedInUser });
        if (!creator) {
            return res.status(404).json({ error: "Creator not found." });
        }

        // Resolve members into ObjectIds
        const allMembers = await User.find({ id: { $in: [...members, loggedInUser] } });
        const memberIds = allMembers.map((member) => member._id);

        // Create the shopping list
        const newList = new List({
            name,
            creator: creator._id,
            members: memberIds
        });
        await newList.save();

        // Update each member's `listIds` field
        await User.updateMany(
            { _id: { $in: memberIds } },
            { $push: { listIds: newList._id } }
        );

        res.status(201).json(newList);
    } catch (error) {
        console.error("Error creating list:", error);
        res.status(500).json({ error: "Error creating list." });
    }
};
