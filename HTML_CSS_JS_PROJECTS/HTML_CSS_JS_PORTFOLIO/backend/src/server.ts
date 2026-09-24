import app from "./app";
import dotenv from "dotenv";
import connectDb from "./config/db";
dotenv.config();

const PORT = Number(process.env.PORT) || 5000;

const startServer = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(`failed to start server ${error}`);
    process.exit(1);
  }
};

startServer();
