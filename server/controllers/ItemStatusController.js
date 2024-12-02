const Item = require("../models/Item");

// Controller to mark an item as purchased
exports.markItemAsPurchased = async (req, res) => {
    let { listId, itemId } = req.params;

    try {
        // Trim inputs
        listId = listId.trim();
        itemId = itemId.trim();

        // Find the item by listId and itemId
        const item = await Item.findOne({ _id: itemId, listId });
        if (!item) {
            return res.status(404).json({ error: "Item not found." });
        }

        // Update the item's purchased status to true
        item.purchased = true;
        await item.save();

        res.status(200).json({ message: "Item marked as purchased successfully.", item });
    } catch (error) {
        console.error("Error marking item as purchased:", error);
        res.status(500).json({ error: "Error marking item as purchased." });
    }
};

// Controller to mark an item as unpurchased
exports.markItemAsUnpurchased = async (req, res) => {
    let { listId, itemId } = req.params;

    try {
        // Trim inputs
        listId = listId.trim();
        itemId = itemId.trim();

        // Find the item by listId and itemId
        const item = await Item.findOne({ _id: itemId, listId });
        if (!item) {
            return res.status(404).json({ error: "Item not found." });
        }

        // Update the item's purchased status to false
        item.purchased = false;
        await item.save();

        res.status(200).json({ message: "Item marked as unpurchased successfully.", item });
    } catch (error) {
        console.error("Error marking item as unpurchased:", error);
        res.status(500).json({ error: "Error marking item as unpurchased." });
    }
};
