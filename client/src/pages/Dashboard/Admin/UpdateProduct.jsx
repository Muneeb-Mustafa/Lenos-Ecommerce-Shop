import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { Select, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../../config";

const { Option } = Select;
const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/product/single-product/${params.slug}`
      );
      setId(data.product._id);
      setName(data.product.name);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
  }, []);

  // Get All Categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/category/get-category/`
      );
      if (!data) return toast.error("Error in fetching categories");
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  // Update the Product

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const storedData = localStorage.getItem("auth");
      const parsedData = storedData ? JSON.parse(storedData) : null;

      if (!parsedData || !parsedData.token) {
        throw new Error("User is not authenticated.");
      }

      const token = parsedData.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.append("category", category._id);
      formData?.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("shipping", shipping);
      photo && formData.append("photo", photo); 

      const { data } = await axios.put(
        `${API_URL}/api/product/update-product/${id}`,
        formData,
        config
      );

      message.success("Product updated successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      const errorMsg =
      error.response?.data?.error || "Error in updating product";
      console.error("Error in updating product:", errorMsg);
      message.error(errorMsg);
    }
  };
  
  // Delete the Product
  const handleDelete = async()=>{
    try {
      const {data} = await axios.delete(`${API_URL}/api/product/delete-product/${id}`);
      message.success("Product deleted successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error)      
    }
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - Update Product</title>
        <meta
          name="Admin Dashboard"
          content="Discover the best deals on electronics, fashion, and home goods. Shop top-quality products at unbeatable prices. Fast shipping and great customer service."
        />
        <meta
          name="keywords"
          content="eCommerce, online shopping, best deals, electronics, fashion, home goods, discount store, free shipping"
        />
      </Helmet>
      <main className="text-center">
        <h1>Update Product</h1>
        <div className="m-1 container">
          <Select
            variant={false}
            placeholder="Select a category"
            size="large"
            // showSearch
            className="form-select mb-3"
            onChange={(value) => {
              setCategory(value);
            }}
            value={category?.name}
          >
            {categories.map((item) => (
              <Option key={item._id} value={item._id}>
                {item.name}
              </Option>
            ))}
          </Select>
          <div className="mb-4">
            <label className="btn btn-outline-info text-light bg-info">
              {photo ? photo.name : "Upload Photo"}
              <input
                type="file"
                name=""
                accept="images/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                hidden
              />
            </label>
          </div>
          <div className="mb-3">
            {photo ? (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product_photo"
                  style={{ width: "30%", height: "250px" }}
                  className="img img-responsive"
                />
              </div>
            ) : (
              id && (
                <div className="text-center">
                  <img
                    src={`${API_URL}/api/product/product-photo/${id}`}  
                    alt="product_photo"
                    style={{ width: "30%", height: "250px" }}
                    className="img img-responsive"
                  />
                </div>
              )
            )}
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              placeholder="Write a name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <textarea
              rows={3}
              type="text"
              value={description}
              placeholder="Write a description"
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              value={price}
              placeholder="Write a price"
              className="form-control"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              value={quantity}
              placeholder="Write a quantity"
              className="form-control"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <select
              className="form-select cursor-pointer"
              aria-label="Default select example"
              onChange={(e) => setShipping(e.target.value)}
              value={shipping ? "Yes" : "No"}
            >
              <option value="" disabled selected>
                Select Shipping
              </option>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
          <div className="mb-3">
            <button
              type="submit"
              className="btn btn-info text-light"
              onClick={handleCreate}
            >
              Update Product
            </button>
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-danger text-light"
              onClick={handleDelete}
            >
              Delete Product
            </button>
          </div>
          </div>
      </main>
    </>
  );
};

export default UpdateProduct;
