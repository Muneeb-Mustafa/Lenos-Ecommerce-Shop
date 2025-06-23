import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import axios from "axios";
import { message } from "antd";
import { Modal } from "antd";
import CategoryForm from "../../../components/Forms/CategoryForm";
import { API_URL } from "../../../config";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpatedName] = useState("");

  // Create Categories
  const handleSubmit = async (input, resetForm) => {
    try {
      const storedData = localStorage.getItem("auth");
      const parsedData = storedData ? JSON.parse(storedData) : null;

      if (!parsedData || !parsedData.token) {
        throw message.error("User is not authenticated.");
      }

      const token = parsedData.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/category/create-category/`,
        { name: input.name },
        config
      );
      if (data) {
        message.success("Category created successfully");
        resetForm(); // Reset the form
        getAllCategories(); // Refresh categories
      }
    } catch (error) {
      console.log("Error:", error); // Log error for debugging
      toast.error(
        error.response?.data?.message || "Error in creating category"
      );
    }
  };

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

  // handleUpdate Category
  const handleUpdate = async (input) => {
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
        },
      };
      const { data } = await axios.put(
        `${API_URL}/api/category/update-category/${selected}`,
        { name: input.name },
        config
      );
      if (data) {
        message.success("Category updated successfully");
        setVisible(false);
        getAllCategories(); // Refresh categories
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error(error.response?.data?.message || "Error in updating category");
    }
  };

  // handleDelete Category
  const handleDelete = async (id) => {
    try {
      const storedData = localStorage.getItem("auth");
      const parsedData = storedData ? JSON.parse(storedData) : null;
      if (!parsedData || !parsedData.token) {
        message.error("User is not authenticated.");
      }
      const token = parsedData.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(
        `${API_URL}/api/category/delete-category/${id}`,
        config
      );
      if (data) {
        message.success("Category deleted successfully"); 
        getAllCategories(); 
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error(error.response?.data?.message || "Error in deleting category");
    }
  };

  return (
    <>
      <Helmet>
        <title>Dashboard-Create Category</title>
        <meta
          name="Admin Dashboard"
          content="Discover the best deals on electronics, fashion, and home goods."
        />
        <meta
          name="keywords"
          content="eCommerce, online shopping, best deals, electronics, fashion, home goods"
        />
      </Helmet>
      <div className="container text-center">
        <h3 className="mb-3">Create Category</h3>
        <CategoryForm
          handleSubmit={handleSubmit}
          value={name}
          setValue={setName}
        />
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{category.name}</td>
                <td>
                  <button
                    className="btn btn-info text-light"
                    style={{ marginRight: "10px" }}
                    onClick={() => {
                      setVisible(true);
                      setSelected(category._id), setUpatedName(category.name);
                    }}
                  >
                    Edit
                  </button>
                  <button className="btn btn-danger text-light" onClick={()=> {
                    handleDelete(category._id)
                  }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
        <CategoryForm
          handleSubmit={handleUpdate}
          value={updatedName}
          setValue={setUpatedName}
        />
      </Modal>
    </>
  );
};

export default CreateCategory;
