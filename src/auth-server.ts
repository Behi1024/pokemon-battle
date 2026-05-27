import "dotenv/config";
import express from "express";
import "#db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const server = express();

server.use(express.json());

import { User } from "#models";

server.post("/api/auth/register", async (req, res) => {
	const { username, email, password, createdAt } = req.body;

	const emailExists = await User.exists({ email });
	if (emailExists) throw new Error("User with this E-Mail already exists");

	const salt = await bcrypt.genSalt(13);
	const hashedPW = await bcrypt.hash(password, salt);

	const user = await User.create({
		username: username,
		email: email,
		passwordHash: hashedPW,
		createdAt: createdAt,
	});

	res.json({ msg: "Register | Success:", user: { ...user } });
});

server.post("/api/auth/login", async (req, res) => {
	const { password, email } = req.body;
	const user = await User.findOne({ email }).lean();

	if (!user) {
		throw new Error("No User with such E-Mail");
	}

	const match = bcrypt.compare(password, user.passwordHash!);

	if (!match) {
		throw new Error("Invalid password");
	}

	const token = jwt.sign(
		{ email: user.email },
		process.env.TOKEN_MIX as string,
	);

	res.cookie("token", token, {
		httpOnly: true,
		secure: false,
		sameSite: "lax",
	});

	res.json({ msg: "Login | Success", token });
});

server.post("/api/auth/logout", (req, res) => {
	res.clearCookie("token");
	res.json({ msg: "Logged out" });
});

const port = process.env.PORT || 3000;

server.listen(port, () => console.log(`Server running on port ${port}`));
