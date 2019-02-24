import React, { Component } from "react";
import { Col, Card, Row, Button } from "antd";
class Shop extends Component {
    state = {
        StoreName: "Raheem Store",
        Contact: "+92-xxx-xxxxxxx",
        StoreType: "Clothing",
        OpeningTime: "10 am",
        ClosingTime: "10 pm",
        OpensonWeekend: "yes",
        AcceptsCard: "no",
        Wifi: "no",
        Delivery: "yes",
        Address: "SHop no. 65 5th street",
        edit: false
    };
    render() {
        return (
            <div>
                <Col span={12} offset={6}>
                    <h1 style={{ textAlign: "center" }}>Shop name here</h1>

                    <Card>
                        <Button shape="round" icon="edit" size={"large"}>
                            Edit info
                        </Button>
                        <Row>
                            <Col span={12}>
                                <span style={{ fontWeight: "bold" }}>
                                    Store Type:
                                </span>
                                <div style={{ fontWeight: "bold" }}>
                                    Contact
                                </div>
                                <div style={{ fontWeight: "bold" }}>
                                    OpeningTime
                                </div>
                                <div style={{ fontWeight: "bold" }}>
                                    ClosingTime
                                </div>
                                <div style={{ fontWeight: "bold" }}>
                                    Opens on Weekend
                                </div>
                                <div style={{ fontWeight: "bold" }}>
                                    Accepts Card
                                </div>
                                <div style={{ fontWeight: "bold" }}>Wifi</div>
                                <div style={{ fontWeight: "bold" }}>
                                    Delivery
                                </div>
                                <div style={{ fontWeight: "bold" }}>
                                    Address
                                </div>
                            </Col>
                            <Col span={12}>
                                <div
                                    style={{
                                        textAlign: "right",
                                        marginLeft: "60%"
                                    }}
                                >
                                    {this.state.StoreType}
                                </div>
                                <div
                                    style={{
                                        textAlign: "right",
                                        marginLeft: "60%"
                                    }}
                                >
                                    {this.state.Contact}
                                </div>
                                <div
                                    style={{
                                        textAlign: "right",
                                        marginLeft: "60%"
                                    }}
                                >
                                    {this.state.OpeningTime}
                                </div>
                                <div
                                    style={{
                                        textAlign: "right",
                                        marginLeft: "60%"
                                    }}
                                >
                                    {this.state.ClosingTime}
                                </div>
                                <div
                                    style={{
                                        textAlign: "right",
                                        marginLeft: "60%"
                                    }}
                                >
                                    {this.state.OpensonWeekend}
                                </div>
                                <div
                                    style={{
                                        textAlign: "right",
                                        marginLeft: "60%"
                                    }}
                                >
                                    {this.state.AcceptsCard}
                                </div>
                                <div
                                    style={{
                                        textAlign: "right",
                                        marginLeft: "60%"
                                    }}
                                >
                                    {this.state.Wifi}
                                </div>
                                <div
                                    style={{
                                        textAlign: "right",
                                        marginLeft: "60%"
                                    }}
                                >
                                    {this.state.Delivery}
                                </div>
                                <div
                                    style={{
                                        textAlign: "right",
                                        marginLeft: "60%"
                                    }}
                                >
                                    {this.state.Address}
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </div>
        );
    }
}

export default Shop;
