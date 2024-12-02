import mongoose from "mongoose";

type ConnectionState = {
  isConnected: number | null;
};

const connectionState: ConnectionState = {
  isConnected: null,
};

export async function connect(): Promise<void> {
  if (connectionState.isConnected) {
    console.log("Database already connected");
    return;
  }

  try {
    const db = await mongoose.connect(
      "mongodb+srv://usc_kiit:bXHipKDidq1dCzle@cluster0.ja54q7c.mongodb.net/USC"
    );
    console.log(db);
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
  }
}
