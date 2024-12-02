const Item = require("../models/Item");

// Controller to update item quantity
exports.updateItemQuantity = async (req, res) => {
    let { listId, itemId } = req.params;
    const { quantity } = req.body;

    try {
        // Trim inputs
        listId = listId.trim();
        itemId = itemId.trim();

        // Check if quantity is a positive number
        if (quantity < 1) {
            return res.status(400).json({ error: "Quantity must be a positive number." });
        }

        // Find the item by listId and itemId
        const item = await Item.findOne({ _id: itemId, listId });
        if (!item) {
            return res.status(404).json({ error: "Item not found." });
        }

        // Update the item's quantity
        item.quantity = quantity;
        await item.save();

        res.status(200).json({ message: "Item quantity updated successfully.", item });
    } catch (error) {
        console.error("Error updating item quantity:", error);
        res.status(500).json({ error: "Error updating item quantity." });
    }
};
