import slugify from "slugify";
import categoryModel from "../models/categorySchema.js";
import ConnectDB from "../utils/db.js";

// createCategory
const createCategory = async(req, res) => {
    try {
        await ConnectDB();
        const {name} = req.body;
        if(!name) return res.status(400).send({error: "Category name is required"})
        const existingCategory = await categoryModel.findOne({name})
        if(existingCategory) return res.status(400).send({error: "Category already exists"})
        const newCategory = new categoryModel({name, slug:slugify(name)})
        await newCategory.save()
        res.status(201).send({success: true, message: "Category created successfully", category: newCategory})
    } catch (error) { 
            if (error.response) {
                // The request was made and the server responded with a status code
                console.log("Error Data:", error.response.data);
                console.log("Error Status:", error.response.status);
                console.log("Error Headers:", error.response.headers);
                toast.error(error.response.data.message || "Error in creating category");
            } else if (error.request) {
                // The request was made but no response was received
                console.log("Error Request:", error.request);
                toast.error("No response from server");
            } else {
                // Something happened in setting up the request
                console.log("Error Message:", error.message); 
            }
        }
};

// updateCategory

const updateCategory = async(req, res)=>{
    try {
        await ConnectDB();
        const {name} = req.body;
        const {id} = req.params;
        const category = await categoryModel.findByIdAndUpdate(id, {name, slug: slugify(name)}, {new: true})
        if(!category) return res.status(404).send({success: false, message: "Category not found"})
        res.status(200).send({success: true, message: "Category updated successfully", category})     
    } catch (error) {
        console.log(error)
        res.status(500).send({success: false, error: "Internal Server Error"})
    }
}

// AllCategories
const AllCategories = async(req, res)=>{
    try {
        await ConnectDB();
        const categories = await categoryModel.find({})
        res.status(200).send({success: true, categories})     
    } catch (error) {
        console.log(error)
        res.status(500).send({success: false, error: "Internal Server Error"})
    }
}

// SingleCategory
const SingleCategory = async(req, res)=>{
    try {
        await ConnectDB();
        const category = await categoryModel.findOne({slug: req.params.slug})
        if(!category) return res.status(404).send({success: false, message: "Category not found"})
        res.status(200).send({success: true, category})
} catch (error) {
    console.log(error)
    res.status(500).send({success: false, error: "Internal Server Error"})
    }
}
// DeleteCategory

const DeleteCategory = async(req, res)=>{
    try {
        await ConnectDB();
        const {id} = req.params;
        const category = await categoryModel.findByIdAndDelete(id)
        if(!category) return res.status(404).send({success: false, message: "Category not found"})
        res.status(200).send({success: true, message: "Category deleted successfully", category})
} catch (error) {
    console.log(error)
    res.status(500).send({success: false, error: "Internal Server Error"})
    }
}

export {createCategory, updateCategory, AllCategories, SingleCategory, DeleteCategory};