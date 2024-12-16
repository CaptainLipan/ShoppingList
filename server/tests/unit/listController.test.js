const User = require('../../models/User'); // Correct path to your User model
const List = require('../../models/List'); // Correct path to your List model
const { createList } = require('../../controllers/listController'); // Correct path to your controller


//create List Controller
describe('createList Controller', () => {
    test('should create a shopping list successfully', async () => {
        // Mock user and setup
        const mockUser = new User({ id: 'u1', name: 'John' });
        await mockUser.save();

        // Mock request and response
        const req = {
            body: {
                name: 'Grocery List',
                loggedInUser: 'u1',
                members: []
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // Call the controller function
        await createList(req, res);

        // Assertions to verify behavior
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalled();
        expect(res.json.mock.calls[0][0]).toHaveProperty('name', 'Grocery List');
    });
});

test('should return an error if required fields are missing', async () => {
    const req = {
        body: {
            // missing 'name' and 'loggedInUser'
        }
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };

    await createList(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
        error: "Name and loggedInUser are required."
    });
});

test('should return an error if creator user is not found', async () => {
    const req = {
        body: {
            name: 'Grocery List',
            loggedInUser: 'u1'  // Assuming 'u1' does not exist in the database
        }
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };

    await createList(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
        error: "Creator not found."
    });
});

