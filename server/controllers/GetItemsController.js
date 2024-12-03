const Item = require("../models/Item");

exports.getItemsForList = async (req, res) => {
    let { listId } = req.params;

    try {
        listId = listId.trim();

        // Find all items for the given listId
        const items = await Item.find({ listId });

        if (!items || items.length === 0) {
            return res.status(404).json({ message: "No items found for this list." });
        }

        res.status(200).json(items);
    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).json({ error: "Error fetching items." });
    }
};
