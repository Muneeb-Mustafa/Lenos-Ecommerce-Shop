import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_URL } from '../../config';
import { useCart } from '../../context/CartContext';
import { message } from 'antd';

const ProductDetail = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setrelatedProducts] = useState([]);
  const {cart, setCart} = useCart()

  const getProducts = async()=>{
        try {
          const {data} = await axios.get(`${API_URL}/api/product/single-product/${params.slug}`);
          setProduct(data?.product) 
          getRelatedProducts(data?.product._id, data?.product.category._id) 
        } catch (error) {
          console.log(error)
        }
      }
      useEffect(()=>{
        if(params?.slug) getProducts();
      }, [params?.slug])

      // Get Similar Products
      const getRelatedProducts = async (pid, cid) => {
        try {
          const { data } = await axios.get(`${API_URL}/api/product/related-product/${pid}/${cid}`);
          setrelatedProducts(data?.products); 
        } catch (error) {
          console.log(error);
        }
      }; 

  // handleCart Function
  const handleCart = (p)=>{
    setCart([...cart, p]);
    localStorage.setItem('cart', JSON.stringify([...cart, p]))
    message.success("Product added to cart successfully")
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={`${API_URL}/api/product/product-photo/${product._id}`}
            alt="Product"
            className="img-fluid product-image"
            style={{width: "500px"}}
          />
        </div>
        <div className="col-md-6 product_detail">
          <h1 className="display-5">{product.name}</h1>
          <p className="text-muted">Category: {product.category?.name}</p>
          <p className="lead">
            {product.description}
          </p>
          <h3 className="fw-bold">${product.price}</h3> 

          <button className="btn btn-primary btn-lg w-100 mt-3" onClick={()=> handleCart(product)}>
            Add to Cart
          </button>

          <hr className="my-4" />

          <ul className="list-unstyled product-specs">
            <li>
              <strong>Color:</strong> Black
            </li>
            <li>
              <strong>Size:</strong> Medium
            </li>
            <li>
              <strong>Brand:</strong> Example Brand
            </li>
            <li>
              <strong>Stock:</strong> In Stock
            </li>
          </ul>
        </div>
      </div>
      <div className="similarProducts mt-5">
        <h2>Similar Products</h2>
        <div className="row mt-5 gap-3">
        {relatedProducts.length > 0 ? (
                relatedProducts.map((product) => (
                  <div
                    key={product._id}
                    className="card"
                    style={{ width: "18rem" }}
                  >
                    <Link to="#" className="product_Link">
                      <div className="card-body">
                        <img
                          src={`${API_URL}/api/product/product-photo/${product._id}`}
                          className="card-img-top"
                          alt={product.name}
                        />
                        <h5 className="card-title mt-3">{product.name}</h5>
                        <p className="card-text">
                          {product.description.substring(0, 30)}...
                        </p>
                        <p className="card-text">Price: ${product.price}</p>
                        <Link
                          to = {`/product/${product.slug}`}
                          className="btn btn-primary"
                          style={{ marginRight: "8px" }}
                        >
                          View Product
                        </Link> 
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <h3>No Similar Products Found</h3>
              )}
        </div> 
      </div>
    </div>
  );
};

export default ProductDetail;
