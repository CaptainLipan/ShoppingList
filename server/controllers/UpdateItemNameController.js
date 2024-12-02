const Item = require("../models/Item");

exports.updateItemName = async (req, res) => {
    let { listId, itemId } = req.params;
    const { name } = req.body;

    try {
        listId = listId.trim();
        itemId = itemId.trim();

        // Find the item by listId and itemId and update its name
        const item = await Item.findOne({ _id: itemId, listId });
        if (!item) {
            return res.status(404).json({ error: "Item not found." });
        }

        item.name = name.trim();
        await item.save();

        res.status(200).json({ message: "Item name updated successfully.", item });
    } catch (error) {
        console.error("Error updating item name:", error);
        res.status(500).json({ error: "Error updating item name." });
    }
};
