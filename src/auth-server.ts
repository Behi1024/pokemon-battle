import "dotenv/config";
import express from "express";
import "#db";
import { authRouter } from "#routes";
import { errorHandler } from "#middleware";
import cors from "cors";

const server = express();

server.use(cors({ origin: "http://localhost:5173", credentials: true }));

server.use("/api/auth/", authRouter);

server.use(errorHandler);

const port = process.env.PORT || 3000;

server.listen(port, () => console.log(`Server running on port ${port}`));
