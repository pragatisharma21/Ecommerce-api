import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import productRoutes from "./Routes/product.route.js"
import CORS from "cors"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080;

connectDB()

app.use(CORS({
    origin: ["http://localhost:5173","*"],
    credentials: true
}))

app.use(express.json());


app.get("/", (req, res)=>{
    res.send(`<h1>Pragati ka backend hai </h1>`)
});

app.use('/api/product', productRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
    console.log(`Click to redirect http://localhost:${PORT}`)
})