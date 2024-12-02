const List = require("../models/List");
const User = require("../models/User");

// Archive a list
exports.archiveList = async (req, res) => {
    let { listId } = req.params;
    const { loggedInUser } = req.body; // Assume the loggedInUser (e.g., "u1") is passed in the request body

    try {
        // Trim listId to remove any newline or extra space
        listId = listId.trim();

        // Find the MongoDB ObjectId for the logged-in user
        const user = await User.findOne({ id: loggedInUser });
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        // Find the list by ID
        const list = await List.findById(listId);
        if (!list) {
            return res.status(404).json({ error: "List not found." });
        }

        // Check if the logged-in user is the creator of the list
        if (list.creator.toString() !== user._id.toString()) {
            return res.status(403).json({ error: "Only the creator can archive this list." });
        }

        // Archive the list
        list.archived = true;
        await list.save();

        res.status(200).json({ message: "List archived successfully." });
    } catch (error) {
        console.error("Error archiving list:", error);
        res.status(500).json({ error: "Error archiving list." });
    }
};

// Unarchive a list
exports.unarchiveList = async (req, res) => {
    let { listId } = req.params;
    const { loggedInUser } = req.body; // Assume the loggedInUser (e.g., "u1") is passed in the request body

    try {
        // Trim listId to remove any newline or extra space
        listId = listId.trim();

        // Find the MongoDB ObjectId for the logged-in user
        const user = await User.findOne({ id: loggedInUser });
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        // Find the list by ID
        const list = await List.findById(listId);
        if (!list) {
            return res.status(404).json({ error: "List not found." });
        }

        // Check if the logged-in user is the creator of the list
        if (list.creator.toString() !== user._id.toString()) {
            return res.status(403).json({ error: "Only the creator can unarchive this list." });
        }

        // Unarchive the list
        list.archived = false;
        await list.save();

        res.status(200).json({ message: "List unarchived successfully." });
    } catch (error) {
        console.error("Error unarchiving list:", error);
        res.status(500).json({ error: "Error unarchiving list." });
    }
};
