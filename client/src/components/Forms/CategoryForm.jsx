import React, { useEffect, useState } from "react";

const initialState = { name: "" };

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  const [input, setInput] = useState(initialState);

  useEffect(() => {
    setInput({ name: value });
  }, [value]);

  const handleChange = (e) =>
    setInput((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmits = async (e) => {
    e.preventDefault();  
    handleSubmit(input, resetForm); 
  };

  const resetForm = () => {
    setInput(initialState);
  };

  return (
    <>
      <form onSubmit={handleSubmits}>
        <div className="mb-3">
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter Category Name"
          />
        </div>
        <button type="submit" className="btn btn-info text-light">
          Add Category
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
