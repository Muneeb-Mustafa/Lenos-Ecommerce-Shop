import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Radio, message } from "antd";
import { price } from "../../components/Prices/Prices";
import { useCart } from "../../context/CartContext";
import { API_URL } from "../../config";

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { cart, setCart } = useCart();

  // Get All Categories
  const getAllCategories = async () => {
    try { 
      const { data } = await axios.get(`${API_URL}/api/category/get-category`); 
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // Fetch all products from backend
  const getProducts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/product/get-product`);
      setProducts(data.products);
      setFilteredProducts(data.products);  
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Handle category selection
  const handleFilter = (value, id) => {
    let allChecked = [...checked];
    if (value) {
      allChecked.push(id);
    } else {
      allChecked = allChecked.filter((c) => c !== id);
    }
    setChecked(allChecked);
  };

  // Handle price range selection
  const handlePriceFilter = (e) => {
    setRadio(e.target.value);
  };

  // Filter products based on category, price, and search term
  const filterProduct = () => {
    let filtered = [...products]; 

    // Filter by categories
    if (checked.length > 0) {
      filtered = filtered.filter((product) => {
        if (product.category) {
          return checked.includes(product.category);
        }
        return false;
      });
    }

    // Filter by price range
    if (radio.length > 0) {
      filtered = filtered.filter((product) => {
        return product.price >= radio[0] && product.price <= radio[1];
      });
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  // Trigger filterProduct when checked, radio, or searchTerm changes
  useEffect(() => {
    filterProduct();
  }, [checked, radio, searchTerm]);
  
  const removeFilters = () => {
    window.location.reload();
  };

  // handleCart Function
  const handleCart = (product) => {
    const existingProductIndex = cart.findIndex(item => item._id === product._id);
    
    if (existingProductIndex !== -1) {
      // If product already exists, update its quantity
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].length += 1; // Increase quantity by 1
      setCart(updatedCart); 
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      message.success("Product added to cart successfully");
    } else {
      // If product does not exist, add it to the cart
      const newCart = [...cart, { ...product, length: 1 }]; // Initialize quantity as 1
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
      message.success("Product added to cart successfully");
    }
  };

  return (
    <>
      <Helmet>
        <title>Home - Ecommerce Shop</title>
        <meta
          name="description"
          content="Discover the best deals on electronics, fashion, and home goods. Shop top-quality products at unbeatable prices. Fast shipping and great customer service."
        />
        <meta
          name="keywords"
          content="eCommerce, online shopping, best deals, electronics, fashion, home goods, discount store, free shipping"
        />
      </Helmet>
      <main>
        <div className="row mt-lg-5 container-fluid">
          <div className="col-md-3 mt-5 filters text-center">
            <h5>Filter By Category</h5>
            <div className="categories d-flex flex-column mt-5 gap-3">
              {categories?.map((category) => (
                <Checkbox
                  key={category._id}
                  onChange={(e) => handleFilter(e.target.checked, category._id)}
                >
                  {category.name}
                </Checkbox>
              ))}
            </div>

            <div className="priceFilter mt-5 text-center">
              <h5>Filter By Price</h5>
              <div className="categories d-flex flex-column mt-3 gap-3">
                <Radio.Group onChange={handlePriceFilter}>
                  {price?.map((p) => (
                    <div key={p._id}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
            </div>

            <div className="mt-2">
              <div
                className="categories d-flex flex-column mt-3 gap-3" 
              >
                <Button color="danger" variant="solid" onClick={removeFilters}>
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>

          <div className="col-md-9"> 
          <div className="inputField">
          <h1 className="text-center">All Products</h1>
            <input
              type="text"
              placeholder="Search Products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control mb-3" 
            />
          </div>
            <div className="products-container">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
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
                          to={`/product/${product.slug}`} 
                          className="btn btn-primary"
                          style={{ marginRight: "8px" }}
                        >
                          View Product
                        </Link>
                        <button className="btn btn-primary" onClick={() => handleCart(product)}>
                          Add to Cart
                        </button>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <h3>No Products Found</h3>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
