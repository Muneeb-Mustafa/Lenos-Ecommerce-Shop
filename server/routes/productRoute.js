import express from "express"    
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";   
import formidable from "express-formidable"
import { createProduct, getProducts, singleProduct, productPhoto, deleteProduct, updateProduct, relatedProduct, productCategory, Checkout, GetCheckout } from "../controllers/productController.js";
const router = express.Router()

// Create Product
router.post('/create-product',requireSignIn, isAdmin, formidable(), createProduct) 
// Get Product
router.get('/get-product', getProducts) 
// Product photo
router.get('/product-photo/:pid', productPhoto) 
// Single Product
router.get('/single-product/:slug', singleProduct)  
// Related Product
router.get('/related-product/:pid/:cid', relatedProduct)  
// Product Category Product
router.get('/product-category/:slug', productCategory)  
// Update Product
router.put('/update-product/:pid', formidable(), updateProduct) 
// Delete Product
router.delete('/delete-product/:pid', deleteProduct) 
// Checout Product
router.post('/checkout', Checkout)  
// Checout Get Product
router.get('/get-checkout', GetCheckout)  



export default router;
