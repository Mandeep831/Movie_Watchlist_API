import { Response, NextFunction } from "express";
import * as reviewController from "../src/api/v1/controllers/reviewController";
import * as reviewService from "../src/api/v1/services/reviewService";

jest.mock("../src/api/v1/services/reviewService");
jest.mock("../src/api/v1/services/emailService", () => ({
    sendEmail: jest.fn().mockResolvedValue(undefined),
}));

describe("reviewController", () => {
    let mockRequest: any;
    let mockResponse: Partial<Response>;
    let nextFunction: jest.Mock;

    beforeEach(() => {
        mockRequest = {
            body: {},
            params: {},
            user: {
                uid: "user001",
                role: "user",
            },
        };

        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        nextFunction = jest.fn();
        jest.clearAllMocks();
    });

    it("should create a review", async () => {
        const mockReview = {
            id: "review123",
            movieId: "movie001",
            userId: "user001",
            rating: 5,
            comment: "Great movie.",
        };

        mockRequest.body = {
            movieId: "movie001",
            rating: 5,
            comment: "Great movie.",
        };

        (reviewService.createReview as jest.Mock).mockResolvedValue(mockReview);

        await reviewController.createReview(
            mockRequest,
            mockResponse as Response,
            nextFunction as NextFunction
        );

        expect(reviewService.createReview).toHaveBeenCalledWith({
            movieId: "movie001",
            rating: 5,
            comment: "Great movie.",
            userId: "user001",
        });

        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: "success",
            data: mockReview,
        });
    });

    it("should return 401 when user is missing while creating review", async () => {
        mockRequest.user = undefined;

        await reviewController.createReview(
            mockRequest,
            mockResponse as Response,
            nextFunction as NextFunction
        );

        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: "error",
            message: "Unauthorized",
        });
    });

    it("should get all reviews", async () => {
        const mockReviews = [
            {
                id: "review123",
                movieId: "movie001",
                userId: "user001",
                rating: 5,
                comment: "Great movie.",
            },
        ];

        (reviewService.getAllReviews as jest.Mock).mockResolvedValue(mockReviews);

        await reviewController.getAllReviews(
            mockRequest,
            mockResponse as Response,
            nextFunction as NextFunction
        );

        expect(reviewService.getAllReviews).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: "success",
            data: mockReviews,
        });
    });

    it("should get review by id", async () => {
        const mockReview = {
            id: "review123",
            movieId: "movie001",
            userId: "user001",
            rating: 5,
            comment: "Great movie.",
        };

        mockRequest.params = { id: "review123" };

        (reviewService.getReviewById as jest.Mock).mockResolvedValue(mockReview);

        await reviewController.getReviewById(
            mockRequest,
            mockResponse as Response,
            nextFunction as NextFunction
        );

        expect(reviewService.getReviewById).toHaveBeenCalledWith("review123");
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: "success",
            data: mockReview,
        });
    });

    it("should return 404 if review not found", async () => {
        mockRequest.params = { id: "unknown" };

        (reviewService.getReviewById as jest.Mock).mockResolvedValue(null);

        await reviewController.getReviewById(
            mockRequest,
            mockResponse as Response,
            nextFunction as NextFunction
        );

        expect(reviewService.getReviewById).toHaveBeenCalledWith("unknown");
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: "error",
            message: "Review not found",
        });
    });

    it("should update own review", async () => {
        const existingReview = {
            id: "review123",
            movieId: "movie001",
            userId: "user001",
            rating: 5,
            comment: "Great movie.",
        };

        const updatedReview = {
            id: "review123",
            movieId: "movie001",
            userId: "user001",
            rating: 4,
            comment: "Updated review",
        };

        mockRequest.params = { id: "review123" };
        mockRequest.body = {
            rating: 4,
            comment: "Updated review",
        };

        (reviewService.getReviewById as jest.Mock).mockResolvedValue(existingReview);
        (reviewService.updateReview as jest.Mock).mockResolvedValue(updatedReview);

        await reviewController.updateReview(
            mockRequest,
            mockResponse as Response,
            nextFunction as NextFunction
        );

        expect(reviewService.updateReview).toHaveBeenCalledWith(
            "review123",
            mockRequest.body
        );
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: "success",
            data: updatedReview,
        });
    });

    it("should return 404 when updating missing review", async () => {
        mockRequest.params = { id: "unknown" };
        mockRequest.body = { rating: 4 };

        (reviewService.getReviewById as jest.Mock).mockResolvedValue(null);

        await reviewController.updateReview(
            mockRequest,
            mockResponse as Response,
            nextFunction as NextFunction
        );

        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: "error",
            message: "Review not found",
        });
    });

    it("should return 403 when user updates another user's review", async () => {
        mockRequest.params = { id: "review123" };
        mockRequest.body = { rating: 4 };

        (reviewService.getReviewById as jest.Mock).mockResolvedValue({
            id: "review123",
            movieId: "movie001",
            userId: "anotherUser",
            rating: 5,
            comment: "Great movie",
        });

        await reviewController.updateReview(
            mockRequest,
            mockResponse as Response,
            nextFunction as NextFunction
        );

        expect(mockResponse.status).toHaveBeenCalledWith(403);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: "error",
            message: "Forbidden: You can only update your own review",
        });
    });

    it("should delete own review", async () => {
        mockRequest.params = { id: "review123" };

        (reviewService.getReviewById as jest.Mock).mockResolvedValue({
            id: "review123",
            movieId: "movie001",
            userId: "user001",
            rating: 5,
            comment: "Great movie.",
        });

        (reviewService.deleteReview as jest.Mock).mockResolvedValue(true);

        await reviewController.deleteReview(
            mockRequest,
            mockResponse as Response,
            nextFunction as NextFunction
        );

        expect(reviewService.deleteReview).toHaveBeenCalledWith("review123");
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: "success",
            message: "Review deleted successfully",
        });
    });

    it("should return 404 when deleting missing review", async () => {
        mockRequest.params = { id: "unknown" };

        (reviewService.getReviewById as jest.Mock).mockResolvedValue(null);

        await reviewController.deleteReview(
            mockRequest,
            mockResponse as Response,
            nextFunction as NextFunction
        );

        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: "error",
            message: "Review not found",
        });
    });

    it("should return 403 when user deletes another user's review", async () => {
        mockRequest.params = { id: "review123" };

        (reviewService.getReviewById as jest.Mock).mockResolvedValue({
            id: "review123",
            movieId: "movie001",
            userId: "anotherUser",
            rating: 5,
            comment: "Great movie",
        });

        await reviewController.deleteReview(
            mockRequest,
            mockResponse as Response,
            nextFunction as NextFunction
        );

        expect(mockResponse.status).toHaveBeenCalledWith(403);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: "error",
            message: "Forbidden: You can only delete your own review",
        });
    });
});