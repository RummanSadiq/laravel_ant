import React, { Component } from "react";
import { Col, Card,Row,Icon,message, Table, Tag, Divider, Button, Form, Input, Upload, Select, Modal } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

const { TextArea } = Input;
const Option = Select.Option;


class ViewProducts extends Component {
    state = {
        products: [],
        visible: false,
        erecord:{},
        show:false
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
        this.setState({erecord:record, show:true});

        
        console.log(record);
    }


    handleCancel = ()=>{
        this.setState({show:false});
    }

    handleOk = (event) =>{
    this.setState({show:false});

    console.log("handeling ok!");
 event.preventDefault();

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

                     <Modal
                            title="Edit a Question"
                            visible={this.state.show}
                            onOk={event => this.handleOk(event)}
                            onCancel={this.handleCancel}
                            destroyOnClose={true}
                            // mquestion={this.state.newfaq.question}
                            // manswer={this.state.newfaq.answer}
                        >
                            <EPForm
                            id={this.state.erecord.id}
                            name={this.state.erecord.name}
                            description={this.state.erecord.description}
                            display_picture={this.state.erecord.display_picture}
                            price={this.state.erecord.price}
                            category_id={this.state.erecord.category_id}
                            handleOk = {this.handleOk}
                            />
                        </Modal>

                </Col>
            </div>
        );
    }
}


class EditProduct extends Component {
    state = {
        image_path: "",
        products:[]
    };

    handleUpload = event => {
        if (event.file.status !== "uploading") {
            console.log(event.file);
            this.setState({ image_path: event.file.response.url });
        }
    };



    handleSubmit = e => {
        e.preventDefault();

        console.log("value of id is"+this.props.id);
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.display_picture = this.state.image_path;
                console.log("Received values of form: ", values);

                message.success("DONE");
               
                axios.post("/products/" + this.props.id, values).then(res => {
                    const data = res.data;
                    console.log(data); 
                    this.props.handleOk();
                });
            }
        });
    };

    render() {
        const {
            getFieldDecorator,
            getFieldsError,
            getFieldError,
            isFieldTouched
        } = this.props.form;

        // Only show error after a field is touched.
        const productNameError =
            isFieldTouched("name") && getFieldError("name");
        const descriptionError =
            isFieldTouched("description") && getFieldError("description");
        const pictureError =
            isFieldTouched("display_picture") &&
            getFieldError("display_picture");
        const categoryError =
            isFieldTouched("category_id") && getFieldError("category_id");
        const priceError = isFieldTouched("price") && getFieldError("price");
        return (
           
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item
                            validateStatus={productNameError ? "error" : ""}
                            help={productNameError || ""}
                        >
                            {getFieldDecorator("name", {
                                initialValue:this.props.name,
                                rules: [
                                    {
                                        required: true,
                                        message: "Please input your username!"
                                    }
                                ]
                            })(
                                <Input placeholder="Enter Product title/name" />
                            )}
                        </Form.Item>
                        <div style={{ marginTop: "2%" }} />

                        <Form.Item
                            validateStatus={priceError ? "error" : ""}
                            help={priceError || ""}
                        >
                            {getFieldDecorator("price", {
                              initialValue:this.props.price,

                                rules: [
                                    {
                                        required: true,
                                        message:
                                            "Please input your Product Price!"
                                    }
                                ]
                            })(
                                <Row>
                                    <Col span={4}>
                                        {" "}
                                        <Input
                                            size="small"
                                            type="number"
                                            placeholder="price"
                                        />
                                    </Col>
                                </Row>
                            )}
                        </Form.Item>
                        <Form.Item
                            validateStatus={descriptionError ? "error" : ""}
                            help={descriptionError || ""}
                        >
                            {getFieldDecorator("description", {
      initialValue:this.props.description,

                                rules: [
                                    {
                                        required: true,
                                        message:
                                            "Please input your Product Description!"
                                    }
                                ]
                            })(
                                <TextArea
                                    placeholder="Write complete product Description"
                                    autosize={{ minRows: 3, maxRows: 6 }}
                                />
                            )}
                        </Form.Item>
                     
                        <div style={{ margin: "2%" }}>
                            <h3>Upload Pictures</h3>
                        </div>

                         <Form.Item
                            validateStatus={pictureError ? "error" : ""}
                            help={pictureError || ""}
                        >
                            {getFieldDecorator("display_picture", {
                                                                initialValue:this.props.display_picture,

                                rules: [
                                    {
                                        required: true,
                                        message: "Must Upload Picture"
                                    }
                                ]
                            })(
                            <Upload
                                action="/api/attachment/products"
                                onChange={this.handleUpload}
                                listType="picture"
                                name="image"
                            >
                                <Button>
                                    <Icon type="upload" /> Upload
                                </Button>
                            </Upload>
                            )}
                        </Form.Item>

                        <Form.Item
                            validateStatus={categoryError ? "error" : ""}
                            help={categoryError || ""}
                        >
                            <h2>Select category</h2>

                            {getFieldDecorator("category_id", {
                                                                initialValue:this.props.category_id,

                                rules: [
                                    {
                                        required: true,
                                        message:
                                            "Please input your Product Category!"
                                    }
                                ]
                            })(
                                <Select
                                    placeholder="Select Category"
                                    style={{ width: 320 }}
                                    // onChange={handleChangeCategory}
                                >
                                    <option value={1}>Women's Fashion</option>
                                </Select>
                            )}
                        </Form.Item>
                       
                        <Form.Item>
                            {" "}
                            <div style={{ marginLeft: "60%", marginTop: "2%" }}>
                                <Button
                                    type={"primary"}
                                    htmlType="submit"
                                    size={"large"}
                                    icon={"check"}
                                >
                                    Done
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
               
        );
    }
}
const EPForm = Form.create({ name: "Edit_Product_Form" })(EditProduct);

export default ViewProducts;

