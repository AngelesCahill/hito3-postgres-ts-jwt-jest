// /api/v1/projects

import request from "supertest";
import { describe, expect, it, vi } from "vitest";
import app from "../src/app.js";

vi.mock("../../src/models/project.model", () => {
  return {
    projectModel: {
      findAll: vi.fn(async () => []),
    },
  };
});

// Mock del middleware verifyToken
vi.mock("../../src/middlewares/jwt.middleware", () => {
  return {
    verifyToken: vi.fn((req, res, next) => {
      // Simular datos del usuario autenticado
      req.email = "mocked@example.com";
      req.uid = "mocked-uid";
      next();
    }),
  };
});

describe("/projects", () => {
  it("GET should return projects", async () => {
    const { statusCode, body } = await request(app).get("/api/v1/projects");
    console.log(body);

    expect(statusCode).toBe(200);
  });
});