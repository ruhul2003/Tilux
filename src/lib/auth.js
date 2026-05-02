import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import dns from "node:dns";

// Optional DNS fix for MongoDB Atlas
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// Create MongoDB client
const client = new MongoClient(process.env.MONGO_URI);

// Connect to MongoDB
await client.connect();

// Select database
const db = client.db("sample_mflix");

export const auth = betterAuth({
  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
  },
});