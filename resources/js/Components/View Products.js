import React, { Component } from "react";
import { Col, Card, Table, Tag, Divider, Button, Modal } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

class ViewProducts extends Component {
    state = {
        products: [],
        visible:false
    };

    componentDidMount() {
        axios.get("/api/products").then(res => {
            const productsData = res.data;
            console.log(productsData);
            this.setState({ products: productsData });
        });
    }

    handleDelete = () => {
        console.log("Deleting");
        axios.delete('/products/{id}');
    };

    handleEdit = () => {
        console.log("Handling Edit");
    };

    render() {
        const columns = [
            {
                title:'ID',
                dataIndex:'id',
                key:'id',
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
                dataIndex:'id',
                key: "actions",
                render: () => (
                    <div>
                        <Button icon="delete" onClick={this.handleDelete}/>
                        <Button
                        
                            icon="edit"
                            onClick={this.handleEdit}
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
