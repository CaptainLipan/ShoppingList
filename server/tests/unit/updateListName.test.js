const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const List = require("../../models/List");
const User = require("../../models/User");
const { updateListName } = require("../../controllers/updateListNameController");

let mongoServer;

describe("updateListName Controller", () => {
    let mockCreator, mockMember, mockList;

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

        // Create mock users and a list
        mockCreator = await User.create({ id: "u1", name: "John" });
        mockMember = await User.create({ id: "u2", name: "Jane" });

        mockList = await List.create({
            name: "Original List Name",
            creator: mockCreator._id,
            members: [mockMember._id],
        });
    });

    test("should update the list name successfully", async () => {
        const req = {
            params: { listId: mockList._id.toString() },
            body: { name: "Updated List Name", loggedInUser: "u1" },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await updateListName(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: "List name updated successfully.",
                updatedList: expect.objectContaining({
                    name: "Updated List Name",
                }),
            })
        );

        // Verify the list is updated in the database
        const updatedList = await List.findById(mockList._id);
        expect(updatedList.name).toBe("Updated List Name");
    });

    test("should return 404 if list is not found", async () => {
        const req = {
            params: { listId: new mongoose.Types.ObjectId().toString() }, // Non-existent list ID
            body: { name: "New Name", loggedInUser: "u1" },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await updateListName(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: "List not found." });
    });

    test("should return 404 if user is not found", async () => {
        const req = {
            params: { listId: mockList._id.toString() },
            body: { name: "New Name", loggedInUser: "nonexistentUser" },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await updateListName(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: "User not found." });
    });

    test("should return 403 if logged-in user is not the creator", async () => {
        const req = {
            params: { listId: mockList._id.toString() },
            body: { name: "New Name", loggedInUser: "u2" }, // Logged-in user is not the creator
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await updateListName(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ error: "Only the creator can update this list." });
    });

    test("should handle server errors", async () => {
        jest.spyOn(List, "findById").mockImplementationOnce(() => {
            throw new Error("Mocked database error");
        });

        const req = {
            params: { listId: mockList._id.toString() },
            body: { name: "New Name", loggedInUser: "u1" },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Suppress console.error during the test
        const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

        await updateListName(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: "Error updating list name." });

        consoleSpy.mockRestore();
    });
});
