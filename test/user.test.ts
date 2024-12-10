// /api/v1/users

import request from "supertest";
import { describe, expect, it, vi } from "vitest";
import app from "../src/app.js";
import jwt from 'jsonwebtoken';

vi.mock("../../src/models/user.model", () => {
  return {
    UserModel: {
      findAll: vi.fn(async () => []),
    },
  };
});

// Mock jsonwebtoken
vi.mock('jsonwebtoken', () => ({
  default: {
    verify: vi.fn(() => ({ email: 'test@example.com', uid: '123' }))
  }
}));

// Mock auth.util.ts
vi.mock('../../src/utils/auth.util', () => ({
  verifyAccessToken: vi.fn(() => ({ email: 'test@example.com', uid: '123' }))
}));

// Mock del middleware verifyToken (actualizado)
vi.mock("../../src/middlewares/jwt.middleware", () => {
  return {
    verifyToken: vi.fn((req, res, next) => {
      req.email = "test@example.com";
      req.uid = "123";
      next();
    }),
  };
});

describe("/users", () => {
  it("GET should return users", async () => {
    const { statusCode, body } = await request(app)
      .get("/api/v1/users")
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');

    console.log(body);
    expect(statusCode).toBe(200);
  });
});