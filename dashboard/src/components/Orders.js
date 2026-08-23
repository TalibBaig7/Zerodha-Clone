import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { api } from "../config";
import { Delete } from "@mui/icons-material";
import "./master-responsive.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  const fetchOrders = useCallback(() => {
    setStatus("loading");
    api
      .get("/allOrders")
      .then((res) => {
        setOrders(res.data);
        setStatus("ready");
      })
      .catch((err) => {
        console.error("Failed to load orders:", err);
        setStatus("error");
      });
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleDeleteOrder = (index) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setOrders((prevOrders) => prevOrders.filter((_, i) => i !== index));
    }
  };

  if (status === "loading") {
    return (
      <div className="orders">
        <h3 className="title">Loading orders...</h3>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="orders">
        <div className="title" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <span>Couldn't load orders. The server may be waking up from sleep.</span>
          <button
            onClick={fetchOrders}
            className="btn btn-blue"
            style={{ alignSelf: "flex-start" }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
