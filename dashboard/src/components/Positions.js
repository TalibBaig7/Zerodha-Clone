import React, { useState } from "react";
import { positions } from "../data/data";
import { Delete } from "@mui/icons-material";
import "./master-responsive.css";

const Positions = () => {
  const [allPositions, setAllPositions] = useState(positions);

  const handleDeletePosition = (index) => {
    if (window.confirm("Are you sure you want to delete this position?")) {
      setAllPositions((prevPositions) =>
        prevPositions.filter((_, i) => i !== index)
      );
    }
  };

  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allPositions.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const isProfit = curValue - stock.avg * stock.qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.product}</td>
                  <td className="instrument">{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>₹{stock.avg.toFixed(2)}</td>
                  <td>₹{stock.price.toFixed(2)}</td>
                  <td className={profClass}>
                    ₹{(curValue - stock.avg * stock.qty).toFixed(2)}
                  </td>
                  <td className={dayClass}>{stock.day}</td>
                  <td>
                    <button
                      className="delete-icon-btn"
                      onClick={() => handleDeletePosition(index)}
                      title="Delete position"
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
  );
};

export default Positions;
