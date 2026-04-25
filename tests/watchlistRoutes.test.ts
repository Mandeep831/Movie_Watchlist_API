import { Response } from "express";
import * as watchlistController from "../src/api/v1/controllers/watchlistController";
import * as watchlistService from "../src/api/v1/services/watchlistService";

jest.mock("../src/api/v1/services/watchlistService");
jest.mock("../src/api/v1/services/emailService", () => ({
    sendEmail: jest.fn().mockResolvedValue(undefined),
}));

describe("watchlistController", () => {
    let mockRequest: any;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        mockRequest = {
            body: {},
            params: {},
            user: {
                uid: "u1",
                role: "user",
            },
        };

        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        jest.clearAllMocks();
    });

    it("should create a watchlist", async () => {
        const mockWatchlist = {
            id: "1",
            userId: "u1",
            movieId: "m1",
            status: "watching",
            createdAt: "2026-04-08T18:00:00.000Z",
            updatedAt: "2026-04-08T18:00:00.000Z",
        };

        mockRequest.body = {
            movieId: "m1",
            status: "watching",
        };

        (watchlistService.createWatchlist as jest.Mock).mockResolvedValue(
            mockWatchlist
        );

        await watchlistController.createWatchlist(
            mockRequest,
            mockResponse as Response
        );

        expect(watchlistService.createWatchlist).toHaveBeenCalledWith({
            movieId: "m1",
            status: "watching",
            userId: "u1",
        });

        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: "success",
            data: mockWatchlist,
        });
    });

    it("should return 401 when user is missing while creating watchlist", async () => {
        mockRequest.user = undefined;

        await watchlistController.createWatchlist(
            mockRequest,
            mockResponse as Response
        );

        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: "error",
            message: "Unauthorized",
        });
    });

    it("should get all watchlists", async () => {
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

        await watchlistController.getAllWatchlists(
            mockRequest,
            mockResponse as Response
        );

        expect(watchlistService.getAllWatchlists).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: "success",
            data: mockWatchlists,
        });
    });

    it("should update own watchlist", async () => {
        const existingWatchlist = {
            id: "1",
            userId: "u1",
            movieId: "m1",
            status: "watching",
        };

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

        (watchlistService.getWatchlistById as jest.Mock).mockResolvedValue(
            existingWatchlist
        );
        (watchlistService.updateWatchlist as jest.Mock).mockResolvedValue(
            updatedWatchlist
        );

        await watchlistController.updateWatchlist(
            mockRequest,
            mockResponse as Response
        );

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
        mockRequest.params = { id: "999" };
        mockRequest.body = { status: "watched" };

        (watchlistService.getWatchlistById as jest.Mock).mockResolvedValue(null);

        await watchlistController.updateWatchlist(
            mockRequest,
            mockResponse as Response
        );

        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: "error",
            message: "Watchlist not found",
        });
    });

    it("should return 403 when user updates another user's watchlist", async () => {
        mockRequest.params = { id: "1" };
        mockRequest.body = { status: "watched" };

        (watchlistService.getWatchlistById as jest.Mock).mockResolvedValue({
            id: "1",
            userId: "anotherUser",
            movieId: "m1",
            status: "watching",
        });

        await watchlistController.updateWatchlist(
            mockRequest,
            mockResponse as Response
        );

        expect(mockResponse.status).toHaveBeenCalledWith(403);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: "error",
            message: "Forbidden: You can only update your own watchlist",
        });
    });

    it("should delete own watchlist", async () => {
        mockRequest.params = { id: "1" };

        (watchlistService.getWatchlistById as jest.Mock).mockResolvedValue({
            id: "1",
            userId: "u1",
            movieId: "m1",
            status: "watching",
        });

        (watchlistService.deleteWatchlist as jest.Mock).mockResolvedValue(true);

        await watchlistController.deleteWatchlist(
            mockRequest,
            mockResponse as Response
        );

        expect(watchlistService.deleteWatchlist).toHaveBeenCalledWith("1");
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: "success",
            message: "Watchlist deleted successfully",
        });
    });

    it("should return 404 when deleting a watchlist that does not exist", async () => {
        mockRequest.params = { id: "999" };

        (watchlistService.getWatchlistById as jest.Mock).mockResolvedValue(null);

        await watchlistController.deleteWatchlist(
            mockRequest,
            mockResponse as Response
        );

        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: "error",
            message: "Watchlist not found",
        });
    });

    it("should return 403 when user deletes another user's watchlist", async () => {
        mockRequest.params = { id: "1" };

        (watchlistService.getWatchlistById as jest.Mock).mockResolvedValue({
            id: "1",
            userId: "anotherUser",
            movieId: "m1",
            status: "watching",
        });

        await watchlistController.deleteWatchlist(
            mockRequest,
            mockResponse as Response
        );

        expect(mockResponse.status).toHaveBeenCalledWith(403);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: "error",
            message: "Forbidden: You can only delete your own watchlist",
        });
    });
});