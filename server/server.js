import dotenv from "dotenv";
import path from "path";
import express from "express";
import ConnectDB from "./utils/db.js";
import morgan from "morgan";
import cors from "cors"; 
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import contactRoute from "./routes/contactRoute.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Set Port
const port = process.env.PORT || 8080;

// Connect to Database
await ConnectDB();

// Middleware Configuration
app.use(cors({
    origin: ['https://lenos-ecommerce-shop-5m6x.vercel.app'],  
    credentials: true,  
  }));

app.use(express.json()); // Parse JSON request body
app.use(morgan('dev')); // Log HTTP requests 

// API Routes
app.use('/api/auth', authRoute);
app.use('/api/category', categoryRoute);
app.use('/api/product', productRoute);
app.use('/api/contact', contactRoute);


// Root Route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to Lenos Ecommerce Shop!</h1>');
});

// Start Server
app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${port}`);
});

