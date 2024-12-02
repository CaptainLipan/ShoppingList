const User = require("../models/User");

exports.leaveList = async (req, res) => {
    let { listId } = req.params;
    const { loggedInUser } = req.body;

    try {
        listId = listId.trim();

        // Find the logged-in user
        const user = await User.findOne({ id: loggedInUser });
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        // Remove the list from the user's listIds
        user.listIds = user.listIds.filter((id) => id.toString() !== listId);
        await user.save();

        res.status(200).json({ message: "User has left the list successfully." });
    } catch (error) {
        console.error("Error leaving the list:", error);
        res.status(500).json({ error: "Error leaving the list." });
    }
};
