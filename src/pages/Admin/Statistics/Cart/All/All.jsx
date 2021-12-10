import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { Divider, Typography, Select, Space, DatePicker } from "antd";
import { statisticApi } from "../../../../../api/statisticApi";

export default function All() {
  const [cart, setCart] = useState([]);
  const { Option } = Select;
  const { RangePicker } = DatePicker;

  const data = {
    labels: [
      "Huỷ",
      "Đợi xác nhận",
      "Đang gói hàng",
      "Đang vận chuyển",
      "Giao hàng thành công",
    ],
    datasets: [
      {
        label: "Đơn hàng",
        data: cart,
        fill: true,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "#2a5298",
          "#8DC26F",
        ],
      },
    ],
  };

  useEffect(async () => {
    await statisticApi.cart().then((res) => {
      setCart(res);
    });
  }, []);
  return (
    <div style={{ padding: "2rem" }}>
      <Typography.Title>Tổng quan tất cả đơn hàng</Typography.Title>
      <Bar data={data} />
      <Divider />
    </div>
  );
}
