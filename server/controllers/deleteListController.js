const mongoose = require("mongoose");
const List = require("../models/List");
const User = require("../models/User");

exports.deleteList = async (req, res) => {
    let { listId } = req.params;
    const { loggedInUser } = req.body;

    try {
        // Validate input
        if (!listId) {
            return res.status(400).json({ error: "listId is required." });
        }
        listId = listId.trim();

        if (!mongoose.Types.ObjectId.isValid(listId)) {
            return res.status(400).json({ error: "Invalid list ID." });
        }

        if (!loggedInUser) {
            return res.status(400).json({ error: "loggedInUser is required." });
        }

        // Fetch logged-in user
        const user = await User.findOne({ id: loggedInUser });
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }
        console.log("Found user:", user);

        // Fetch list
        const list = await List.findById(listId);
        if (!list) {
            return res.status(404).json({ error: "List not found." });
        }
        console.log("Found list:", list);

        // Verify permission
        if (list.creator.toString() !== user._id.toString()) {
            return res.status(403).json({ error: "Only the creator can delete this list." });
        }

        // Delete the list
        await List.findByIdAndDelete(listId);

        // Remove the list reference from users
        await User.updateMany(
            { listIds: listId },
            { $pull: { listIds: listId } }
        );
        console.log("Removed list reference from users.");

        res.status(200).json({ message: "List deleted successfully." });
    } catch (error) {
        console.error("Error deleting list:", error);
        res.status(500).json({ error: "Error deleting list." });
    }
};
