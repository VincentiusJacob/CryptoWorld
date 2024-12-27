import React from "react";
import { Line } from "react-chartjs-2";
import "./LineChart.css";
import { Typography } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

export default function LineChart(props) {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < props.coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(props.coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < props.coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(
      new Date(
        props.coinHistory?.data?.history[i].timestamp * 1000
      ).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamp.reverse(),
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice.reverse(),
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  return (
    <>
      <div className="chartHeader">
        <Typography.Title level={3}>
          {" "}
          {props.coinName} Price Chart{" "}
        </Typography.Title>
        <div className="header-price">
          <Typography.Text level={5}>
            {" "}
            Changes: {props.coinHistory?.data?.change}%
          </Typography.Text>
          <Typography.Text level={5}>
            {" "}
            Current {props.coinName} price : {props.currentPrice}{" "}
          </Typography.Text>
        </div>
      </div>
      <Line data={data} options={options} />
    </>
  );
}
