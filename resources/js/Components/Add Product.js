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
    children.push(
        <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
}
const props = {
    action: "//jsonplaceholder.typicode.com/posts/",
    listType: "picture",
    defaultFileList: [...fileList]
};

// function handleChange(value) {
//     console.log(`selected ${value}`);
//     // this.setState({addproduct.category:value});
// }

// function handletagsChange(value) {
//     console.log(`selected ${value}`);
// }

class AddProduct extends Component {
    state = {
//    product:[
//       product_name='',
//       product_description='',
//       pictures='',
//       category='',
//    ]
     

    };

    handleChangeCategory(value) {
      console.log(`selected ${value}`);
      this.setState({});
  }

    render() {
        return (
            <Col span={12} offset={6}>
                <Card
                    title={
                        <h1 style={{ textAlign: "center" }}>Add a Product</h1>
                    }
                >
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
                            placeholder="Select Category"
                            style={{ width: 320 }}
                            // onChange={handleChangeCategory}
                        >
                            <option value="Women's Fashion">
                                Women's Fashion
                            </option>
                            <option key="1" value="Men's Fashion">
                                Men's Fashion
                            </option>
                            <option key="2" value="Electronics and Devices">
                                Electronics and Devices
                            </option>
                            <option key="3" value="Electronic Accessories">
                                Electronic Accessories
                            </option>
                            <option key="4" value="TV and Home Applicances">
                                TV and Home Applicances
                            </option>
                            <option key="5" value="Health and Beauty">
                                Health and Beauty
                            </option>
                            <option key="6" value="Babies and Toys">
                                Babies and Toys
                            </option>
                            <option key="7" value="Grocery and Pets">
                                Grocery and Pets
                            </option>
                            <option key="8" value="Home and Lifestyle">
                                Home and Lifestyle
                            </option>
                            <option key="9" value="Watches and Accessories">
                                Watches and Accessories
                            </option>
                            <option key="10" value="Automotive and Motorbike">
                                Automotive and Motorbike
                            </option>
                            <option key="12" value="Sports">
                                Sports
                            </option>
                        </Select>
                    </div>

                    <div>
                        <h2>Add tags</h2>
                        <Select
                            mode="multiple"
                            style={{ width: "100%" }}
                            placeholder="Please select"
                            defaultValue={["a10", "c12"]}
                            // onChange={handletagsChange}
                        >
                            {children}
                        </Select>
                    </div>

                    <div style={{ marginLeft: "90%", marginTop: "2%" }}>
                        <Button type={"primary"} size={"large"} icon={"check"}>
                            Done
                        </Button>
                    </div>
                </Card>
            </Col>
        );
    }
}

export default AddProduct;
