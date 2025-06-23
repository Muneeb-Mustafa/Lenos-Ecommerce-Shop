import productModel from "../models/productSchema.js"
import categoryModel from "../models/categorySchema.js";
import slugify from "slugify";
import fs from "fs"
import jwt from "jsonwebtoken" 
import dotenv from "dotenv"
import checkoutModel from "../models/checkoutSchema.js";
dotenv.config() 



// Create Product 
const createProduct = async(req, res)=>{
    try {
        const {name, description, slug, price,category, quantity, shipping} = req.fields;
        const {photo} = req.files; 
        // Validation
        switch(true){
            case!name:
            case!description:
            case!price:
            case!category:
            case!quantity: 
                return res.status(400).send({success: false, error: "All fields are required"})
            case photo && photo.size > 1000000: // Change to 1MB
                return res.status(500).send({success:false, error: "Photo is required and should be less than 1mb"})    
            default:
                break;
        }
        const products = new productModel({...req.fields, slug: slugify(name)})
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(200).send({success: true, msg: "New product created successfully.", products})
    } catch (error) {
        console.log(error)
        res.status(500).send({success: false, error: "Error in creating product"})
    }
}

// Get Product 
const getProducts = async(req, res)=>{
    try {
        const products = await productModel.find({}).select("-photo").limit(12).sort({createdAt: -1})
        res.status(200).send({success: true, msg: "All product", countProduct: products.length, products})
    } catch (error) {
        console.log(error)
        res.status(500).send({success: false, error: "Error in getting products"})
    }
}
// Get Single Product 
const singleProduct = async(req, res)=>{
    try {
        const product = await productModel.findOne({slug: req.params.slug}).select("-photo").populate("category")
        res.status(200).send({success: true, msg: "Single product fetched successfully", product})
    } catch (error) {
        console.log(error)
        res.status(500).send({success: false, error: "Error in getting single product"})
    }
}

// Get Product Photo 
const productPhoto = async(req, res)=>{
    try {
        const product = await productModel.findById(req.params.pid).select("photo")
        if(product.photo.data){
            res.set('Content-Type', product.photo.contentType)
            res.send(product.photo.data)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({success: false, error: "Error in getting product photo"})
    }
}

// delete Product

const deleteProduct = async(req, res)=>{
    try {
        await productModel.findByIdAndDelete(req.params.pid)
        res.status(200).send({success: true, msg: "Product deleted successfully."})
    } catch (error) {
        console.log(error)
        res.status(500).send({success: false, error: "Error in deleting product"})
    }
}

// Update Product 

const updateProduct = async (req, res) => {
  try {
    console.log('req.fields:', req.fields);
    console.log('req.params.pid:', req.params.pid);

    const product = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(req.fields.name) },
      { new: true }
    );

    if (!product) {
      return res.status(404).send({
        success: false,
        error: 'Product not found',
      });
    }

    if (req.fields.photo) {
      console.log('Updating photo...');
      product.photo.data = fs.readFileSync(req.fields.photo.path);
      product.photo.contentType = req.fields.photo.type;
      await product.save();
    }

    res.status(200).send({
      success: true,
      msg: 'Product updated successfully.',
      product,
    });
  } catch (error) {
    console.error('Error in updating product:', error);
    res.status(500).send({
      success: false,
      error: 'Error in updating product',
    });
}
};


const relatedProduct = async(req, res)=>{
    try {
        const {pid, cid} = req.params;
        const products = await productModel.find({category: cid, _id: {$ne: pid}}).select("-photo").limit(4).populate("category");
        res.status(200).send({success: true, msg: "Related products fetched successfully", products})
    } catch (error) {
        console.error('Error in while getting related product:', error);
        res.status(500).send({
          success: false,
          error: 'Error in related product',
        });
    }
}

const productCategory = async(req, res)=>{
    try {
        const category = await categoryModel.findOne({slug: req.params.slug})
        const products = await productModel.find({category}).populate('category')
        res.status(200).send({success: true, msg: "Products fetched successfully", category, products})
    } catch (error) {
        console.error('Error in while getting product:', error);
        res.status(500).send({
          success: false,
          error: 'Error in getting product',
        });
    }
}

const Checkout = async (req, res) => {
  try {
    const { cardName, cardNumber, expiration, cvv } = req.body;

    // Validation
    if (!cardName || !/^[a-zA-Z\s]+$/.test(cardName)) {
      return res.status(400).json({ success: false, msg: 'Invalid cardholder name.' });
    }

    if (!cardNumber || !/^\d{13,19}$/.test(cardNumber)) {
      return res.status(400).json({ success: false, msg: 'Invalid card number.' });
    }

    if (!expiration || !/^(0[1-9]|1[0-2])\/\d{4}$/.test(expiration)) {
      return res.status(400).json({ success: false, msg: 'Invalid expiration date. Use MM/YYYY format.' });
    }

    // Check if the expiration date is in the future
    const [month, year] = expiration.split('/');
    const currentDate = new Date();
    const expirationDate = new Date(`${year}-${month}-01`);

    if (expirationDate <= currentDate) {
      return res.status(400).json({ success: false, msg: 'Expiration date is in the past.' });
    }

    if (!cvv || !/^\d{3,4}$/.test(cvv)) {
      return res.status(400).json({ success: false, msg: 'Invalid CVV. Must be 3 or 4 digits.' });
    }

    // Creating a new checkout record
    const checkout = new checkoutModel({
      cardName,
      cardNumber, // Consider encrypting this
      expiration, // Now stored as a string
      cvv // Consider encrypting this too
    });

    await checkout.save();

    // Generate a token (JWT or any other type of token)
    const token = jwt.sign({ checkoutId: checkout._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).send({
      success: true,
      msg: 'Checkout successful',
      checkout,
      token, // JWT token for authenticated user
    });

  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ message: 'Error in checkout process', error: error.message });
  }
};


const GetCheckout = async(req, res)=>{
  try {
    const checkouts = await checkoutModel.find({})
    res.status(200).send({success: true, msg: "All checkouts", countCheckouts: checkouts.length, checkouts})
  } catch (error) {
    console.error('Error in while getting checkout:', error);
    res.status(500).send({
      success: false,
      error: 'Error in getting checkout',
    });
  }
} 

export {createProduct, getProducts, singleProduct, productPhoto, deleteProduct, updateProduct, relatedProduct, productCategory, Checkout, GetCheckout};