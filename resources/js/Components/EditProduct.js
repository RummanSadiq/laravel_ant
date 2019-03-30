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
import axios from 'axios';

const { TextArea } = Input;
const Option = Select.Option;



class EditProduct extends Component {
    constructor (props){
        super (props);

        this.state.product = this.props.record;
    }
    state = {
        image_path: "",
        categories: [],
        product: {}
    };

    fileList = [{
        uid: '1',
        name: 'current_image.png',
        status: 'done',
        response: 'Done', // custom error message to show
        url: this.state.product.display_picture
    }];

    

    componentDidMount() {
        axios.get("/api/categories").then(res => {
            const data = res.data;
            console.log(data);
            this.setState({ categories: data });
        });

        console.log('state.product received are',this.state.product);
    }

    handleUpload = event => {
        if (event.file.status !== "uploading") {
            console.log(event.file);
            this.setState({ image_path: event.file.response.url });
        }
    };

    handleSubmit = e => {
        e.preventDefault();

        console.log("value of id is" + this.state.product.id);
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (this.state.image_path !== 'undefined'){
                    values.display_picture = this.state.image_path;
                }
                console.log("Received values of form: ", values);

                message.success("DONE");

                axios
                    .post("api/products/" + this.state.product.id, values)
                    .then(res => {
                        const data = res.data;
                        console.log(data);
                        this.props.handleOk();
                    })
                    .catch(res => {
                        console.log(res);
                        console.log(values);
                    });
            }
        });
    };

    render() {
   
    

        console.log("Rumman" + this.state.product.display_picture);

        const param = {
            action: "/api/attachment/products",
            onChange: this.handleUpload,
            listType: "picture",
            name: "image",
            defaultFileList: this.fileList
        };

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
        const priceError = isFieldTouched("price") && getFieldError("price");
        return (
            <Form onSubmit={this.handleSubmit}>
                <div style={{ margin: "0%" }}>
                    <h3>Title:</h3>
                </div>
                <Form.Item
                    validateStatus={productNameError ? "error" : ""}
                    help={productNameError || ""}
                >
                    {getFieldDecorator("name", {
                        initialValue: this.state.product.name,
                        rules: [
                            {
                                required: true,
                                message: "Please input your username!"
                            }
                        ]
                    })(<Input placeholder="Enter Product title/name" />)}
                </Form.Item>
                <div style={{ margin: "0%" }}>
                    <h3>Price:</h3>
                </div>
                <Form.Item
                    validateStatus={priceError ? "error" : ""}
                    help={priceError || ""}
                >
                    {getFieldDecorator("price", {
                        initialValue: this.state.product.price,
                        rules: [
                            {
                                required: true,
                                message: "Please input your Product Price!"
                            }
                        ]
                    })(
                        <Input
                            addonBefore="RS"
                            type="number"
                            style={{ width: "35%" }}
                            placeholder="Price"
                        />
                    )}
                </Form.Item>
                <div style={{ margin: "0%" }}>
                    <h3>Description:</h3>
                </div>
                <Form.Item
                    validateStatus={descriptionError ? "error" : ""}
                    help={descriptionError || ""}
                >
                    {getFieldDecorator("description", {
                        initialValue: this.state.product.description,

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

                <div>
                    <h3>Upload Pictures</h3>
                </div>

                <Form.Item
                    validateStatus={pictureError ? "error" : ""}
                    help={pictureError || ""}
                >
                    {getFieldDecorator("display_picture", {
                        initialValue: this.state.product.display_picture,

                        rules: [
                            {
                                required: true,
                                message: "Must Upload Picture"
                            }
                        ]
                    })(
                        <Upload {...param}
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
                        initialValue: this.state.product.category_id,

                        rules: [
                            {
                                required: true,
                                message: "Please input your Product Category!"
                            }
                        ]
                    })(
                        <Select
                            placeholder="Select Category"
                            style={{ width: 320 }}
                            // onChange={handleChangeCategory}
                        >
                            {this.state.categories.map(element => (
                                <Option value={element.id}>
                                    {element.name}
                                </Option>
                            ))}
                        </Select>
                    )}
                </Form.Item>

                <Form.Item>
                    {" "}
                    <div style={{ marginLeft: "60%", marginTop: "2%" }}>
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
        );
    }
}
const EPForm = Form.create({ name: "Edit_Product_Form" })(EditProduct);

export default EPForm;