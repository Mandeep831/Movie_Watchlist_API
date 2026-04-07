import request from "supertest";
import app from "../../src/app";
import * as watchlistService from "../../src/api/v1/services/watchlistService";

jest.mock("../../src/api/v1/services/watchlistService");

describe("Watchlist Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should get all watchlists", async () => {
        // Arrange
        (watchlistService.getAllWatchlists as jest.Mock).mockResolvedValue([
            {
                id: "1",
                userId: "u1",
                movieId: "m1",
                status: "unwatched",
            },
        ]);

        // Act
        const response = await request(app).get("/api/v1/watchlists");

        // Assert
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Watchlists fetched successfully");
        expect(response.body.data.length).toBe(1);
    });

    it("should return empty array when no watchlists exist", async () => {
        // Arrange
        (watchlistService.getAllWatchlists as jest.Mock).mockResolvedValue([]);

        // Act
        const response = await request(app).get("/api/v1/watchlists");

        // Assert
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Watchlists fetched successfully");
        expect(response.body.data).toEqual([]);
    });

    it("should create a watchlist", async () => {
        // Arrange
        const body = {
            userId: "u1",
            movieId: "m1",
            status: "unwatched",
        };

        (watchlistService.createWatchlist as jest.Mock).mockResolvedValue({
            id: "1",
            ...body,
        });

        // Act
        const response = await request(app)
            .post("/api/v1/watchlists")
            .send(body);

        // Assert
        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Watchlist created successfully");
        expect(response.body.data.userId).toBe("u1");
    });

    it("should return 400 for invalid input", async () => {
        // Arrange
        const body = {
            userId: "u1",
        };

        // Act
        const response = await request(app)
            .post("/api/v1/watchlists")
            .send(body);

        // Assert
        expect(response.status).toBe(400);
    });

    it("should update a watchlist", async () => {
        // Arrange
        (watchlistService.updateWatchlist as jest.Mock).mockResolvedValue({
            id: "1",
            status: "watched",
        });

        // Act
        const response = await request(app)
            .put("/api/v1/watchlists/1")
            .send({ status: "watched" });

        // Assert
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Watchlist updated successfully");
    });

    it("should return 404 when updating a watchlist that does not exist", async () => {
        // Arrange
        (watchlistService.updateWatchlist as jest.Mock).mockResolvedValue(null);

        // Act
        const response = await request(app)
            .put("/api/v1/watchlists/999")
            .send({ status: "watched" });

        // Assert
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Watchlist not found");
    });

    it("should return 400 when update input is invalid", async () => {
        // Arrange
        const body = {
            status: 123,
        };

        // Act
        const response = await request(app)
            .put("/api/v1/watchlists/1")
            .send(body);

        // Assert
        expect(response.status).toBe(400);
    });

    it("should delete a watchlist", async () => {
        // Arrange
        (watchlistService.deleteWatchlist as jest.Mock).mockResolvedValue(true);

        // Act
        const response = await request(app)
            .delete("/api/v1/watchlists/1");

        // Assert
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Watchlist deleted successfully");
    });

    it("should return 404 when deleting a watchlist that does not exist", async () => {
        // Arrange
        (watchlistService.deleteWatchlist as jest.Mock).mockResolvedValue(false);

        // Act
        const response = await request(app)
            .delete("/api/v1/watchlists/999");

        // Assert
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Watchlist not found");
    });
});