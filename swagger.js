
export const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Car Rental API (MVP+)",
      version: "1.0.0",
      description: "API documentation"
    },
    servers: [{ url: "http://localhost:5000" }]
  },
  apis: ["./routes/*.js", "./models/*.js"] // paths to files with swagger annotations
};
