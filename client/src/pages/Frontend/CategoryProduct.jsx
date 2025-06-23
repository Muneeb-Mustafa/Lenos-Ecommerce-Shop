import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'; 
import { API_URL } from '../../config';

const CategoryProduct = () => {
    const params = useParams();
    const [products, setProducts]  = useState([]);
    const [category, setCategory]  = useState(null);

    const getProducts = async() => {
        try {
            const { data } = await axios.get(`${API_URL}/api/product/product-category/${params.slug}`);
            setProducts(data?.products);
            setCategory(data?.category); 
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        getProducts();
    }, [params.slug]);

    return (
        <main className="container">
            <div className="categoryProduct text-center mt-5"> 
                <h3 className="category-title">Category - {category?.name}</h3>
                <h4>{products?.length} results found</h4>
            </div> 
            <div className="row mt-5 mb-5 gap-3 justify-content-center">
                {products.length > 0 ? (
                    products.map((product) => (
                      <div
                        key={product._id}
                        className="card product-card"
                        style={{ width: "18rem" }}
                      >
                        <Link to={`/product/${product.slug}`} className="product_Link">
                          <img
                            src={`${API_URL}/api/product/product-photo/${product._id}`}
                            className="card-img-top product-img"
                            alt={product.name}
                          />
                          <div className="card-body">
                            <h5 className="card-title mt-3">{product.name}</h5>
                            <p className="card-text">
                              {product.description.substring(0, 30)}...
                            </p>
                            <p className="card-text"><strong>Price: </strong>${product.price}</p>
                            <Link
                              to={`/product/${product.slug}`}
                              className="btn btn-primary"
                            >
                              View Product
                            </Link>
                          </div>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <h3>No Products Found</h3>
                  )
                }
            </div>  
        </main>
    );
}

export default CategoryProduct;
