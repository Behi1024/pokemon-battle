import { Schema, model } from "mongoose";
import { z } from "zod";

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	passwordHash: String,
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const User = model("User", UserSchema, "users");

const UserCheckSchema = z.object({
	username: z.string({ error: "A username is required" }),
	email: z.string().email({ error: "A correct E-Mail is required" }),
	passwordHash: z
		.string({
			error: "A hashed password is required",
		})
		.regex(/^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/, "Invalid bcrypt hash"),
	createdAt: z
		.string()
		.regex(
			/^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/,
			"Date must be in German format (dd.MM.yyyy)",
		),
});

type UserType = z.infer<typeof UserCheckSchema>;

export { type UserType, User, UserCheckSchema };
