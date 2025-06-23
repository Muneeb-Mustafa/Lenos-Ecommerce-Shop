import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Orders = () => {
  const [showOrders, setOrders] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [hasToken, setHasToken] = useState(false); 

  // Load orders from local storage
  const loadOrders = () => {
    try {
      const response = JSON.parse(localStorage.getItem('cart')) || [];
      setOrders(response);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load orders from local storage.");
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem("checkout");
    const parsedData = storedData ? JSON.parse(storedData) : null; 
  
    if (parsedData && parsedData.token) {
      setHasToken(true);
      loadOrders();
    } else {
      setLoading(false);
    }
  }, []);
  

  // Function to delete an order from local storage
  const DeleteOrder = (id) => {
    const updatedOrders = showOrders.filter(order => order._id !== id);
    setOrders(updatedOrders);
    localStorage.setItem('cart', JSON.stringify(updatedOrders));
    toast.success("Product has been deleted");
  };

  return (
    <>  
      {loading ? (
        <p>Loading orders...</p>
      ) : hasToken && showOrders.length > 0 ? (
        <div className="table-responsive mt-3">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Product Name</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {showOrders.map((order, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{order.name}</td>
                  <td>{order.description.substring(0, 20)}</td>
                  <td>{order.price}</td>
                  <td>{order.length}</td>
                  <td><span className="badge bg-info">In Process</span></td>
                  <td>
                    <button className='btn btn-danger' onClick={() => DeleteOrder(order._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : ( 
        <div className="text-center">
        <h1>Orders</h1>
        <p >No order is in progress.</p> 
        </div>
      )}
    </>
  );
};

export default Orders;
