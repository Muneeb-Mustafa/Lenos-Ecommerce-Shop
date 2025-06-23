import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config";

const { Option } = Select;
const CreateProduct = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

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
      formData.append("category", category);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("shipping", shipping);
      formData.append("photo", photo);

      const { data } = await axios.post(
        `${API_URL}/api/product/create-product/`,
        formData,
        config
      );

      message.success("Product created successfully");
      navigate('/dashboard/admin/products');
    } catch (error) {
      console.error("Error in creating product:", error.stack);
      res.status(500).send({success: false, error: "Error in creating product"});
  }
  };
  return (
    <>
      <Helmet>
        <title>Dashboard-Create Product</title>
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
        <h1>CreateProduct</h1>
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
            {photo && (
              <div className="center">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product_photo"
                  style={{ width: "30%", height: "200px" }}
                  className="img img-responsive"
                />
              </div>
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
            >
              <option value="" disabled selected>Select Shipping</option>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
          <div className="mb-5">
            <button type="submit" className="btn btn-info text-light" onClick={handleCreate}>
              Create Product
            </button>
        </div>
        </div>
      </main>
    </>
  );
};

export default CreateProduct;
