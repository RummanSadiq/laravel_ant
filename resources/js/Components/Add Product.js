import React, { Component } from "react";
import { Col, Input, Button, Upload, Card, Icon, Select } from "antd";

const { TextArea } = Input;
const Option = Select.Option;

const fileList = [
  {
    uid: "-1",
    name: "xxx.png",
    status: "done",
    url:
      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    thumbUrl:
      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
  },
  {
    uid: "-2",
    name: "yyy.png",
    status: "done",
    url:
      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    thumbUrl:
      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
  }
];
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
const props = {
  action: "//jsonplaceholder.typicode.com/posts/",
  listType: "picture",
  defaultFileList: [...fileList]
};

function handleChange(value) {
  console.log(`selected ${value}`);
}

function handletagsChange(value) {
  console.log(`selected ${value}`);
}

class AddProduct extends Component {
  state = {};

  render() {
    return (
      <Col span={12} offset={6}>
        <Card title={<h1 style={{ textAlign: "center" }}>Add a Product</h1>} >
          <Input placeholder="Enter Product title/name" />
          <div style={{ marginTop: "2%" }} />
          <TextArea
            placeholder="Write compple product Description"
            autosize={{ minRows: 3, maxRows: 6 }}
          />
          <div style={{ margin: "2%" }}>
            <h3>Upload Pictures</h3>
          </div>

          <Upload {...props}>
            <Button>
              <Icon type="upload" /> Upload
            </Button>
          </Upload>

          <div>
            {" "}
            <h2>Select category</h2>
            <Select
              defaultValue="lucy"
              style={{ width: 320 }}
              onChange={handleChange}
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </div>

          <div>
            <h2>Add tags</h2>
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Please select"
              defaultValue={["a10", "c12"]}
              onChange={handletagsChange}
            >
              {children}
            </Select>
          </div>

          <div style={{marginLeft:'90%', marginTop:'2%'}}>
          <Button type={'primary'} size={"large"} icon={"check"}>Done</Button>
          </div>
        </Card>
      </Col>
    );
  }
}

export default AddProduct;
