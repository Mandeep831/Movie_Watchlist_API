import request from "supertest";
import app from "../src/app";

describe("Health Route", () => {
    it("should return API running message", async () => {
        // Arrange
        const url = "/api/v1/health";

        // Act
        const response = await request(app).get(url);

        // Assert
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: "success",
            message: "Movie Watchlist API is running",
        });
    });

    it("should return json content type", async () => {
        // Arrange
        const url = "/api/v1/health";

        // Act
        const response = await request(app).get(url);

        // Assert
        expect(response.headers["content-type"]).toMatch(/json/);
    });

    it("should return 404 for invalid health route", async () => {
        // Arrange
        const url = "/api/v1/health-invalid";

        // Act
        const response = await request(app).get(url);

        // Assert
        expect(response.status).toBe(404);
    });
});