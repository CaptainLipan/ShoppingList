const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const List = require("../../models/List");
const User = require("../../models/User");
const { deleteList } = require("../../controllers/deleteListController");

let mongoServer;

describe("deleteList Controller", () => {
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
        mockCreator = await User.create({ id: "u1", name: "John", listIds: [] });
        mockMember = await User.create({ id: "u2", name: "Jane", listIds: [] });

        mockList = await List.create({
            name: "Test List",
            creator: mockCreator._id,
            members: [mockMember._id],
        });

        // Add the list to the users' listIds
        await User.findByIdAndUpdate(mockCreator._id, { $push: { listIds: mockList._id } });
        await User.findByIdAndUpdate(mockMember._id, { $push: { listIds: mockList._id } });
    });

    test("should delete a list successfully", async () => {
        const req = { params: { listId: mockList._id.toString() }, body: { loggedInUser: "u1" } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await deleteList(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "List deleted successfully." });

        // Verify the list is deleted
        const deletedList = await List.findById(mockList._id);
        expect(deletedList).toBeNull();

        // Verify the list is removed from users' listIds
        const updatedCreator = await User.findById(mockCreator._id);
        expect(updatedCreator.listIds).not.toContainEqual(mockList._id);

        const updatedMember = await User.findById(mockMember._id);
        expect(updatedMember.listIds).not.toContainEqual(mockList._id);
    });

    test("should return 404 if list is not found", async () => {
        const req = { params: { listId: new mongoose.Types.ObjectId().toString() }, body: { loggedInUser: "u1" } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await deleteList(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: "List not found." });
    });

    test("should return 404 if user is not found", async () => {
        const req = { params: { listId: mockList._id.toString() }, body: { loggedInUser: "nonexistentUser" } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await deleteList(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: "User not found." });
    });

    test("should return 403 if logged-in user is not the creator", async () => {
        const req = { params: { listId: mockList._id.toString() }, body: { loggedInUser: "u2" } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await deleteList(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ error: "Only the creator can delete this list." });
    });

    test("should handle server errors", async () => {
        jest.spyOn(List, "findById").mockImplementationOnce(() => {
            throw new Error("Mocked database error");
        });

        const req = { params: { listId: mockList._id.toString() }, body: { loggedInUser: "u1" } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Suppress console.error during this test
        const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

        await deleteList(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: "Error deleting list." });

        consoleSpy.mockRestore();
    });
});
