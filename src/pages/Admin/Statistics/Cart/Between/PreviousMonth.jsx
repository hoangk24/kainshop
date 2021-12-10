import { Typography, Select } from "antd";
import React, { useEffect, useState } from "react";
import moment, { max } from "moment";
import Chart from "chart.js/auto";

import { statisticApi } from "../../../../../api/statisticApi";
import { Line } from "react-chartjs-2";
export default function PreviousMonth() {
  const [cart, setCart] = useState([]);
  const currentMonth = parseInt(
    moment(Date.now()).subtract(1, "month").format("M")
  );
  const [total, setTotal] = useState(0);

  const [month, setMonth] = useState(currentMonth);
  const { Option } = Select;
  const monthString = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [maxY, setMaxY] = useState(50);
  const renderMonth = monthString.map((item) => (
    <Option key={item} value={item}>
      Tháng {item}
    </Option>
  ));
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

  const option = {
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: maxY,
      },
    },
  };

  const handleChangeMonth = (value) => {
    setMonth(value);
  };

  useEffect(async () => {
    await statisticApi.cartBetween({ month: month }).then((res) => {
      setCart(res.data);
      setTotal(res.total);
    });
  }, [month]);
  return (
    <div>
      <Typography.Title>Tháng {month}</Typography.Title>
      <Select
        defaultValue={month}
        onChange={handleChangeMonth}
        style={{ width: 200 }}
      >
        {renderMonth}
      </Select>
      <Select
        defaultValue={maxY}
        style={{ width: 150 }}
        onChange={(value) => setMaxY(value)}
      >
        <Option value={10}>10</Option>
        <Option value={50}>50</Option>
        <Option value={100}>100</Option>
        <Option value={300}>300</Option>
      </Select>
      <Line data={data} options={option} />
      <Typography.Title level={3} style={{ textAlign: "center" }}>
        Tổng doanh thu: {total.toLocaleString("vi-Vn")}VNĐ
      </Typography.Title>
    </div>
  );
}
