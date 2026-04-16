import { Request, Response, NextFunction } from "express";
import * as reviewController from "../src/api/v1/controllers/reviewController";
import * as reviewService from "../src/api/v1/services/reviewService";
 
jest.mock("../src/api/v1/services/reviewService");
jest.mock("../src/api/v1/services/emailService", () => ({
    sendEmail: jest.fn().mockResolvedValue(undefined),
}));
 
describe("reviewController", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: jest.Mock;
 
    beforeEach(() => {
        mockRequest = {
            body: {},
            params: {},
        };
 
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
 
        nextFunction = jest.fn();
        jest.clearAllMocks();
    });
 
    it("should create a review", async () => {
        // Arrange
        const mockReview = {
            id: "review123",
            movieId: "movie001",
            userId: "user001",
            rating: 5,
            comment: "Great movie.",
        };
 
        mockRequest.body = {
            movieId: "movie001",
            userId: "user001",
            rating: 5,
            comment: "Great movie.",
        };
 
        (reviewService.createReview as jest.Mock).mockResolvedValue(mockReview);
 
        // Act
        await reviewController.createReview(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction as NextFunction
        );
 
        // Assert
        expect(reviewService.createReview).toHaveBeenCalledWith(mockRequest.body);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: "success",
            data: mockReview,
        });
    });
 
    it("should get all reviews", async () => {
        // Arrange
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
 
        // Act
        await reviewController.getAllReviews(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction as NextFunction
        );
 
        // Assert
        expect(reviewService.getAllReviews).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: "success",
            data: mockReviews,
        });
    });
 
    it("should get review by id", async () => {
        // Arrange
        const mockReview = {
            id: "review123",
            movieId: "movie001",
            userId: "user001",
            rating: 5,
            comment: "Great movie.",
        };
 
        mockRequest.params = { id: "review123" };
 
        (reviewService.getReviewById as jest.Mock).mockResolvedValue(mockReview);
 
        // Act
        await reviewController.getReviewById(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction as NextFunction
        );
 
        // Assert
        expect(reviewService.getReviewById).toHaveBeenCalledWith("review123");
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: "success",
            data: mockReview,
        });
    });
 
    it("should return 404 if review not found", async () => {
        // Arrange
        mockRequest.params = { id: "unknown" };
 
        (reviewService.getReviewById as jest.Mock).mockResolvedValue(null);
 
        // Act
        await reviewController.getReviewById(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction as NextFunction
        );
 
        // Assert
        expect(reviewService.getReviewById).toHaveBeenCalledWith("unknown");
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: "error",
            message: "Review not found",
        });
    });
 
    it("should update review", async () => {
        // Arrange
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
 
        (reviewService.updateReview as jest.Mock).mockResolvedValue(updatedReview);
 
        // Act
        await reviewController.updateReview(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction as NextFunction
        );
 
        // Assert
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
        // Arrange
        mockRequest.params = { id: "unknown" };
        mockRequest.body = { rating: 4 };
 
        (reviewService.updateReview as jest.Mock).mockResolvedValue(null);
 
        // Act
        await reviewController.updateReview(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction as NextFunction
        );
 
        // Assert
        expect(reviewService.updateReview).toHaveBeenCalledWith("unknown", {
            rating: 4,
        });
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: "error",
            message: "Review not found",
        });
    });
 
    it("should delete review", async () => {
        // Arrange
        mockRequest.params = { id: "review123" };
 
        (reviewService.deleteReview as jest.Mock).mockResolvedValue(true);
 
        // Act
        await reviewController.deleteReview(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction as NextFunction
        );
 
        // Assert
        expect(reviewService.deleteReview).toHaveBeenCalledWith("review123");
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: "success",
            message: "Review deleted successfully",
        });
    });
 
    it("should return 404 when deleting missing review", async () => {
        // Arrange
        mockRequest.params = { id: "unknown" };
 
        (reviewService.deleteReview as jest.Mock).mockResolvedValue(false);
 
        // Act
        await reviewController.deleteReview(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction as NextFunction
        );
 
        // Assert
        expect(reviewService.deleteReview).toHaveBeenCalledWith("unknown");
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: "error",
            message: "Review not found",
        });
    });
});