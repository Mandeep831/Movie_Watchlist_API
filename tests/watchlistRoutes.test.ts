import { Request, Response } from "express";
import * as watchlistController from "../src/api/v1/controllers/watchlistController";
import * as watchlistService from "../src/api/v1/services/watchlistService";
 
jest.mock("../src/api/v1/services/watchlistService");
jest.mock("../src/api/v1/services/emailService", () => ({
    sendEmail: jest.fn().mockResolvedValue(undefined),
}));
 
describe("watchlistController", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
 
    beforeEach(() => {
        mockRequest = {
            body: {},
            params: {},
        };
 
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
 
        jest.clearAllMocks();
    });
 
    it("should create a watchlist", async () => {
        // Arrange
        const mockWatchlist = {
            id: "1",
            userId: "u1",
            movieId: "m1",
            status: "watching",
            createdAt: "2026-04-08T18:00:00.000Z",
            updatedAt: "2026-04-08T18:00:00.000Z",
        };
 
        mockRequest.body = {
            userId: "u1",
            movieId: "m1",
            status: "watching",
        };
 
        (watchlistService.createWatchlist as jest.Mock).mockResolvedValue(mockWatchlist);
 
        // Act
        await watchlistController.createWatchlist(
            mockRequest as Request,
            mockResponse as Response
        );
 
        // Assert
        expect(watchlistService.createWatchlist).toHaveBeenCalledWith(
            mockRequest.body
        );
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: "success",
            data: mockWatchlist,
        });
    });
 
    it("should get all watchlists", async () => {
        // Arrange
        const mockWatchlists = [
            {
                id: "1",
                userId: "u1",
                movieId: "m1",
                status: "watching",
                createdAt: "2026-04-08T18:00:00.000Z",
                updatedAt: "2026-04-08T18:00:00.000Z",
            },
        ];
 
        (watchlistService.getAllWatchlists as jest.Mock).mockResolvedValue(
            mockWatchlists
        );
 
        // Act
        await watchlistController.getAllWatchlists(
            mockRequest as Request,
            mockResponse as Response
        );
 
        // Assert
        expect(watchlistService.getAllWatchlists).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: "success",
            data: mockWatchlists,
        });
    });
 
    it("should update watchlist", async () => {
        // Arrange
        const updatedWatchlist = {
            id: "1",
            userId: "u1",
            movieId: "m1",
            status: "watched",
            createdAt: "2026-04-08T18:00:00.000Z",
            updatedAt: "2026-04-08T19:00:00.000Z",
        };
 
        mockRequest.params = { id: "1" };
        mockRequest.body = { status: "watched" };
 
        (watchlistService.updateWatchlist as jest.Mock).mockResolvedValue(
            updatedWatchlist
        );
 
        // Act
        await watchlistController.updateWatchlist(
            mockRequest as Request,
            mockResponse as Response
        );
 
        // Assert
        expect(watchlistService.updateWatchlist).toHaveBeenCalledWith("1", {
            status: "watched",
        });
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: "success",
            data: updatedWatchlist,
        });
    });
 
    it("should return 404 when updating a watchlist that does not exist", async () => {
        // Arrange
        mockRequest.params = { id: "999" };
        mockRequest.body = { status: "watched" };
 
        (watchlistService.updateWatchlist as jest.Mock).mockResolvedValue(null);
 
        // Act
        await watchlistController.updateWatchlist(
            mockRequest as Request,
            mockResponse as Response
        );
 
        // Assert
        expect(watchlistService.updateWatchlist).toHaveBeenCalledWith("999", {
            status: "watched",
        });
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: "error",
            message: "Watchlist not found",
        });
    });
 
    it("should delete a watchlist", async () => {
        // Arrange
        mockRequest.params = { id: "1" };
 
        (watchlistService.deleteWatchlist as jest.Mock).mockResolvedValue(true);
 
        // Act
        await watchlistController.deleteWatchlist(
            mockRequest as Request,
            mockResponse as Response
        );
 
        // Assert
        expect(watchlistService.deleteWatchlist).toHaveBeenCalledWith("1");
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: "success",
            message: "Watchlist deleted successfully",
        });
    });
 
    it("should return 404 when deleting a watchlist that does not exist", async () => {
        // Arrange
        mockRequest.params = { id: "999" };
 
        (watchlistService.deleteWatchlist as jest.Mock).mockResolvedValue(false);
 
        // Act
        await watchlistController.deleteWatchlist(
            mockRequest as Request,
            mockResponse as Response
        );
 
        // Assert
        expect(watchlistService.deleteWatchlist).toHaveBeenCalledWith("999");
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: "error",
            message: "Watchlist not found",
        });
    });
});
