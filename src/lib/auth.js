// lib/auth.js
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const uri = process.env.MONGO_URI;

if (!uri) {
    throw new Error("MONGO_URI is not set in .env.local");
}

const client = new MongoClient(uri, {
    tls: true,
    tlsAllowInvalidCertificates: true,
    tlsAllowInvalidHostnames: true,
    serverSelectionTimeoutMS: 30000,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 30000,
    family: 4,
});

const authPromise = (async () => {
    console.log(" Connecting to MongoDB Atlas...");
    try {
        await client.connect();
        const db = client.db("sample_mflix");
        console.log("✅ MongoDB Connected Successfully!");
        return betterAuth({
            secret: process.env.BETTER_AUTH_SECRET,
            baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",

            database: mongodbAdapter(db, { client }),

            emailAndPassword: {
                enabled: true,
                autoSignIn: true,
            },

            logger: { level: "debug" },
        });
    } catch (err) {
        console.error("MongoDB Connection Failed:", err.message);
        throw err;
    }
})();

export const auth = await authPromise;