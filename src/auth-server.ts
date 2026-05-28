import "dotenv/config";
import express from "express";
import "#db";
import { authRouter } from "#routes";
import { errorHandler } from "#middleware";

const server = express();
server.use("/api/auth/", authRouter);

server.use(errorHandler);

const port = process.env.PORT || 3000;

server.listen(port, () => console.log(`Server running on port ${port}`));
