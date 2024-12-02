const List = require("../models/List");
const User = require("../models/User");

exports.updateListName = async (req, res) => {
    let { listId } = req.params;
    const { name, loggedInUser } = req.body;

    try {
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
            return res.status(403).json({ error: "Only the creator can update this list." });
        }

        // Update the list name
        list.name = name;
        await list.save();

        res.status(200).json({ message: "List name updated successfully.", updatedList: list });
    } catch (error) {
        console.error("Error updating list name:", error);
        res.status(500).json({ error: "Error updating list name." });
    }
};
