const User = require("../models/User");
const List = require("../models/List");

exports.addUserToList = async (req, res) => {
    let { listId, userId } = req.params;
    const { loggedInUser } = req.body; // Pass logged-in user ID in the request body

    try {
        // Trim inputs
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
            return res.status(403).json({ error: "Only the creator can add users to this list." });
        }

        // Find the user to be added to the list
        const userToAdd = await User.findOne({ id: userId });
        if (!userToAdd) {
            return res.status(404).json({ error: "User to add not found." });
        }

        // Check if the user is already part of the list
        if (userToAdd.listIds.includes(listId)) {
            return res.status(400).json({ error: "User is already a member of this list." });
        }

        // Add list to user's listIds
        userToAdd.listIds.push(listId);
        await userToAdd.save();

        res.status(200).json({ message: "User added to the list successfully." });
    } catch (error) {
        console.error("Error adding user to list:", error);
        res.status(500).json({ error: "Error adding user to list." });
    }
};
