import React, { Component } from "react";
import moment from "moment";
import {
    Col,
    Row,
    Button,
    Form,
    Select,
    message,
    Input,
    TimePicker,
    Upload
} from "antd";
import axios from "axios";

const Option = Select.Option;

class ShopForm extends React.Component {
    constructor(props) {
        super(props);
        this.state.store = this.props.store;
    }
    state = {
        store_types: [],
        image: null,
        store: {}
    };
    componentDidMount() {
        // To disabled submit button at the beginning.
        // this.props.form.validateFields();
        axios.get("/api/storetypes").then(res => {
            const storedata = res.data;
            console.log('store types are',storedata);
            this.setState({ store_types: storedata });
        });

        console.log('STORE values inside form are',this.state.store);
    }
    handleUpload = event => {
        if (event.file.status !== "uploading") {
            console.log('Uploading file is',event.file);
            this.setState({ image: event.file.response.url });
        }
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);

                if (this.state.store.StoreName !== null) {
                    console.log("sorename");

                    if (this.state.image != null) {
                        values.display_picture = this.state.image;
                    }

                    values.open_time = moment
                        .utc(values.open_time)
                        .format("HH:mm:ss");

                    values.close_time = moment
                        .utc(values.close_time)
                        .format("HH:mm:ss");

                    // if (this.state.store.storeName)
                    axios
                        .post("/api/updateshop", values)
                        .then(res => {
                            console.log(res);
                            message.success("Shop Updated!");
                        })
                        .catch(function(error) {
                            // handle error
                            console.log(error);
                            console.log(values);
                        });

                    this.props.changeState();
                } else {
                    console.log(
                        "No storename add api call here to create store"
                    );
                }
            } else {
                console.log("Errors", err);
                message.error("Invalid Values", err);
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
        const store_typeError =
            isFieldTouched("store_type_id") && getFieldError("store_type_id");

        const storeNameError = isFieldTouched("name") && getFieldError("name");

        const ContactError =
            isFieldTouched("contact") && getFieldError("contact");

        const openTimeError =
            isFieldTouched("open_time") && getFieldError("open_time");

        const closeTimeError =
            isFieldTouched("close_time") && getFieldError("close_time");

        const cardError =
            isFieldTouched("card_payment") && getFieldError("card_payment");

        const wifiError = isFieldTouched("wifi") && getFieldError("wifi");

        const deliveryError =
            isFieldTouched("delivery") && getFieldError("delivery");

        const cityError = isFieldTouched("city") && getFieldError("city");

        const addressError =
            isFieldTouched("address") && getFieldError("address");

        const pictureError =
            isFieldTouched("display_picture") &&
            getFieldError("display_picture");

        // const wheelchairError =
        //     isFieldTouched("wheel_chair") && getFieldError("wheel_chair");
        // const washroomError =
        //     isFieldTouched("wash_room") && getFieldError("wash_room");

        return (
            <Col    >
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item
                        validateStatus={store_typeError ? "error" : ""}
                        help={store_typeError || ""}
                        label="Store Type:"
                    >
                        {getFieldDecorator("store_type_id", {
                            initialValue: this.state.store.store_type_id
                                // ? this.state.store.store_type
                                // : ""
                                ,
                            rules: [
                                {
                                    required: true,
                                    message: "Please input your store type!"
                                }
                            ]
                        })(
                            <Select
                                placeholder="Select Type of store"
                                style={{ width: 320 }}
                            >
                                {this.state.store_types.map(element => (
                                    <Option value={element.id} key={element.id}>
                                        {element.name}
                                    </Option>
                                ))}
                            </Select>
                        )}
                    </Form.Item>
                    <div style={{ marginTop: "2%" }} />
                    <Form.Item
                        validateStatus={storeNameError ? "error" : ""}
                        help={storeNameError || ""}
                        label="Store Name:"
                    >
                        {getFieldDecorator("name", {
                            initialValue: this.state.store.name
                                // ? this.state.store.storeName
                                // : ""
                                ,
                            rules: [
                                {
                                    required: true,
                                    message: "Please input your Store Name"
                                }
                            ]
                        })(<Input placeholder="Store Name" />)}
                    </Form.Item>

                    <Form.Item
                        validateStatus={pictureError ? "error" : ""}
                        help={pictureError || ""}
                        label="Store Picture:"
                    >
                        {getFieldDecorator("display_picture", {
                            initialValue: this.state.store.display_picture
                                // ? this.state.store.display_picture
                                // : ""
                                ,

                            rules: [
                                {
                                    required: true,
                                    message: "Please input your Store picture"
                                }
                            ]
                        })(
                            <Upload
                                action="/api/attachment/products"
                                onChange={this.handleUpload}
                                listType="picture"
                                name="image"
                            >
                                <Button icon="upload">Upload File</Button>
                            </Upload>
                        )}
                    </Form.Item>

                    <Row>
                        <Col span={12}>
                            <Form.Item
                                validateStatus={openTimeError ? "error" : ""}
                                help={openTimeError || ""}
                                label="Accepts Card?"
                                label="Opens at:"
                            >
                                {getFieldDecorator("open_time", {
                                    initialValue: moment(
                                        this.state.store.open_time
                                            // ? this.state.store.OpeningTime
                                            // : ""
                                            ,
                                        "HH:mm:ss "
                                    ),

                                    rules: [
                                        {
                                            required: true,
                                            message: "Store opens at"
                                        }
                                    ]
                                })(
                                    <TimePicker
                                        use12Hours
                                        format="h:mm a"
                                        placeholder="Opening Time"
                                    />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                validateStatus={closeTimeError ? "error" : ""}
                                help={closeTimeError || ""}
                                label="Closes at:"
                            >
                                {getFieldDecorator("close_time", {
                                    initialValue: moment(
                                        this.state.store.close_time
                                            // ? this.state.store.ClosingTime
                                            // : ""
                                            ,
                                        "HH:mm:ss"
                                    ),
                                    rules: [
                                        {
                                            required: true,
                                            message: "Store closes at"
                                        }
                                    ]
                                })(
                                    <TimePicker
                                        use12Hours
                                        format="h:mm a"
                                        placeholder="Closing Time"
                                    />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        validateStatus={ContactError ? "error" : ""}
                        help={ContactError || ""}
                        label="Contact#"
                    >
                        {getFieldDecorator("contact", {
                            initialValue: this.state.store.contact
                                // ? this.state.store.Contact
                                // : ""
                                ,
                            rules: [
                                {
                                    required: true,
                                    message:
                                        "Please input your Store Contact number"
                                }
                            ]
                        })(<Input placeholder="Contact" type="phone" />)}
                    </Form.Item>
                    <Form.Item
                        validateStatus={cardError ? "error" : ""}
                        help={cardError || ""}
                        label="Accepts Card?"
                    >
                        {getFieldDecorator("card_payment", {
                            initialValue: this.state.store.card_payment
                                // ? this.state.store.AcceptsCard
                                // : ""
                                ,
                            placeholder: "Store accepts credit card? ",
                            rules: [
                                {
                                    required: true,
                                    message: "Store accepts credit card?"
                                }
                            ]
                        })(
                            <Select placeholder="Store accepts credit card?">
                                <Option value={1}>Yes</Option>
                                <Option value={0}>No</Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item
                        validateStatus={wifiError ? "error" : ""}
                        help={wifiError || ""}
                        label="Has Wifi?"
                    >
                        {getFieldDecorator("wifi", {
                            initialValue: this.state.store.wifi
                                // ? this.state.store.Wifi
                                // : ""
                                ,
                            rules: [
                                {
                                    required: true,
                                    message: "Store has wifi?"
                                }
                            ]
                        })(
                            <Select placeholder="Store has wifi?">
                                <Option value={1}>Yes</Option>
                                <Option value={0}>No</Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item
                        validateStatus={deliveryError ? "error" : ""}
                        help={deliveryError || ""}
                        label="Provides Delivery?"
                    >
                        {getFieldDecorator("delivery", {
                            initialValue: this.state.store.delivery
                                // ? this.state.store.Delivery
                                // : ""
                                ,
                            rules: [
                                {
                                    required: true,
                                    message: "Store provides Delivery?"
                                }
                            ]
                        })(
                            <Select placeholder="Store provides Delivery?">
                                <Option value={1}>Yes</Option>
                                <Option value={0}>No</Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item
                        validateStatus={addressError ? "error" : ""}
                        help={addressError || ""}
                        label="Address:"
                    >
                        {getFieldDecorator("address", {
                            initialValue: this.state.store.address
                                // ? this.state.store.Address
                                // : ""
                                ,
                            rules: [
                                { required: true, message: "Store address" }
                            ]
                        })(<Input placeholder="Store address" />)}
                    </Form.Item>
                    <Form.Item>
                        {" "}
                        <div style={{ marginLeft: "70%", marginTop: "2%" }}>
                            <Button
                                type={"primary"}
                                htmlType="submit"
                                size={"large"}
                                icon={"check"}
                            >
                                Submit
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Col>
        );
    }
}

const SHForm = Form.create({ name: "Shop_Form" })(ShopForm);

export default SHForm;
