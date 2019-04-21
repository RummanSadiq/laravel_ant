import React, { Component } from "react";
import APForm from "./AddProductForm";
import { Row, Col } from "antd";

class AddProduct extends Component {
    state = {
        product: []
    };

    render() {
        return (
            <Col
                xl={13}
                lg={14}
                sm={16}
                xs={16}
                md={16}
                style={{ marginTop: "2em", marginLeft: "25%" }}
            >
                <APForm />
            </Col>
        );
    }
}

export default AddProduct;
