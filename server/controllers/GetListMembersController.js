const User = require("../models/User");

exports.getListMembers = async (req, res) => {
    const { listId } = req.params;

    try {
        // Find all users that are members of the given list ID
        const members = await User.find({ listIds: listId.trim() });

        if (!members || members.length === 0) {
            return res.status(404).json({ message: "No members found for this list." });
        }

        res.status(200).json(members); // Respond with the list of members
    } catch (error) {
        console.error("Error fetching list members:", error);
        res.status(500).json({ error: "Error fetching list members." });
    }
};
