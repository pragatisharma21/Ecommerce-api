import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import productRoutes from "./Routes/product.route.js";
import categoryRoutes from "./Routes/category.route.js";
import userRoutes from "./Routes/user.route.js";
import CORS from "cors";
import colors from "colors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

connectDB();

app.use(
  CORS({
    origin: ["http://localhost:5173", "*"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`<h1>Pragati ka backend hai </h1>`);
});

app.use('/api/users', userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port".green.bold + ` ${PORT}`.cyan.bold);
  console.log(
    "Click to redirect".yellow.bold +
      ` http://localhost:${PORT}`.underline.blue
  );
});
