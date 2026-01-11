import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../config";
import { VerticalGraph } from "./VerticalGraph";
import { Delete } from "@mui/icons-material";
import "./master-responsive.css";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/allHoldings`).then((res) => {
      setAllHoldings(res.data);
    });
  }, []);

  const handleDeleteHolding = (index) => {
    if (window.confirm("Are you sure you want to delete this holding?")) {
      setAllHoldings((prevHoldings) =>
        prevHoldings.filter((_, i) => i !== index)
      );
    }
  };

  const labels = allHoldings.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const isProfit = curValue - stock.avg * stock.qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td className="instrument">{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>₹{stock.avg.toFixed(2)}</td>
                  <td>₹{stock.price.toFixed(2)}</td>
                  <td>₹{curValue.toFixed(2)}</td>
                  <td className={profClass}>
                    ₹{(curValue - stock.avg * stock.qty).toFixed(2)}
                  </td>
                  <td className={profClass}>{stock.net}</td>
                  <td className={dayClass}>{stock.day}</td>
                  <td>
                    <button
                      className="delete-icon-btn"
                      onClick={() => handleDeleteHolding(index)}
                      title="Delete holding"
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

      <div className="row">
        <div className="col">
          <h5>
            29,875.<span>55</span>
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            31,428.<span>95</span>
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 className="profit">1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>

      <div className="chart-wrapper">
        <VerticalGraph data={data} />
      </div>
    </>
  );
};

export default Holdings;
