import React, { Component } from "react";
import { Card, Form, Input, Button, Upload } from "antd";
const { TextArea } = Input;

class AddPostForm extends Component {
    state = {};

    handleSubmit = e => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
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
        const descriptionError =
            isFieldTouched("description") && getFieldError("description");
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
                            onClick={this.handlePost}
                        >
                            Done
                        </Button>
                    </div>
                </Form>
            </Card>
        );
    }
}
const APostForm = Form.create({ name: "Shop_Form" })(AddPostForm);

export default APostForm;
