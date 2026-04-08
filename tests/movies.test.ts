/// <reference types="jest" />

import {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../src/api/v1/services/movieService";
import * as movieRepository from "../src/api/v1/repositories/movieRepository";
import { Movie } from "../src/api/v1/models/movieModel";

jest.mock("../src/config/firebaseConfig", () => ({
    db: {},
    auth: {},
}))

jest.mock("../src/api/v1/repositories/movieRepository");
 
describe("movieService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
 
  it("should return all movies", async () => {
    // Arrange
    const mockMovies: Movie[] = [
      {
        id: "1",
        title: "Movie 1",
        genre: "Action",
        releaseYear: 2020,
        description: "Test movie 1",
        createdAt: "2026-04-07T10:00:00.000Z",
        updatedAt: "2026-04-07T10:00:00.000Z",
      },
    ];
    (movieRepository.getAllMovies as jest.Mock).mockResolvedValue(mockMovies);
 
    // Act
    const result = await getAllMovies();
 
    // Assert
    expect(result).toEqual(mockMovies);
    expect(movieRepository.getAllMovies).toHaveBeenCalledTimes(1);
  });
 
  it("should return movie by id when found", async () => {
    // Arrange
    const mockMovie: Movie = {
      id: "1",
      title: "Movie 1",
      genre: "Action",
      releaseYear: 2020,
      description: "Test movie 1",
      createdAt: "2026-04-07T10:00:00.000Z",
      updatedAt: "2026-04-07T10:00:00.000Z",
    };
    (movieRepository.getMovieById as jest.Mock).mockResolvedValue(mockMovie);
 
    // Act
    const result = await getMovieById("1");
 
    // Assert
    expect(result).toEqual(mockMovie);
    expect(movieRepository.getMovieById).toHaveBeenCalledWith("1");
  });
 
  it("should return null when movie id is not found", async () => {
    // Arrange
    (movieRepository.getMovieById as jest.Mock).mockResolvedValue(null);
 
    // Act
    const result = await getMovieById("999");
 
    // Assert
    expect(result).toBeNull();
    expect(movieRepository.getMovieById).toHaveBeenCalledWith("999");
  });
 
  it("should create a movie with createdAt and updatedAt", async () => {
    // Arrange
    const inputData = {
      title: "New Movie",
      genre: "Drama",
      releaseYear: 2024,
      description: "New description",
    };
    (movieRepository.createMovie as jest.Mock).mockResolvedValue("abc123");
 
    // Act
    const result = await createMovie(inputData);
 
    // Assert
    expect(result).toHaveProperty("id", "abc123");
    expect(result).toHaveProperty("title", "New Movie");
    expect(result).toHaveProperty("createdAt");
    expect(result).toHaveProperty("updatedAt");
    expect(movieRepository.createMovie).toHaveBeenCalledTimes(1);
  });
 
  it("should update and return movie when movie exists", async () => {
    // Arrange
    const existingMovie: Movie = {
      id: "1",
      title: "Old Movie",
      genre: "Action",
      releaseYear: 2020,
      description: "Old description",
      createdAt: "2026-04-07T10:00:00.000Z",
      updatedAt: "2026-04-07T10:00:00.000Z",
    };
    const updateData = {
      title: "Updated Movie",
    };
 
    (movieRepository.getMovieById as jest.Mock).mockResolvedValue(existingMovie);
    (movieRepository.updateMovie as jest.Mock).mockResolvedValue(true);
 
    // Act
    const result = await updateMovie("1", updateData);
 
    // Assert
    expect(result).not.toBeNull();
    expect(result).toHaveProperty("title", "Updated Movie");
    expect(result).toHaveProperty("updatedAt");
    expect(movieRepository.updateMovie).toHaveBeenCalledTimes(1);
  });
 
  it("should return null when updating a non-existing movie", async () => {
    // Arrange
    (movieRepository.getMovieById as jest.Mock).mockResolvedValue(null);
 
    // Act
    const result = await updateMovie("999", { title: "Updated Movie" });
 
    // Assert
    expect(result).toBeNull();
    expect(movieRepository.updateMovie).not.toHaveBeenCalled();
  });
 
  it("should delete movie when movie exists", async () => {
    // Arrange
    const existingMovie: Movie = {
      id: "1",
      title: "Movie 1",
      genre: "Action",
      releaseYear: 2020,
      description: "Test movie",
      createdAt: "2026-04-07T10:00:00.000Z",
      updatedAt: "2026-04-07T10:00:00.000Z",
    };
 
    (movieRepository.getMovieById as jest.Mock).mockResolvedValue(existingMovie);
    (movieRepository.deleteMovie as jest.Mock).mockResolvedValue(true);
 
    // Act
    const result = await deleteMovie("1");
 
    // Assert
    expect(result).toBe(true);
    expect(movieRepository.deleteMovie).toHaveBeenCalledWith("1");
  });
 
  it("should return false when deleting non-existing movie", async () => {
    // Arrange
    (movieRepository.getMovieById as jest.Mock).mockResolvedValue(null);
 
    // Act
    const result = await deleteMovie("999");
 
    // Assert
    expect(result).toBe(false);
    expect(movieRepository.deleteMovie).not.toHaveBeenCalled();
  });
});
 