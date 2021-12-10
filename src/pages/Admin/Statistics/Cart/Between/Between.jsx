import { Col, Row } from "antd";
import React from "react";
import PresentMonth from "./PresentMonth";
import PreviousMonth from "./PreviousMonth";

export default function Between() {
  return (
    <Row>
      <Col span={12}>
        <PreviousMonth />
      </Col>
      <Col span={12}>
        <PresentMonth />
      </Col>
    </Row>
  );
}
