import React, { Component } from "react";
import moment from "moment";
import {
    Col,
    Card,
    Row,
    Button,
    Form,
    Select,
    message,
    Input,
    Carousel,
    TimePicker,
    Statistic,
    Icon,
    Upload,
    Modal
} from "antd";
import axios from "axios";
import SHForm from "./ShopForm";


class Shop extends Component {
    state = {
        store: {},
        edit: false,
        show: false
    };

    componentDidMount() {
        axios.get("/api/myshop").then(res => {
            const storedata = res.data;
            console.log("SHOP.JS", storedata);
            this.setState({ store: storedata });
        });
    }

    handleCancel = () => {
        this.setState({ show: false });
    };

    // handleOk = event => {
    //     this.setState({ show: false });
    //     console.log("handeling ok!");
    //     this.getProducts();
    // };

    handleedit = () => {
        this.setState({ show: true });
    };

    handleStateChange = () => {
        axios.get("/api/myshop").then(res => {
            const storedata = res.data;
            console.log(storedata);
            this.setState({ store: storedata, show: false });
        });
    };

    render() {
        return (
            <div>
                {" "}
                <Col span={12} offset={6}>
                    <h1 style={{ textAlign: "center" }}>
                        {this.state.store.name}
                    </h1>
                    <Card
                        title={
                            <h1>
                                {" "}
                                <Icon type="info-circle" />
                                Store Information
                            </h1>
                        }
                        extra={
                            <div>
                                {/* {!this.state.edit && ( */}
                                <Button
                                    shape="round"
                                    icon="edit"
                                    size={"large"}
                                    onClick={this.handleedit}
                                >
                                    Edit info
                                </Button>
                                {/* )} */}
                            </div>
                        }
                        // bordered={false}
                    >
                        {/* {!this.state.edit && ( */}
                        <div
                            style={{
                                fontWeight: "bold"
                            }}
                        >
                            <Row>
                                <Col span={12} className="infoColumns">
                                    <span>Store Type: </span>
                                    {this.state.store.store_type}
                                </Col>

                                <Col span={12} className="infoColumns">
                                    <span style={{ fontWeight: "bold" }}>
                                        Store Contact:{" "}
                                    </span>
                                    {this.state.store.contact}
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} className="infoColumns">
                                    <span>Store Address: </span>
                                    {this.state.store.address}
                                </Col>
                                <Col span={12} className="infoColumns">
                                    <span>Store City: </span>
                                    {this.state.store.store_type}
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} className="infoColumns">
                                    <span>Store opens At: </span>
                                    {this.state.store.open_time}
                                </Col>
                                <Col span={12} className="infoColumns">
                                    {" "}
                                    <span>Closing Time</span>
                                    {this.state.store.close_time}
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} className="infoColumns">
                                    {this.state.store.delivery > 0 && (
                                        <span>Store Provides Delivery</span>
                                    )}
                                    {this.state.delivery <= 0 && (
                                        <span>
                                            Store does not Provide Delivery
                                        </span>
                                    )}
                                </Col>
                                <Col span={12} className="infoColumns">
                                    {" "}
                                    {this.state.store.wifi > 0 && (
                                        <span>
                                            <Icon type="wifi" />
                                            Store has Wifi
                                        </span>
                                    )}
                                    {!this.state.store.wifi > 0 && (
                                        <span>
                                            <Icon
                                                type="wifi"
                                                style={{
                                                    color: "#F81D22"
                                                }}
                                            />
                                            /> Store does not have Wifi
                                        </span>
                                    )}
                                </Col>
                            </Row>

                            <Row>
                                <Col span={12} className="infoColumns">
                                    {" "}
                                    {this.state.store.card_payment > 0 && (
                                        <span>
                                            <Icon
                                                type="credit-card"
                                                theme="twoTone"
                                            />
                                            Store has Card Payment
                                        </span>
                                    )}
                                    {!this.state.store.card_payment > 0 && (
                                        <span>
                                            <Icon
                                                type="credit-card"
                                                theme="filled"
                                                style={{
                                                    fontSize: "50px",
                                                    color: "#F81D22"
                                                }}
                                            />
                                            Store does not have Card Payment
                                        </span>
                                    )}
                                </Col>
                                {/* <Col span={12} className="infoColumns" /> */}
                            </Row>
                        </div>
                        {/* // )} */}
                    </Card>
                </Col>{" "}
                <Col span={12} offset={6}>
                    <Carousel>
                        <div>
                            <img
                                src={this.state.store.display_picture}
                                alt="Store Image"
                            />
                        </div>
                        <div>
                            <img
                                src={this.state.store.display_picture}
                                alt="Store Image"
                            />
                        </div>
                        <div>
                            <img
                                src={this.state.store.display_picture}
                                alt="Store Image"
                            />
                        </div>
                        <div>
                            <img
                                src={this.state.store.display_picture}
                                alt="Store Image"
                            />
                        </div>
                    </Carousel>
                </Col>
                <Statistic
                    title="Feedback"
                    value={1128}
                    prefix={<Icon type="like" />}
                />
                <Statistic
                    title="Views"
                    value={93}
                    prefix={<Icon type="eye" />}
                />{" "}
                <Modal
                    title="Edit Store details"
                    visible={this.state.show}
                    onOk={event => this.handleOk(event)}
                    onCancel={this.handleCancel}
                    destroyOnClose={true}
                    style={{ top: 20 }}

                    footer={null}
                >
                    <SHForm
                        store={this.state.store}
                        changeState={this.handleStateChange}
                    />
                </Modal>
            </div>
        );
    }
}

export default Shop;
