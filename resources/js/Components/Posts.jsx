import React, { Component } from "react";
import { Col, Row, Card, Input, Button, Upload } from "antd";
import APostForm from "./AddPostForm";
import { Redirect } from "react-router-dom";
import axios from "axios";
const { Meta } = Card;
const { TextArea } = Input;

class Posts extends Component {
    state = {
        post: [],
        description: "",
        image_path: "",
        redirect: false
    };

    componentDidMount() {
        this.getPosts();
    }

    getPosts() {
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
            this.setState({description:'',image_path:''});
            this.getPosts();
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

    handleDelete(event, id) {
        axios.delete("/api/posts/" + id).then(res => {
            this.getPosts();
        });
    }

    render() {
        // if (this.state.redirect) {
        //     return <Redirect to="/Posts" />;
        // }
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
                            value={this.state.description}
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
                                value={this.state.image_path}
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
                                style={{marginTop:'3%'}}
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
                                            onClick={event =>
                                                this.handleDelete(
                                                    event,
                                                    element.id
                                                )
                                            }
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
            </div>
        );
    }
}

export default Posts;
