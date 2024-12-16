const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const List = require("../../models/List");
const User = require("../../models/User");
const { getListDetails } = require("../../controllers/getListDetailsController");

let mongoServer;

describe("getListDetails Controller", () => {
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

        mockCreator = await User.create({ id: "u1", name: "John" });
        mockMember = await User.create({ id: "u2", name: "Jane" });

        mockList = await List.create({
            name: "Test List",
            creator: mockCreator._id,
            members: [mockMember._id],
        });
    });

    test("should return list details successfully", async () => {
        const req = { params: { listId: mockList._id.toString() } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getListDetails(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                name: "Test List",
                creator: expect.objectContaining({
                    id: "u1",
                    name: "John",
                }),
                members: expect.arrayContaining([
                    expect.objectContaining({
                        id: "u2",
                        name: "Jane",
                    }),
                ]),
            })
        );
    });

    test("should return 404 if list is not found", async () => {
        const req = { params: { listId: new mongoose.Types.ObjectId().toString() } }; // Non-existent ID
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getListDetails(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: "List not found." });
    });

    test("should handle server errors", async () => {
        // Mock List.findById to throw an error
        jest.spyOn(List, "findById").mockImplementationOnce(() => {
            throw new Error("Mocked database error");
        });

        // Mock console.error to suppress error logs during the test
        const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

        const req = { params: { listId: mockList._id.toString() } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getListDetails(req, res);

        // Assertions
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: "Error fetching list details." });

        // Restore the original console.error behavior
        consoleSpy.mockRestore();
    });

});
