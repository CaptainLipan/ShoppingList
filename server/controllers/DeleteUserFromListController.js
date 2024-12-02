const User = require("../models/User");
const List = require("../models/List");

exports.deleteUserFromList = async (req, res) => {
    let { listId, userId } = req.params;
    const { loggedInUser } = req.body;

    try {
        listId = listId.trim();
        userId = userId.trim();

        // Find the list
        const list = await List.findById(listId);
        if (!list) {
            return res.status(404).json({ error: "List not found." });
        }

        // Find the logged-in user
        const creator = await User.findOne({ id: loggedInUser });
        if (!creator) {
            return res.status(404).json({ error: "User not found." });
        }

        // Check if the logged-in user is the creator of the list
        if (list.creator.toString() !== creator._id.toString()) {
            return res.status(403).json({ error: "Only the creator can remove users from this list." });
        }

        // Find the user to be removed
        const userToRemove = await User.findOne({ id: userId });
        if (!userToRemove) {
            return res.status(404).json({ error: "User to remove not found." });
        }

        // Remove the list from the user's listIds
        userToRemove.listIds = userToRemove.listIds.filter((id) => id.toString() !== listId);
        await userToRemove.save();

        res.status(200).json({ message: "User removed from the list successfully." });
    } catch (error) {
        console.error("Error removing user from list:", error);
        res.status(500).json({ error: "Error removing user from list." });
    }
};
