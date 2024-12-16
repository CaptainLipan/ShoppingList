const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const User = require("../../models/User");
const List = require("../../models/List");
const { getUserWithLists } = require("../../controllers/userController");

let mongoServer;

describe("getUserWithLists Controller", () => {
    let mockUser, mockList;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();

        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }

        await mongoose.connect(uri);
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    beforeEach(async () => {
        await User.deleteMany({});
        await List.deleteMany({});

        // Create mock user
        mockUser = await User.create({ id: "u1", name: "John", listIds: [] });

        // Create mock list with a valid creator
        mockList = await List.create({ name: "Test List", creator: mockUser._id });

        // Add the list to the user's listIds
        mockUser.listIds.push(mockList._id);
        await mockUser.save();
    });

    test("should return a user with their lists successfully", async () => {
        const req = { params: { userId: "u1" } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getUserWithLists(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                id: "u1",
                name: "John",
                listIds: expect.arrayContaining([
                    expect.objectContaining({
                        name: "Test List",
                    }),
                ]),
            })
        );
    });

    test("should return 404 if user is not found", async () => {
        const req = { params: { userId: "nonexistentUser" } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getUserWithLists(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: "User not found." });
    });

    test("should handle server errors", async () => {
        jest.spyOn(User, "findOne").mockImplementationOnce(() => {
            throw new Error("Mocked database error");
        });

        const req = { params: { userId: "u1" } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Suppress console.error during the test
        const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

        await getUserWithLists(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: "Error fetching user." });

        consoleSpy.mockRestore();
    });
});
