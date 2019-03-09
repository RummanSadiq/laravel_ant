import React, { Component } from "react";
import {
    Col,
    Input,
    Button,
    Upload,
    Card,
    Icon,
    Select,
    Form,
    Row,
    message
} from "antd";
import axios from "axios";

const { TextArea } = Input;
const Option = Select.Option;

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(
        <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
}

const props = {
    name: "image",
    action: "//jsonplaceholder.typicode.com/posts/",
    headers: {
        authorization: "authorization-text"
    },
    onChange(info) {
        if (info.file.status !== "uploading") {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === "done") {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === "error") {
            message.error(`${info.file.name} file upload failed.`);
        }
    }
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
        product: [
            // (product_name = ""),
            // (product_description = ""),
            // (pictures = ""),
            // (category = "")
        ]
    };

    // handleChangeCategory(value) {
    //     console.log(`selected ${value}`);
    //     this.setState({});
    // }
    render() {
        return <APForm />;
    }
}
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class AddProductForm extends React.Component {
    // componentDidMount() {
    //     // To disabled submit button at the beginning.
    //     this.props.form.validateFields();
    // }

    handleSubmit = e => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                this.props.form.resetFields();
            }
        });
    };

    render() {
        const {
            getFieldDecorator,
            getFieldsError,
            getFieldError,
            isFieldTouched
        } = this.props.form;

        // Only show error after a field is touched.
        const productNameError =
            isFieldTouched("productname") && getFieldError("productname");
        const descriptionError =
            isFieldTouched("description") && getFieldError("description");
        const pictureError =
            isFieldTouched("display_picture") &&
            getFieldError("display_picture");
        const categoryError =
            isFieldTouched("category") && getFieldError("category");
        const tagsError = isFieldTouched("tags") && getFieldError("tags");
        const priceError = isFieldTouched("price") && getFieldError("price");
        return (
            <Col span={12} offset={6}>
                <Card
                    title={
                        <h1 style={{ textAlign: "center" }}>Add a Product</h1>
                    }
                >
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item
                            validateStatus={productNameError ? "error" : ""}
                            help={productNameError || ""}
                        >
                            {getFieldDecorator("productname", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please input your username!"
                                    }
                                ]
                            })(
                                <Input placeholder="Enter Product title/name" />
                            )}
                        </Form.Item>
                        <div style={{ marginTop: "2%" }} />

                        <Form.Item
                            validateStatus={priceError ? "error" : ""}
                            help={descriptionError || ""}
                        >
                            {getFieldDecorator("price", {
                                rules: [
                                    {
                                        required: true,
                                        message:
                                            "Please input your Product Price!"
                                    }
                                ]
                            })(
                                <Row>
                                    <Col span={4}>
                                        {" "}
                                        <Input
                                            size="small"
                                            type="number"
                                            placeholder="price"
                                        />
                                    </Col>
                                </Row>
                            )}
                        </Form.Item>
                        <Form.Item
                            validateStatus={descriptionError ? "error" : ""}
                            help={descriptionError || ""}
                        >
                            {getFieldDecorator("description", {
                                rules: [
                                    {
                                        required: true,
                                        message:
                                            "Please input your Product Description!"
                                    }
                                ]
                            })(
                                <TextArea
                                    placeholder="Write complete product Description"
                                    autosize={{ minRows: 3, maxRows: 6 }}
                                />
                            )}
                        </Form.Item>

                        <div style={{ margin: "2%" }}>
                            <h3>Upload Pictures</h3>
                        </div>
                        <Form.Item
                            validateStatus={pictureError ? "error" : ""}
                            help={pictureError || ""}
                        >
                            {getFieldDecorator("display_picture", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Must Upload Picture"
                                    }
                                ]
                            })(
                                <Upload>
                                    <Button>
                                        <Icon type="upload" /> Upload
                                    </Button>
                                </Upload>
                            )}
                        </Form.Item>

                        <Form.Item
                            validateStatus={categoryError ? "error" : ""}
                            help={categoryError || ""}
                        >
                            <h2>Select category</h2>

                            {getFieldDecorator("category", {
                                rules: [
                                    {
                                        required: true,
                                        message:
                                            "Please input your Product Description!"
                                    }
                                ]
                            })(
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
                                    <option
                                        key="2"
                                        value="Electronics and Devices"
                                    >
                                        Electronics and Devices
                                    </option>
                                    <option
                                        key="3"
                                        value="Electronic Accessories"
                                    >
                                        Electronic Accessories
                                    </option>
                                    <option
                                        key="4"
                                        value="TV and Home Applicances"
                                    >
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
                                    <option
                                        key="9"
                                        value="Watches and Accessories"
                                    >
                                        Watches and Accessories
                                    </option>
                                    <option
                                        key="10"
                                        value="Automotive and Motorbike"
                                    >
                                        Automotive and Motorbike
                                    </option>
                                    <option key="12" value="Sports">
                                        Sports
                                    </option>
                                </Select>
                            )}
                        </Form.Item>
                        <h2>Add tags</h2>

                        <Form.Item
                            validateStatus={tagsError ? "error" : ""}
                            help={tagsError || ""}
                        >
                            {getFieldDecorator("tags", {
                                rules: [
                                    {
                                        required: true,
                                        message:
                                            "Please input your Product Description!"
                                    }
                                ]
                            })(
                                <Select
                                    mode="multiple"
                                    style={{ width: "100%" }}
                                    placeholder="Please select"
                                    defaultValue={["a10", "c12"]}
                                    // onChange={handletagsChange}
                                >
                                    {children}
                                </Select>
                            )}
                        </Form.Item>

                        <Form.Item>
                            {" "}
                            <div style={{ marginLeft: "90%", marginTop: "2%" }}>
                                <Button
                                    type={"primary"}
                                    htmlType="submit"
                                    size={"large"}
                                    icon={"check"}
                                >
                                    Done
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        );
    }
}
const APForm = Form.create({ name: "Add_Product_Form" })(AddProductForm);
export default AddProduct;
