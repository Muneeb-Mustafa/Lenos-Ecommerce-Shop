import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../../config";
import { useCart } from "../../context/CartContext";
import { message } from "antd";

const Products = () => {
  const [products, setProducts] = useState([]);
  const {cart, setCart} = useCart()

  // Get all the products
  const getProducts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/product/get-product`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // handleCart Function
  const handleCart = (p)=>{
    setCart([...cart, p]);
    localStorage.setItem('cart', JSON.stringify([...cart, p]))
    message.success("Product added to cart successfully")
  }

  return (
    <div className="container pt-5 pb-5 text-center trend p-4"> 
      <h1 className="mb-3" style={{fontFamily: "Playfair-Display", fontSize: "46px"}}>Trending Now</h1>
      <p>
        We are happy to introduce the new Lawson Collection. These are three
        quartz models designed with simplicity and elegance kept in mind.
      </p>
      <div className="row justify-content-center ">
        {products.slice(0, 3).map((product) => (
          <div key={product._id} className="col-md-4 mb-lg-4 d-flex align-items-stretch">
            <div className="card" style={{ width: "100%", marginLeft: "10px" }}> 
                <div className="card-body">
                  <img
                    src={`${API_URL}/api/product/product-photo/${product._id}`}
                    className="card-img-top"
                    alt={product.name}
                  />
                  <h5 className="card-title mt-3">{product.name}</h5>
                  <p className="card-text">
                    {product.description.length > 100
                      ? product.description.substring(0, 100) + "..."
                      : product.description}
                  </p>
                  <p className="card-text">Price: ${product.price}</p>
                  <Link to = {`product/${product.slug}`} className="btn btn-primary" style={{ marginRight: "8px" }}>
                    View Product
                  </Link>
                  <button className="btn btn-primary" onClick={()=> handleCart(product)}>
                    Add to Cart
                  </button>
                </div> 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
