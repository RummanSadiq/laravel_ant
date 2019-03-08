import React, { Component } from "react";
import moment from "moment";
import {
    Col,
    Card,
    Row,
    Button,
    Form,
    Select,
    Input,
    Carousel,
    TimePicker,
    Statistic,
    Icon
} from "antd";
import axios from "axios";

const Option = Select.Option;

class Shop extends Component {
    state = {
        // StoreName: "Raheem Store",
        // Contact: "+923355454",
        // store_type: "Men's Fashion",
        // OpeningTime: "10 am",
        // ClosingTime: "10 pm",
        // OpensonWeekend: "yes",
        // AcceptsCard: "no",
        // Wifi: "no",
        // Delivery: "yes",
        // Address: "SHop no. 65 5th street",
        // City: "Lahore",
        store: {},
        edit: false
    };

    componentWillMount() {
        axios.get("/api/myshop").then(res => {
            const storedata = res.data;
            console.log(storedata);
            this.setState({ store: storedata });
        });
    }

    handleedit = () => {
        this.setState({ edit: !this.state.edit });
    };

    componentDidMount() {}
    render() {
        return (
            <div>
                <Col span={12} offset={6}>
                    <h1 style={{ textAlign: "center" }}>
                        {this.state.store.name}
                    </h1>
                    <Card
                        title={<h1>Store Information</h1>}
                        extra={
                            <div>
                                {!this.state.edit && (
                                    <Button
                                        shape="round"
                                        icon="edit"
                                        size={"large"}
                                        onClick={this.handleedit}
                                    >
                                        Edit info
                                    </Button>
                                )}

                                {this.state.edit && (
                                    <Button
                                        shape="round"
                                        icon="save"
                                        size={"large"}
                                        onClick={this.handleedit}
                                    >
                                        Save
                                    </Button>
                                )}
                            </div>
                        }
                        bordered={false}
                    >
                        {!this.state.edit && (
                            <Row>
                                <Col span={12}>
                                   <div><span style={{fontWeight:'bold'}}>Store Type: </span>{this.state.store.store_type}</div>
                                   <div><span style={{fontWeight:'bold'}}>Store Contact: </span>{this.state.store.Contact}</div>
                                   <div><span style={{fontWeight:'bold'}}>Store Address: </span>{this.state.store.address}</div>
                                   <div><span style={{fontWeight:'bold'}}>Store opens At: </span>{this.state.store.open_time}</div>
                                   <div><span style={{fontWeight:'bold'}}>Store Closes At: </span>{this.state.store.close_time}</div>
                                   <div><span style={{fontWeight:'bold'}}>Store Type: </span>{this.state.store.store_type}</div>

                                   {this.state.delivery > 0 &&
                                   <div style={{fontWeight:'bold'}}>Store Provides Delivery</div>

                                   } {!this.state.delivery > 0 &&

                                    <div style={{fontWeight:'bold'}}>Store does not Provide Delivery</div>
 
                                   }
                                    if(this.state.wifi > 0){
                                   <div style={{fontWeight:'bold'}}>Store has Wifi</div>

                                   }else{
                                    <div style={{fontWeight:'bold'}}>Store does not have Wifi</div>
 
                                   }
                                    if(this.state.card_payment>0){
                                   <div style={{fontWeight:'bold'}}>Store has Card Payment</div>

                                   }else{
                                    <div style={{fontWeight:'bold'}}>Store does not have Card Payment</div>
 
                                   }
                                    {/* if(this.state.OpensonWeekend>0){
                                   <div style={{fontWeight:'bold'}}>Store opens on Weekend </div>

                                   }else{
                                    <div style={{fontWeight:'bold'}}>Store does not open on Weekends</div>
 
                                   } */}





                                </Col>
                            </Row>
                        )}
                    </Card>
                    {this.state.edit && (
                        <SHForm
                            storeName={this.state.store.name}
                            Contact={this.state.store.Contact}
                            store_type={this.state.store.store_type_id}
                            OpeningTime={this.state.store.open_time}
                            ClosingTime={this.state.store.close_time}
                            OpensonWeekend={this.state.store.OpensonWeekend}
                            AcceptsCard={this.state.store.card_payment}
                            Wifi={this.state.store.wifi}
                            Delivery={this.state.store.delivery}
                            Address={this.state.store.address}
                            City={this.state.store.city}
                        />
                    )}
                </Col>

                <Col span={12} offset={6}>
                    <Carousel>
                        <div>
                            <h3>1</h3>
                        </div>
                        <div>
                            <h3>2</h3>
                        </div>
                        <div>
                            <h3>3</h3>
                        </div>
                        <div>
                            <h3>4</h3>
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
                />
            </div>
        );
    }
}

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class ShopForm extends React.Component {
    state = {
        store_types: []
    };
    componentDidMount() {
        // To disabled submit button at the beginning.
        // this.props.form.validateFields();
        axios.get("/api/storetypes").then(res => {
            const storedata = res.data;
            console.log(storedata);
            this.setState({ store_types: storedata });
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                axios.post("/api/updateshop", values).then(res => {
                    console.log(res);
                });
            } else {
                console.log("Errors", err);
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
            isFieldTouched("Contact") && getFieldError("Contact");

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

        const wheelchairError =
            isFieldTouched("wheel_chair") && getFieldError("wheel_chair");
        const washroomError =
            isFieldTouched("wash_room") && getFieldError("wash_room");

        return (
            <Col span={12} offset={6}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item
                        validateStatus={store_typeError ? "error" : ""}
                        help={store_typeError || ""}
                        label="Store Type:"

                    >
                        {getFieldDecorator("store_type_id", {
                            initialValue: "Pharmacy",
                            valuePropName: "store_type_id",
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
                                    <Option value={element.id}>
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
                            initialValue: this.props.storeName,
                            rules: [
                                {
                                    required: true,
                                    message: "Please input your Store Name"
                                }
                            ]
                        })(<Input placeholder="Store Name" />)}
                    </Form.Item>
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    validateStatus={
                                        openTimeError ? "error" : ""
                                    }
                                    help={openTimeError || ""}
                                    label="Accepts Card?"
                                    label="Opens at:"


                                >
                                    {getFieldDecorator("open_time", {
                                        initialValue: moment(
                                            this.props.OpeningTime,
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
                                    validateStatus={
                                        closeTimeError ? "error" : ""
                                    }
                                    help={closeTimeError || ""}
                                    label="Closes at:"

                                >
                                    {getFieldDecorator("close_time", {
                                        initialValue: moment(
                                            this.props.ClosingTime,
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
                        {getFieldDecorator("Contact", {
                            initialValue: this.props.Contact,
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
                            initialValue: this.props.AcceptsCard,
                            placeholder:'Store accepts credit card? ',
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
                            initialValue: this.props.Wifi,
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

                    {/* <Form.Item
                        validateStatus={deliveryError ? "error" : ""}
                        help={deliveryError || ""}
                        label="Provides Delivery?"

                    >
                        {getFieldDecorator("delivery", {
                            initialValue: this.props.Delivery,
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
                    </Form.Item> */}

                    {/* <Form.Item
                        validateStatus={cityError ? "error" : ""}
                        help={cityError || ""}
                        label="City:"

                    >
                        {getFieldDecorator("city", {
                            initialValue: this.props.City,
                            rules: [{ required: true, message: "Store city" }]
                        })(
                            <Select placeholder="Store city">
                                <Option value="Lahore">Lahore</Option>
                                <Option value="Islamabad">Islamabad</Option>
                            </Select>
                        )}
                    </Form.Item>

                    <Form.Item
                        validateStatus={addressError ? "error" : ""}
                        help={addressError || ""}
                        label="Address:"

                    >
                        {getFieldDecorator("address", {
                            initialValue: this.props.Address,
                            rules: [
                                { required: true, message: "Store address" }
                            ]
                        })(<Input placeholder="Store address" />)}
                    </Form.Item> */}

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

export default Shop;
