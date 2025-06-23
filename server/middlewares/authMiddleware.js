import jwt from "jsonwebtoken"
import userModel from "../models/userSchema.js";
import ConnectDB from "../utils/db.js";

export const requireSignIn = async (req, res, next) => {
    try {
      await ConnectDB();
        const token = req.headers.authorization?.split(" ")[1]; // Extract token
        if (!token) return res.status(401).send({ success: false, message: "Token is missing" });
        
        const decode = jwt.verify(token, process.env.Secret_Key);
        req.user = decode; // Attach decoded token to req object
        next();
    } catch (error) {
        console.error("Error in requireSignIn:", error.message); // Log specific error message
        return res.status(401).send({ success: false, message: "Invalid or expired token" });
    }
};

// Admin Access
export const isAdmin = async (req, res, next) => {
    try {
      await ConnectDB();
      const user = await userModel.findById(req.user.id); 
  
      // If user is not found
      if (!user) {
        return res.status(404).send({ success: false, msg: "User not found" });
      }
  
      // Check if the user is an admin
      if (user.role !== 'admin') {
        return res.status(401).send({ success: false, msg: "Unauthorized access" });
      }
  
      next(); // Proceed to the next middleware or route handler if the user is admin
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, message: "Error in admin middleware" });
    }
  };
  