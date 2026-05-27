import "dotenv/config";
import express from "express";
import "#db";
import { authRouter } from "#routes";

const server = express();
server.use("/api/auth/", authRouter);

const port = process.env.PORT || 3000;

server.listen(port, () => console.log(`Server running on port ${port}`));
