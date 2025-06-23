import mongoose from "mongoose";
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        lowercase : true,
    }
});

const categoryModel = mongoose.model("category", categorySchema);
export default categoryModel;
