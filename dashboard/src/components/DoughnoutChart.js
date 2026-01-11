import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./master-responsive.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart({ data }) {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: window.innerWidth <= 768 ? 'bottom' : 'right',
        labels: {
          boxWidth: 12,
          padding: window.innerWidth <= 768 ? 10 : 15,
          font: {
            size: window.innerWidth <= 768 ? 10 : 12,
          },
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += '₹' + context.parsed.toFixed(2);
            }
            return label;
          }
        }
      }
    },
  };

  return (
    <div className="chart-container">
      <Doughnut data={data} options={options} />
    </div>
  );
}