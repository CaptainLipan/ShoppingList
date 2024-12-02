const List = require("../models/List");

exports.getListDetails = async (req, res) => {
    let { listId } = req.params;

    try {
        listId = listId.trim(); // Trim any extra whitespace or newlines

        const list = await List.findById(listId)
            .populate("creator", "id name") // Fetch only id and name of the creator
            .populate("members", "id name"); // Fetch only id and name of members

        if (!list) {
            return res.status(404).json({ error: "List not found." });
        }

        res.status(200).json(list);
    } catch (error) {
        console.error("Error fetching list details:", error);
        res.status(500).json({ error: "Error fetching list details." });
    }
};
