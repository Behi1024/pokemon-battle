import mongoose from "mongoose";

const connection = async () => {
	try {
		const client = await mongoose
			.connect(process.env.DB_URL as string)
			.then();
		console.log(`✅ Connected to MongoDB: ${client.connection.name}`);
	} catch (err) {
		console.log("❌ MongoDB connection error:", err);
		//process.exit(1)
	}
};

connection();
