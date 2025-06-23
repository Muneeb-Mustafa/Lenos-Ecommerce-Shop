 import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userSchema.js";
import jwt from "jsonwebtoken"

// Register
export const register = async(req, res)=>{
    try {
        const {name, email, password, phone, answer, address} = req.body;
        if(!name) return res.status(400).json({error: "Name is required"})
        if(!email) return res.status(400).json({error: "Email is required"})
        if(!password) return res.status(400).json({error: "Password is required"})
        if(!phone) return res.status(400).json({error: "Phone Number is required"})
        if(!answer) return res.status(400).json({error: "Answer is required"})
        if(!address) return res.status(400).json({error: "Address is required"})
        
        const existingUser = await userModel.findOne({email})
        if(existingUser) return res.status(400).json({error: "Email already exists"})
        const hashedPassword = await hashPassword(password);
        const user = new userModel({name, email, phone, address, answer, password: hashedPassword});
        await user.save()
        res.status(200).json({success : true, message: "User registered successfully", user})
    } catch (error) {
        console.log(error)
        res.status(500).send({success : false, message: "Internal Server error"})
    }
}

// Login
export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).send({ success: false, error: "Invalid email or password" });
      }
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).send({ success: false, msg: "User not found" });
      }
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        return res.status(400).send({ success: false, msg: "Invalid credentials" });
      }
      const token = jwt.sign({ id: user._id }, process.env.Secret_Key, { expiresIn: "14d" });
        res.status(200).send({
        success: true,
        message: "Logged in successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, message: "Internal Server error" });
    }
  };

  export  const forgetPassword = async(req, res)=>{
    try {
      const {email, answer, newPassword} = req.body;
      // Check if email or password is missing
      if (!email ||!answer ||!newPassword) {
        return res.status(400).send({ success: false, error: "Invalid email, answer, or new password" });
      }
      const user = await userModel.findOne({email, answer})
      if(!user) return res.status(404).send({success: false, msg: "Wrong email or answer"})
      const hashPass = await hashPassword(newPassword)
      await userModel.findByIdAndUpdate(user._id, {password: hashPass})
      res.status(200).send({ success : true, message: "Password reset successfully"})
    } catch (error) {
      console.log(error)
      res.status(500).send({ success : false, message: "Internal Server error"})
    }
  }

  export  const test = (req, res) => {
    res.status(200).send({ success: true, message: "Admin access granted" });
  };
  
 


export const updateProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Fetch the current user
    const user = await userModel.findById(req.user._id);
    if (!user) return res.status(404).send({ success: false, msg: "User not found" });

    // Validate password (if provided)
    if (password && password.length < 6) {
      return res.status(400).send({ success: false, msg: "Password should be at least 6 characters" });
    }

    // Update user details
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        email: email || user.email,
        password: password ? await hashPassword(password) : user.password,
      },
      { new: true }
    );

    // Send success response
    res.status(200).send({ success: true, message: "Profile updated successfully", updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error: "Internal Server Error" });
  }
};