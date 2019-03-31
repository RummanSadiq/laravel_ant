import React, { Component } from "react";
import { Card, Form, Input, Button, Upload, message } from "antd";
import axios from "axios";
const { TextArea } = Input;

class AddPostForm extends Component {
    state = {};

    handleSubmit = e => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);

                axios.post("/api/posts", values).then(res => {
                    const postdata = res.data;
                    console.log(postdata);
                    this.getPosts();
                    message.success("Post Added");
                });
                this.props.form.resetFields();
            } else {
                message.error("Error occured", err);
            }
        });
    };

    handleUpload = event => {
        if (event.file.status !== "uploading") {
            console.log('Uploading file is',event.file);
            this.setState({ image: event.file.response.url });
        }
    };
    render() {
        const {
            getFieldDecorator,
            getFieldsError,
            getFieldError,
            isFieldTouched
        } = this.props.form;

        // Only show error after a field is touched.
        const descriptionError =
            isFieldTouched("description") && getFieldError("description");

        const pictureError =
            isFieldTouched("display_picture") &&
            getFieldError("display_picture");
        return (
            <Card
                title={<h1> Create posts for annoucements </h1>}
                type="inner"
                hoverable="true"
                bordered={false}
                style={{ width: 1000 }}
                headStyle={{ textAlign: "center" }}
            >
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item
                        validateStatus={descriptionError ? "error" : ""}
                        help={descriptionError || ""}
                    >
                        {getFieldDecorator("description", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input your username!"
                                }
                            ]
                        })(
                            <TextArea
                                placeholder="Write Something"
                                autosize={{ minRows: 2, maxRows: 6 }}
                                onChange={this.handleChange}
                            />
                        )}
                    </Form.Item>

                    <div
                        style={{
                            marginLeft: "60%",
                            display: "inline block",
                            paddingTop: "1%",
                            textAlign: "right"
                        }}
                    >
                        <Form.Item
                        validateStatus={pictureError ? "error" : ""}
                        help={pictureError || ""}
                    >
                        {getFieldDecorator("display_picture", {
                           

                            rules: [
                                {
                                    required: true,
                                    message: "Please input your Store picture"
                                }
                            ]
                        })(
                            <Upload
                                action="/api/attachment/products"
                                onChange={this.handleUpload}
                                listType="picture"
                                name="image"
                            >
                                <Button icon="upload">Upload Picture</Button>
                            </Upload>
                        )}
                    </Form.Item>
                        
                        </div>
                        <Button
                            type="primary"
                            shape="round"
                            icon="check"
                            size={"medium"}
                            htmlType="submit"
                            onClick={this.handleSubmit}
                        >
                            Post
                        </Button>
                    
                </Form>
            </Card>
        );
    }
}
const APostForm = Form.create({ name: "Shop_Form" })(AddPostForm);

export default APostForm;
