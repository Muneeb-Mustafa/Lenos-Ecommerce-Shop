import React from "react";
import useCategory from "../../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const { categories } = useCategory();
  return (
    <main className="container d-flex justify-content-center align-items-center text-center mt-3">
      <div className="row"> 
        {categories?.map((category) => (
          <div className="col-md-6" key={category._id}>
            <div className="d-flex align-items-center justify-content-between">
              <Link to={`/category/${category.slug}`}><button className="btn btn-secondary m-4">{category.name}</button></Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Categories;
