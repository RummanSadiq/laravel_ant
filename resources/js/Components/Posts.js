import React, { Component } from "react";
import { Col, Card, Input, Button, message, Upload } from "antd";
import axios from "axios";
import APostForm from './AddPostForm';
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
            this.setState({ description: "", image_path: "" });
            this.getPosts();
            message.success("Post Added");
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
       
        return (
            <div>
                <Col span={16} offset={6}>

                    <APostForm/>
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
