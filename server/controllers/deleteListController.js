const List = require("../models/List");
const User = require("../models/User");

exports.deleteList = async (req, res) => {
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
            return res.status(403).json({ error: "Only the creator can delete this list." });
        }

        // Delete the list
        await List.findByIdAndDelete(listId);

        // Remove the list reference from users
        await User.updateMany(
            { listIds: listId },
            { $pull: { listIds: listId } }
        );

        res.status(200).json({ message: "List deleted successfully." });
    } catch (error) {
        console.error("Error deleting list:", error);
        res.status(500).json({ error: "Error deleting list." });
    }
};
