const User = require("../models/User");

exports.getUserWithLists = async (req, res) => {
    const { userId } = req.params; // userId corresponds to the "id" field in the User schema

    try {
        // Fetch user by their `id` and populate `listIds`
        const user = await User.findOne({ id: userId }).populate("listIds");

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        // Respond with the user details and populated lists
        res.status(200).json({
            id: user.id,
            name: user.name,
            shoppingLists: user.listIds, // Populated list details
        });
    } catch (error) {
        console.error("Error fetching user with lists:", error);
        res.status(500).json({ error: "Error fetching user with lists." });
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