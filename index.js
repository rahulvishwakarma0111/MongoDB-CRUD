import 'dotenv/config';
import express from "express";
import { connectMongoDB } from "./connection.js";
import userRoutes from "./routes/user.routes.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";


const app = express();
const PORT = process.env.PORT || 8001;


connectMongoDB(process.env.MONGODB_URL).then(() => {
    console.log("MongoDB connected successfully");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
});

app.use(express.json());
app.use(authMiddleware);

app.use("/api/user", userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})