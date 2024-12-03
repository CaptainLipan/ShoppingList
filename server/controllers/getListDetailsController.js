const List = require("../models/List");

exports.getListDetails = async (req, res) => {
    const { listId } = req.params;

    try {
        const list = await List.findById(listId)
            .populate("creator", "id name") // Populate the creator field with id and name
            .populate("members", "id name"); // Populate the members field with id and name

        if (!list) {
            return res.status(404).json({ error: "List not found." });
        }

        res.status(200).json(list);
    } catch (error) {
        console.error("Error fetching list details:", error);
        res.status(500).json({ error: "Error fetching list details." });
    }
};
