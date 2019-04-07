import React, { Component } from "react";
import { Row, Col, Card } from "antd";
import { BrowserRouter, Route } from "react-router-dom";
import SCForm from "./CreateShopForm";

class ShopCreate extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Row>
                <Col span={8} style={{ textAlign: "center" }}>
                    {/* Some other portion */}
                </Col>
                <Col span={8}>
                    <BrowserRouter>
                        <div>
                            {/* <Route path="/" component={Index} /> */}
                            <Card title="Please enter your store information">
                                <SCForm
                                 lift={this.props.lift}
                                 />
                            </Card>
                        </div>
                    </BrowserRouter>
                </Col>
            </Row>
        );
    }
}

export default ShopCreate;
