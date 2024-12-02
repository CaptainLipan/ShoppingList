const Item = require("../models/Item");

exports.deleteItem = async (req, res) => {
    let { listId, itemId } = req.params;

    try {
        listId = listId.trim();
        itemId = itemId.trim();

        // Find and delete the item by listId and itemId
        const deletedItem = await Item.findOneAndDelete({ _id: itemId, listId });
        if (!deletedItem) {
            return res.status(404).json({ error: "Item not found." });
        }

        res.status(200).json({ message: "Item deleted successfully.", item: deletedItem });
    } catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).json({ error: "Error deleting item." });
    }
};
