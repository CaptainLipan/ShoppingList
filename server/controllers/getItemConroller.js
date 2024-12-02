const Item = require("../models/Item");

exports.getItemsForList = async (req, res) => {
    let { listId } = req.params;
    let { searchQuery = "" } = req.query;

    try {
        listId = listId.trim();
        searchQuery = searchQuery.trim().toLowerCase(); // Normalize the search query to lowercase

        // Find all items associated with the given listId
        let items;
        if (searchQuery) {
            // If there's a search query, perform a case-insensitive search
            items = await Item.find({
                listId,
                name: { $regex: searchQuery, $options: "i" } // Case-insensitive search
            });
        } else {
            // Otherwise, find all items for the list
            items = await Item.find({ listId });
        }

        if (!items || items.length === 0) {
            return res.status(404).json({ message: "No items found for this list." });
        }

        res.status(200).json(items);
    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).json({ error: "Error fetching items." });
    }
};