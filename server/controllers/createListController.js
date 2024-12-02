const List = require('../models/List');

const createList = async (req, res) => {
    try {
        const { name, owner, memberList } = req.body;

        if (!name || !owner) {
            return res.status(400).json({ error: 'Name and owner are required.' });
        }

        const newList = new List({
            name,
            owner,
            memberList,
        });

        await newList.save();
        res.status(201).json(newList);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create the list.' });
    }
};

module.exports = { createList };
