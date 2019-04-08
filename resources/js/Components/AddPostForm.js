import React, { Component } from "react";
import { Card, Form, Input, Button, Upload, message } from "antd";
import axios from "axios";
const { TextArea } = Input;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class AddPostForm extends Component {
    constructor(props) {
        super(props);
        this.state.posts = this.props.posts;
    }

    state = {
        posts: [],
        description: "",
        image_path: ""
    };

    handlePost = () => {
        var arr = {
            description: this.state.description,
            image_path: this.state.image_path
        };
        axios.post("/api/posts", arr).then(res => {
            const postdata = res.data;
            console.log(postdata);
            this.setState({ description: "", image_path: "" });
            this.props.newPosts();
            message.success("Post Added");
        });
    };

    handleChange = event => {
        this.setState({ description: event.target.value });
        console.log(event.target.value);
    };

    handleSubmit = e => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.handlePost();
                this.props.form.resetFields();
            }
            if (err) {
                message.error(err);
            }
        });
    };

    handleUpload = event => {
        if (event.file.status !== "uploading") {
            console.log("Uploading file is", event.file);
            this.setState({ image_path: event.file.response.url });
            this.setState({ uploadEvent: event });
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
                    <Form.Item>
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
                        <Form.Item>
                            {getFieldDecorator("display_picture", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please input picture"
                                    }
                                ]
                            })(
                                <Upload
                                    action="/api/attachment/posts"
                                    onChange={this.handleUpload}
                                    listType="picture"
                                    name="image"
                                >
                                    <Button icon="upload">
                                        Upload Picture
                                    </Button>
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
                        disabled={hasErrors(getFieldsError())}
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
