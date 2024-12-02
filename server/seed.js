const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/Shopping_List_Database')
    .then(async () => {
        console.log("Connected to MongoDB");

        const mockUsers = [
            { id: 'u1', name: 'křemílek' },
            { id: 'u2', name: 'vochomůrka' },
            { id: 'u3', name: 'rampušák' },
            { id: 'u4', name: 'rákosníček' },
        ];

        await User.insertMany(mockUsers);
        console.log("Mock users added");
        process.exit();
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });
