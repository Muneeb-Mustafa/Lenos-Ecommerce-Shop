import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { API_URL } from "../../config";
import { toast } from "react-toastify";
import { message } from "antd";

const initialState = { cardName: "", cardNumber: "", expiration: "", cvv: "" };
const Cart = () => {
  const navigate = useNavigate();
  const { cart, setCart } = useCart();
  const { auth, setAuth } = useAuth();
  
  const [input, setInput] = useState(initialState); 
  // const [ loading, setLoading ] = useState(false);

  const handleChange = (e) =>
    setInput((s) => ({ ...s, [e.target.name]: e.target.value }));

  // Remove Cart Item
  const removeCartItem = (id) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === id);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      message.success("Product removed from cart successfully");
    } catch (error) {
      console.log(error);
    }
  };

  // totalPrice
  const totalPrice = () => {
    let total = 0;
    cart?.forEach((item) => {
      total += item.price * item.length;
    });
    return total;
  };

  // Handle Checkout
  const validateCheckoutForm = () => {
    const { cardName, cardNumber, expiration, cvv } = input;
  
    // Validate cardName: should not be empty and only contain letters
    if (!/^[a-zA-Z\s]+$/.test(cardName)) {
      toast.error("Invalid cardholder name. Only letters and spaces are allowed.");
      return false;
    }
  
    // Validate cardNumber: must be 13-19 digits
    if (!/^\d{13,19}$/.test(cardNumber.replace(/\s/g, ''))) {
      toast.error("Invalid card number. It must be 13-19 digits.");
      return false;
    }
  
    // Validate expiration: must be in MM/YYYY format and not in the past
    const [month, year] = expiration.split('/');
    const currentDate = new Date();
    const expirationDate = new Date(`${year}-${month}-01`);
  
    if (!/^(0[1-9]|1[0-2])\/\d{4}$/.test(expiration)) {
      toast.error("Invalid expiration date. Use MM/YYYY format.");
      return false;
    }
  
    if (expirationDate <= currentDate) {
      toast.error("The expiration date is in the past.");
      return false;
    }
  
    // Validate CVV: must be 3 digits (for Visa/MasterCard) or 4 digits (for American Express)
    if (!/^\d{3,4}$/.test(cvv)) {
      toast.error("Invalid CVV. It must be 3 or 4 digits.");
      return false;
    }
  
    return true;
  };
  
  const handleCheckout = async (e) => {
    e.preventDefault();
  
    // Perform validation before proceeding
    if (!validateCheckoutForm()) return;
    try {
      const storedData = localStorage.getItem("auth");
      const parsedData = storedData ? JSON.parse(storedData) : null;

      if (!parsedData || !parsedData.token) {
        toast.error("Pleas login first to place order.");
        return;
      }

      const token = parsedData.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        `${API_URL}/api/product/checkout/`,
        input,
        config
      );
      if (response.data.success) {  
        localStorage.setItem("checkout", JSON.stringify({ token }));
  
        navigate("/dashboard/users/orders");
        toast.success("Your order has been placed successfully.");
        setInput(initialState); // Reset the input state after success
      } else {
        toast.error(response.data.msg || "Checkout failed. Please try again."); // Display any error message from the server
      }
    } catch (error) {
      console.error(error);
      toast.error("Checkout failed. Please try again.");
    }
  };
  

  return (
    <main>
      <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100 carts">
            <div className="col">
              <div className="card">
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-lg-7 g-3">
                      <h5 className="mb-3">
                        <Link to="/" className="text-body ">
                          <FaLongArrowAltLeft className="me-2" />
                          Continue shopping
                        </Link>
                      </h5>
                      <hr />

                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          <p className="mb-1">Shopping cart</p>
                          <p className="mb-0">
                            {cart?.length >= 1
                              ? `You have ${cart.length} items in your cart`
                              : "Your cart is empty"}
                          </p>
                        </div> 
                      </div>

                      {cart?.length >= 1
                        ? cart.map((item, index) => (
                            <div className="card mb-3" key={index}>
                              <div className="card-body">
                                <div className="d-flex justify-content-between">
                                  <div className="d-flex flex-row align-items-center">
                                    <div>
                                      <img
                                        src={`${API_URL}/api/product/product-photo/${item._id}`}
                                        className="card-img-top"
                                        style={{
                                          height: "150px",
                                          width: "200px",
                                        }}
                                        alt={item.name}
                                      />
                                    </div>
                                    <div className="ms-3">
                                      <h5>{item.name}</h5>
                                      <p className="small mb-0">
                                        {item.description.substring(0, 50)}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="d-flex flex-row align-items-center">
                                    <div style={{ width: "50px" }}>
                                      <h5 className="fw-normal mb-0">
                                        {item.length}
                                      </h5>
                                    </div>
                                    <div style={{ width: "80px" }}>
                                      <h5 className="mb-0">${item.price}</h5>
                                    </div>
                                    <div style={{ width: "80px" }}>
                                      <button
                                        className="btn btn-danger" 
                                        style={{backgroundColor: '#ae845f', border: 'none'}}
                                        onClick={() => removeCartItem(item._id)}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                    <a href="#!" style={{ color: "#cecece" }}>
                                      <i className="fas fa-trash-alt"></i>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        : null}
                    </div>
                    <div className="col-lg-5 g-3">
                      <div className="card bg-primary text-dark rounded-3">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="mb-0">Card details</h5>
                            <img
                              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                              className="img-fluid rounded-3"
                              style={{ width: "45px" }}
                              alt="Avatar"
                            />
                          </div>

                          <form className="mt-4" onSubmit={handleCheckout}>
                            <div
                              data-mdb-input-init
                              className="form-outline form-white mb-4"
                            >
                              <label className="form-label" htmlFor="typeName">
                                Cardholder's Name
                              </label>
                              <input
                                type="text"
                                name="cardName"
                                value={input.cardName}
                                id="typeName"
                                className="form-control form-control-lg"
                                size="17"
                                placeholder="Cardholder's Name"
                                onChange={handleChange}
                                required
                              />
                            </div>

                            <div
                              data-mdb-input-init
                              className="form-outline form-white mb-4"
                            >
                              <label className="form-label" htmlFor="typeText">
                                Card Number
                              </label>
                              <input
                                type="text"
                                id="typeText"
                                className="form-control form-control-lg"
                                name="cardNumber"
                                value={input.cardNumber}
                                size="17"
                                placeholder="1234 5678 9012 3457"
                                maxLength="19"
                                onChange={handleChange}
                                required
                              />
                            </div>

                            <div className="row mb-4 " >
                              <div className="col-md-6 g-2" >
                                <div
                                  data-mdb-input-init
                                  className="form-outline form-white"
                                >
                                  <label
                                    className="form-label"
                                    htmlFor="typeExp"
                                  >
                                    Expiration
                                  </label>
                                  <input
                                    type="text"
                                    id="typeExp"
                                    className="form-control form-control-lg"
                                    placeholder="MM/YYYY"
                                    name="expiration"
                                    value={input.expiration}
                                    maxLength="7"
                                    onChange={handleChange}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="col-md-6 g-2" >
                                <div
                                  data-mdb-input-init
                                  className="form-outline form-white"
                                >
                                  <label
                                    className="form-label"
                                    htmlFor="typeText"
                                  >
                                    CVV
                                  </label>
                                  <input
                                    type="text"
                                    id="typeText"
                                    className="form-control form-control-lg"
                                    placeholder="&#9679;&#9679;&#9679;"
                                    name="cvv"
                                    value={input.cvv}
                                    maxLength="3"
                                    onChange={handleChange}
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                            <button className="btn2" type="submit" disabled={cart.length===0}>
                              Checkout
                            </button>
                          </form>

                          <div className="d-flex justify-content-between mt-2 mb-4">
                            <p className="mb-2 fs-5 mt-2"><b>Total (Incl. taxes)</b></p>
                            <p className="mb-2 fs-2">${totalPrice()}</p>
                          </div>
                        </div>
                      </div>
                    </div> 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Cart;
