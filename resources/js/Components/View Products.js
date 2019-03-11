import React, { Component } from "react";
import { Col, Card, Table, Tag, Divider, Button, Modal } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

class ViewProducts extends Component {
    state = {
        products: [],
        visible: false
    };

    componentDidMount() {
        this.getProducts();
    }

    getProducts() {
        axios.get("/api/products").then(res => {
            const productsData = res.data;
            console.log(productsData);
            this.setState({ products: productsData });
        });
    }

    handleDelete(event, record) {
        console.log("Deleting");
        //Prodcut Info
        console.log("ID: " + record.id);
        console.log("Name: " + record.name);
        console.log("Description: " + record.description);
        console.log("Price: " + record.price);
        console.log("Category: " + record.category);

        axios.delete("api/products/" + record.id);
        this.getProducts();
    }

    handleEdit(event, record) {
        console.log("Handling Edit");
        console.log(record);
    }

    render() {
        const columns = [
            {
                title: "ID",
                dataIndex: "id",
                key: "id"
            },
            {
                title: "Name",
                dataIndex: "name",
                key: "name",
                render: text => <a href="javascript:;">{text}</a>
            },
            {
                title: "Description",
                dataIndex: "description",
                key: "description"
            },
            {
                title: "Picture",
                dataIndex: "display_picture",
                key: "picture",
                render: Image => <img src={Image} />
            },
            {
                title: "Price",
                dataIndex: "price",
                key: "price"
            },
            {
                title: "Category",
                dataIndex: "category",
                key: "category"
            },
            {
                title: "Action",
                dataIndex: "id",
                key: "actions",
                render: (text, record) => (
                    <div>
                        <Button
                            icon="delete"
                            onClick={event => this.handleDelete(event, record)}
                        />
                        <Button
                            icon="edit"
                            onClick={event => this.handleEdit(event, record)}
                        />
                    </div>
                )
            }
        ];
        return (
            <div>
                <Col span={14} offset={6}>
                    <div>
                        <h1 style={{ textAlign: "center" }}>
                            These are all the products you have listed.
                        </h1>
                    </div>

                    <Table columns={columns} dataSource={this.state.products} />
                </Col>
            </div>
        );
    }
}

export default ViewProducts;
