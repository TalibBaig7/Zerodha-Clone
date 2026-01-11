import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../config";
import { Delete } from "@mui/icons-material";
import "./master-responsive.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/allOrders`).then((res) => {
      setOrders(res.data);
    });
  }, []);

  const handleDeleteOrder = (index) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setOrders((prevOrders) => prevOrders.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="orders">
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn btn-blue">
            Get started
          </Link>
        </div>
      ) : (
        <>
          <h3 className="title">Orders ({orders.length})</h3>

          <div className="order-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Qty.</th>
                  <th>Price</th>
                  <th>Mode</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((stock, index) => {
                  return (
                    <tr key={index}>
                      <td className="instrument">{stock.name}</td>
                      <td>{stock.qty}</td>
                      <td>₹{stock.price.toFixed(2)}</td>
                      <td className={stock.mode === "BUY" ? "profit" : "loss"}>
                        {stock.mode}
                      </td>
                      <td>
                        <button
                          className="delete-icon-btn"
                          onClick={() => handleDeleteOrder(index)}
                          title="Delete order"
                        >
                          <Delete style={{ fontSize: "18px" }} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;
