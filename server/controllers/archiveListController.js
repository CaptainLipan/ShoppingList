const List = require("../models/List");
const User = require("../models/User");

// Archive or Unarchive a list
exports.toggleArchiveList = async (req, res) => {
    let { listId } = req.params;
    const { loggedInUser, archive } = req.body; // Pass `archive` as true/false in the request body

    try {
        // Validate input
        listId = listId.trim();
        if (!listId) {
            return res.status(400).json({ error: "listId is required." });
        }

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
            return res.status(403).json({ error: "Only the creator can toggle archive status of this list." });
        }

        // Update the archive status
        list.isArchived = archive;
        await list.save();

        res.status(200).json({
            message: archive ? "List archived successfully." : "List unarchived successfully.",
            list,
        });
    } catch (error) {
        console.error("Error toggling archive status of list:", error);
        res.status(500).json({ error: "Error toggling archive status of list." });
    }
};
