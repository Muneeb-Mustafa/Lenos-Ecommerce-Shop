import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../../../config";

const Products = () => {
  const [products, setProducts] = useState([]);

  // Get all the products
  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <main>
      <h2 className="text-center ">All Products list</h2>
      <div className="products row gap-3 ">
        {products.slice(0,15).map((product) => { 
          return (
            <div key={product._id} className="card" style={{ width: "18rem" }}>
              <Link
                to={`/dashboard/admin/product/${product.slug}`}
                className="product_Link"
              >
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
                  <a href="#" className="btn btn-primary">
                    Edit Product
                  </a>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Products;
