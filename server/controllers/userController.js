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
// Controller for fetching all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, "id name"); // Fetch all users, only return id and name fields
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Error fetching users" });
    }
};