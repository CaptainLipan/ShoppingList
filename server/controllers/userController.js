const User = require("../models/User"); // Import the User model

exports.getUserWithLists = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findOne({ id: userId }).populate("listIds");
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Error fetching user." });
    }
};
