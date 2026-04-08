import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movie Watchlist API",
      version: "1.0.0",
      description: "API documentation for Movie Watchlist project",
    },
    servers: [
      {
        url: process.env.SWAGGER_SERVER_URL || "http://localhost:3000/api/v1",
      },
    ],
  },
  apis: ["./src/api/v1/routes/*.ts"],
};

export default swaggerOptions;
