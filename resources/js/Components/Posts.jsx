import React, { Component } from "react";
import { Col, Row, Card, Input, Button, Upload } from "antd";
import APostForm from "./AddPostForm";
import axios from "axios";
const { Meta } = Card;
const { TextArea } = Input;

class Posts extends Component {
    state = {
        post: [],
        description: "",
        image_path: ""
    };

    componentDidMount() {
        axios.get("/api/posts").then(res => {
            const postd = res.data;
            this.setState({ post: postd });
            console.log(this.state.post);
        });
    }

    handlePost = () => {
        var arr = {
            description: this.state.description,
            image_path: this.state.image_path
        };
        axios.post("/api/posts", arr).then(res => {
            const postdata = res.data;
            console.log(postdata);
        });
    };

    handleUpload = event => {
        if (event.file.status !== "uploading") {
            console.log(event.file);
            this.setState({ image_path: event.file.response.url });
        }
    };

    handleChange = event => {
        this.setState({ description: event.target.value });
        console.log(event.target.value);
    };

    render() {
        return (
            <div>
                {/* <Row> */}
                <Col span={16} offset={6}>
                    {/* <APostForm/> */}

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
                            onChange={this.handleChange}
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
                            <Upload
                                action="/api/attachment/posts"
                                onChange={this.handleUpload}
                                name="image"
                            >
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
                            {/* <Card
                                hoverable={true}
                                bordered={false}
                                cover={<img alt="postimage" src={image1} />}
                                extra={
                                    <Button
                                        type="danger"
                                        size={"large"}
                                        icon="delete"
                                    />
                                }
                            >
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Veniam quia neque perferendis
                                earum. Sunt voluptatem blanditiis officia! Odio
                                dignissimos, vitae unde animi maxime, eius
                                suscipit quis distinctio iure accusamus ab?
                                <Meta description="2/8/2019 7:09Pm" />
                            </Card> */}

                            {this.state.post.map(element => (
                                <Card
                                    hoverable={true}
                                    bordered={false}
                                    type="inner"
                                    cover={
                                        <img
                                            alt="postimage"
                                            src={element.image_path}
                                        />
                                    }
                                    extra={
                                        <Button
                                            type="danger"
                                            size={"large"}
                                            icon="delete"
                                        />
                                    }
                                >
                                    {element.description}
                                    <Meta description={element.created_at} />
                                </Card>
                            ))}
                        </div>
                    </Card>
                </Col>
                {/* </Row> */}
            </div>
        );
    }
}

export default Posts;
