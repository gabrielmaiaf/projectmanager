import { Avatar, Col, Row, Typography } from "antd";

import logo from "../assets/beaver 1.png";

export default function Header() {
  return (
    <>
      <Row>
        <Col offset={1}>
          <Avatar src={logo} />
        </Col>
      </Row>
      <Row align="bottom">
        <Col offset={1}>
          <Typography.Title level={5} className="title">
            My projects
          </Typography.Title>
        </Col>
      </Row>
    </>
  );
}
