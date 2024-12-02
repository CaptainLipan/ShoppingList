const Item = require("../models/Item");
const List = require("../models/List");

exports.addItem = async (req, res) => {
    let { listId } = req.params;
    let { name, quantity = 1 } = req.body;

    try {
        listId = listId.trim();
        name = name.trim().toLowerCase(); // Normalize the name to lowercase

        // Check if the list exists
        const list = await List.findById(listId);
        if (!list) {
            return res.status(404).json({ error: "List not found." });
        }

        // Check if an item with the same name already exists in the list
        const existingItem = await Item.findOne({ listId, name });
        if (existingItem) {
            return res.status(400).json({ error: "Item already exists in the list." });
        }

        // Create and save the new item
        const newItem = new Item({
            name,
            quantity,
            listId,
        });

        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        console.error("Error adding item:", error);
        res.status(500).json({ error: "Error adding item." });
    }
};
