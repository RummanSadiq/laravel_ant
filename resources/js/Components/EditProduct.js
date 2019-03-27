import React, { Component } from 'react';
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



class EditProduct extends Component {
    state = {
        image_path: ""
    };

    handleUpload = event => {
        if (event.file.status !== "uploading") {
            console.log(event.file);
            this.setState({ image_path: event.file.response.url });
        }
    };

    handleSubmit = e => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.display_picture = this.state.image_path;
                console.log("Received values of form: ", values);

                axios.post("/api/products", values).then(res => {
                    const data = res.data;
                    console.log(data);
                });
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
            isFieldTouched("name") && getFieldError("name");
        const descriptionError =
            isFieldTouched("description") && getFieldError("description");
        const pictureError =
            isFieldTouched("display_picture") &&
            getFieldError("display_picture");
        const categoryError =
            isFieldTouched("category_id") && getFieldError("category_id");
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
                            {getFieldDecorator("name", {
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
                        <Form.Item>
                            <Upload
                                action="/api/attachment/products"
                                onChange={this.handleUpload}
                                name="image"
                            >
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

                            {getFieldDecorator("category_id", {
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
                                    <option value={1}>Women's Fashion</option>
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
const EPForm = Form.create({ name: "Edit_Product_Form" })(EditProduct);

export default EPForm;