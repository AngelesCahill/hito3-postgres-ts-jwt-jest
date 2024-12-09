import "dotenv/config";

import express from "express";
import { httpErrorHandle } from "./middlewares/httpError.middleware";
import authRoute from "./routes/auth.route";
import userRoute from "./routes/user.route";

import swaggerUi from "swagger-ui-express";
import openapiSpecification from "./config/swagger";

const app = express();

app.use(
  "/api/v1/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(openapiSpecification)
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);

app.use(httpErrorHandle);

export default app;