import React, { Component } from "react";
import { Col, Card, Table, Tag, Divider } from "antd";
import {Link} from 'react-router-dom';
import axios from "axios";

const columns = [
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
        key: "picture"
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
    // {
    //     title: "Tags",
    //     key: "tags",
    //     dataIndex: "tags",
    //     render: tags => (
    //         <span>
    //             {tags.map(tag => {
    //                 let color = "geekblue";
    //                 return (
    //                     <Tag color={color} key={tag}>
    //                         {tag.toUpperCase()}
    //                     </Tag>
    //                 );
    //             })}
    //         </span>
    //     )
    // },
    {
        title: "Action",
        key: "action",
        render: () => (
            <div>
                <span>
                    <Link to="/Add">Edit</Link>
                </span>
                <span>
                    <Link href="javascript:;">Delete</Link>
                </span>
            </div>
        )
    }
];
class ViewProducts extends Component {
    state = {
        products: []
    };

    componentDidMount() {
        axios.get("/api/products").then(res => {
            const productsData = res.data;
            console.log(productsData);
            this.setState({ products: productsData });
        });
    }

    render() {
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
