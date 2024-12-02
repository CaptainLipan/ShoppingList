const User = require("../models/User");

exports.getListMembers = async (req, res) => {
    let { listId } = req.params;

    try {
        listId = listId.trim();

        // Find all users that are part of the list
        const members = await User.find({ listIds: listId });

        if (!members || members.length === 0) {
            return res.status(404).json({ message: "No members found for this list." });
        }

        res.status(200).json(members);
    } catch (error) {
        console.error("Error fetching list members:", error);
        res.status(500).json({ error: "Error fetching list members." });
    }
};
