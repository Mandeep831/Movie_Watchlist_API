import request from "supertest";
import app from "../src/app";
import * as reviewRepository from "../src/api/v1/repositories/reviewRepository";
import {
  createReviewSchema,
  updateReviewSchema,
} from "../src/api/v1/validations/reviewValidation";
 
jest.mock("../src/config/firebaseConfig", () => ({
  db: {
    collection: jest.fn(() => ({
      add: jest.fn(),
      get: jest.fn(),
      doc: jest.fn(),
    })),
  },
  auth: {},
}));
 
jest.mock("../src/api/v1/repositories/reviewRepository");
 
describe("Review Feature Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
 
  it("should return API health status", async () => {
    // Act
    const response = await request(app).get("/api/v1/health");
 
    // Assert
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
  });
 
  it("should create a review", async () => {
    // Arrange
    const mockReview = {
      id: "review123",
      movieId: "movie001",
      userId: "user001",
      rating: 5,
      comment: "Great movie.",
      createdAt: "2026-04-08T10:30:00.000Z",
      updatedAt: "2026-04-08T10:30:00.000Z",
    };
 
    (reviewRepository.createReview as jest.Mock).mockResolvedValue(mockReview);
 
    // Act
    const response = await request(app).post("/api/v1/reviews").send({
      movieId: "movie001",
      userId: "user001",
      rating: 5,
      comment: "Great movie.",
    });
 
    // Assert
    expect(response.status).toBe(201);
    expect(response.body.data).toEqual(mockReview);
  });
 
  it("should return validation error for invalid create data", async () => {
    // Arrange
    const invalidData = {
      movieId: "",
      rating: 10,
    };
 
    // Act
    const response = await request(app)
      .post("/api/v1/reviews")
      .send(invalidData);
 
    // Assert
    expect(response.status).toBe(400);
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
        createdAt: "2026-04-08T10:30:00.000Z",
        updatedAt: "2026-04-08T10:30:00.000Z",
      },
    ];
 
    (reviewRepository.getAllReviews as jest.Mock).mockResolvedValue(mockReviews);
 
    // Act
    const response = await request(app).get("/api/v1/reviews");
 
    // Assert
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(mockReviews);
  });
 
  it("should get review by id", async () => {
    // Arrange
    const mockReview = {
      id: "review123",
      movieId: "movie001",
      userId: "user001",
      rating: 5,
      comment: "Great movie.",
      createdAt: "2026-04-08T10:30:00.000Z",
      updatedAt: "2026-04-08T10:30:00.000Z",
    };
 
    (reviewRepository.getReviewById as jest.Mock).mockResolvedValue(mockReview);
 
    // Act
    const response = await request(app).get("/api/v1/reviews/review123");
 
    // Assert
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(mockReview);
  });
 
  it("should return 404 if review not found", async () => {
    // Arrange
    (reviewRepository.getReviewById as jest.Mock).mockResolvedValue(null);
 
    // Act
    const response = await request(app).get("/api/v1/reviews/unknown");
 
    // Assert
    expect(response.status).toBe(404);
  });
 
  it("should update review", async () => {
    // Arrange
    (reviewRepository.updateReview as jest.Mock).mockResolvedValue(true);
 
    // Act
    const response = await request(app)
      .put("/api/v1/reviews/review123")
      .send({
        rating: 4,
        comment: "Updated review",
      });
 
    // Assert
    expect(response.status).toBe(200);
  });
 
  it("should return 404 when updating missing review", async () => {
    // Arrange
    (reviewRepository.updateReview as jest.Mock).mockResolvedValue(false);
 
    // Act
    const response = await request(app)
      .put("/api/v1/reviews/unknown")
      .send({
        rating: 4,
      });
 
    // Assert
    expect(response.status).toBe(404);
  });
 
  it("should delete review", async () => {
    // Arrange
    (reviewRepository.deleteReview as jest.Mock).mockResolvedValue(true);
 
    // Act
    const response = await request(app).delete("/api/v1/reviews/review123");
 
    // Assert
    expect(response.status).toBe(200);
  });
 
  it("should validate create schema directly", () => {
    // Arrange
    const validData = {
      movieId: "movie001",
      userId: "user001",
      rating: 5,
      comment: "Great movie",
    };
 
    // Act
    const { error } = createReviewSchema.validate(validData);
 
    // Assert
    expect(error).toBeUndefined();
  });
 
  it("should fail invalid create schema", () => {
    // Arrange
    const invalidData = {
      movieId: "",
      rating: 9,
    };
 
    // Act
    const { error } = createReviewSchema.validate(invalidData);
 
    // Assert
    expect(error).toBeDefined();
  });
 
  it("should validate update schema", () => {
    // Arrange
    const updateData = {
      rating: 4,
    };
 
    // Act
    const { error } = updateReviewSchema.validate(updateData);
 
    // Assert
    expect(error).toBeUndefined();
  });
});
 