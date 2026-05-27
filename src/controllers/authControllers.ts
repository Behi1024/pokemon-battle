import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "#models";

const logout: RequestHandler = async (req, res, next) => {
	res.clearCookie("token");
	res.json({ msg: "Logged out" });
};

const login: RequestHandler = async (req, res, next) => {
	const { password, email } = req.body;
	const user = await User.findOne({ email }).lean();

	if (!user) {
		throw new Error("No User with such E-Mail");
	}

	const match = await bcrypt.compare(password, user.passwordHash!);

	if (!match) {
		throw new Error("Invalid password");
	}

	const token = jwt.sign({ _id: user._id }, process.env.TOKEN_MIX as string);

	res.cookie("token", token, {
		httpOnly: true,
		secure: false,
		sameSite: "lax",
	});

	res.json({ msg: "Login | Success", token });
};

const register: RequestHandler = async (req, res, next) => {
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
};

export { logout, login, register };
