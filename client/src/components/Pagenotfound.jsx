import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Pagenotfound = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Ecommerce Shop</title>
        <meta
          name="description"
          content="Oops! The page you are looking for does not exist. Return to our homepage to explore amazing deals on electronics, fashion, and home goods."
        />
        <meta
          name="keywords"
          content="404, page not found, error, ecommerce, online shopping, deals, electronics, fashion, home goods"
        />
      </Helmet>
      <main className="pnf">
        <h1 className="pnf-title">404</h1>
        <h2>Oops! Page Not found</h2>
        <Link to="/">
          <button className="btn btn-info text-light">Go Back</button>
        </Link>
      </main>
    </>
  );
};

export default Pagenotfound;
