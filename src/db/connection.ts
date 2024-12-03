import mongoose from "mongoose";

type ConnectionState = {
  isConnected: number | null;
};

const connectionState: ConnectionState = {
  isConnected: null,
};

export async function connect() {
  if (connectionState.isConnected) {
    console.log("Database already connected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.DATABASE_URL!);

    connectionState.isConnected = db.connection.readyState;

    console.log(
      `Database connection ${
        connectionState.isConnected === 1 ? "successful" : "failed"
      }`
    );

    mongoose.connection.on("error", (err) => {
      console.error("Database connection error:", err);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw new Error("Database connection failed");
    process.exit(1);
  }
}
