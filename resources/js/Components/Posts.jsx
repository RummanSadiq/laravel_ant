import React, { Component } from "react";
import { Col, Row, Card, Input, Button, Upload } from "antd";
import image1 from "../Images/img1.jpg";
const { TextArea } = Input;
const { Meta } = Card;
class Posts extends Component {
  state = {
    post: [{ description: "", image: "" }]
  };
  render() {
    return (
      <div>
        {/* <Row> */}
          <Col span={16} offset={6}>
            <Card
              title={<h1> Create posts for annoucements </h1>}
              type="inner"
              hoverable="true"
              bordered={false}
              style={{ width: 1000 }}
              headStyle={{ textAlign: "center" }}
            >
              <TextArea
                placeholder="Write Something"
                autosize={{ minRows: 2, maxRows: 6 }}
              />
              <div
                style={{
                  marginLeft: "60%",
                  display: "inline block",
                  paddingTop: "1%",
                  textAlign: "right"
                }}
              >
                <span style={{ padding: "1%" }} />
                <Upload>
                  <Button
                    type="secondary"
                    shape="round"
                    icon="upload"
                    size={"medium"}
                  >
                    Upload photos
                  </Button>
                </Upload>
                <Button
                  type="primary"
                  shape="round"
                  icon="check"
                  size={"medium"}
                >
                  Done
                </Button>
              </div>
            </Card>
            <Card
              title={<h3> Previous Posts </h3>}
              type="inner"
              hoverable="true"
              bordered={false}
              style={{ width: 1000 }}
              headStyle={{ textAlign: "center" }}
            >
              <div style={{ paddingTop: "3%" }}>
                <Card
                  hoverable={true}
                  bordered={false}
                  cover={<img alt="postimage" src={image1} />}
                  extra={<Button type="danger" size={"large"} icon="delete" />}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Veniam quia neque perferendis earum. Sunt voluptatem
                  blanditiis officia! Odio dignissimos, vitae unde animi maxime,
                  eius suscipit quis distinctio iure accusamus ab?
                  <Meta
                    description="2/8/2019 7:09Pm"
                  />
                </Card>
              </div>
            </Card>
          </Col>
        {/* </Row> */}
      </div>
    );
  }
}

export default Posts;
