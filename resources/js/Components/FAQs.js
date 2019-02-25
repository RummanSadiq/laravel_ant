import React, { Component } from "react";
import { Row, Col, Button, Card, Modal, Input } from "antd";
import axios from "axios";

class Faqs extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.m2handleOk = this.m2handleOk.bind(this);
        this.showModalm2 = this.showModalm2.bind(this);
    }
    state = {
        faqs: [],
        visible: false,
        m2visible: false,
        newquestion: "",
        newanswer: ""
    };

    componentDidMount() {
        axios.get("http://pulsespace.com/api/faqs").then(res => {
            const faqsdata = res.data;
            this.setState({ faqs: faqsdata });
        });
    }

    handleDelete(event, counterId) {
        event.preventDefault();
        const counters = this.state.faqs.filter(c => c.id !== counterId);
        this.setState({ faqs: counters });
    }

    showModal = () => {
        this.setState({
            visible: true
        });
    };
    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false
        });
        let id = this.state.faqs.length - 1;
        var str = {
            store_id: 1,
            question: this.state.newquestion,
            answer: this.state.newanswer
        };

        axios.post("/api/faqs", str).then(res => {
            console.log(res);
            console.log(res.data);
        });

        this.state.faqs.push(str);
        this.setState({ faqs: this.state.faqs });
        e.preventDefault();
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false
        });
    };

    onChangeQuestion = e => {
        this.setState({ newquestion: e.target.value });
    };

    onChangeAnswer = e => {
        this.setState({ newanswer: e.target.value });
    };

    showModalm2(event, element) {
        this.setState({
            m2visible: true,
            newquestion: element.question,
            newanswer: element.answer
        });
    }

    m2handleOk(event, element) {
        console.log(event);
        let faq = this.state.faqs;
        var index = faq.indexOf(element);
        faq[index].question = this.state.newquestion;
        faq[index].answer = this.state.newanswer;
        this.setState({ faqs: faq });
        this.setState({
            m2visible: false
        });
    }

    m2handleCancel = e => {
        console.log(e);
        this.setState({
            m2visible: false
        });
    };

    render() {
        return (
            <div>
                {/* <Row> */}
                <Col span={16} offset={6}>
                    <div style={{ background: "#ECECEC", padding: "30px" }}>
                        <h1 style={{ textAlign: "center" }}>FAQS</h1>
                        <Button
                            type="primary"
                            shape="round"
                            icon="plus"
                            size={"large"}
                            onClick={this.showModal}
                        >
                            Add new Question
                        </Button>
                        <Modal
                            title="Add a new Question"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            // okButtonProps={{ disabled: true }}
                        >
                            <Input
                                placeholder="Question"
                                allowClear
                                onChange={this.onChangeQuestion}
                            />
                            <Input
                                placeholder="Answer"
                                allowClear
                                onChange={this.onChangeAnswer}
                            />
                        </Modal>
                        {this.state.faqs.map(element => (
                            <div style={{ paddingTop: "10px" }}>
                                <Card
                                    title={element.question}
                                    type="inner"
                                    hoverable="true"
                                    bordered={false}
                                    style={{ width: 1200 }}
                                    extra={
                                        <div>
                                            <Button
                                                type="danger"
                                                size={"large"}
                                                icon="edit"
                                                onClick={event =>
                                                    this.showModalm2(
                                                        event,
                                                        element
                                                    )
                                                }
                                            />{" "}
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
                                            />{" "}
                                        </div>
                                    }
                                >
                                    <Modal
                                        title="Edit a Question"
                                        visible={this.state.m2visible}
                                        onOk={event =>
                                            this.m2handleOk(event, element)
                                        }
                                        onCancel={this.m2handleCancel}
                                    >
                                        <Input
                                            placeholder="Question"
                                            allowClear
                                            onChange={this.onChangeQuestion}
                                            defaultValue={
                                                this.state.newquestion
                                            }
                                        />
                                        <Input
                                            placeholder="Answer"
                                            allowClear
                                            onChange={this.onChangeAnswer}
                                            defaultValue={this.state.newanswer}
                                        />
                                    </Modal>
                                    <p>{element.answer}</p>
                                </Card>
                            </div>
                        ))}
                    </div>
                </Col>
                {/* </Row> */}
            </div>
        );
    }
}

export default Faqs;
