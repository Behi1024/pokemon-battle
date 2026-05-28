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

const UserRegisterCheckSchema = z.object({
	username: z.string({ error: "A username is required" }),
	email: z.string().email({ error: "A correct E-Mail is required" }),
	password: z
		.string({
			error: "A password is required",
		})
		.min(8, "Password must contain at least 8 characters")
		.regex(/[A-Za-z]/, "Password must contain letters")
		.regex(/[0-9]/, "Password must contain numbers"),
});

type UserType = z.infer<typeof UserRegisterCheckSchema>;

export { type UserType, User, UserRegisterCheckSchema };
