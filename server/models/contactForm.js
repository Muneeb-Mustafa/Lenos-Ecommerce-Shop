import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  website: { type: String },
  message: { type: String, required: true },
}, {timestamps: true});

const contact = mongoose.model('Contact', ContactSchema);
export default contact;
