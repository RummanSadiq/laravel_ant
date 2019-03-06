import React, { Component } from "react";
import moment from 'moment';
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
const InputGroup = Input.Group;

class Shop extends Component {
    state = {
        StoreName: "Raheem Store",
        Contact: "+923355454",
        StoreType: "Men's Fashion",
        OpeningTime: "10 am",
        ClosingTime: "10 pm",
        OpensonWeekend: "yes",
        AcceptsCard: "no",
        Wifi: "no",
        Delivery: "yes",
        Address: "SHop no. 65 5th street",
        City: "Lahore",
        edit: false
    };

    handleedit = () => {
        this.setState({ edit: !this.state.edit });
    };

    componentDidMount() {}
    render() {
        return (
            <div>
                <Col span={12} offset={6}>
                    <h1 style={{ textAlign: "center" }}>Shop name here</h1>
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
                                    <div style={{ fontWeight: "bold" }}>
                                        Wifi
                                    </div>
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
                        )}
                    </Card>
                    {this.state.edit && (
                        <SHForm
                            storeName={this.state.StoreName}
                            contact={this.state.Contact}
                            StoreType={this.state.StoreType}
                            OpeningTime={this.state.OpeningTime}
                            ClosingTime={this.state.ClosingTime}
                            OpensonWeekend={this.state.OpensonWeekend}
                            AcceptsCard={this.state.AcceptsCard}
                            Wifi={this.state.Wifi}
                            Delivery={this.state.Delivery}
                            Address={this.state.Address}
                            City={this.state.City}
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
    componentDidMount() {
        // To disabled submit button at the beginning.
        // this.props.form.validateFields();
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
            }else{
                console.log('Errors',err);
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
        const storeTypeError =
            isFieldTouched("storetype") && getFieldError("storetype");
        const storeNameError =
            isFieldTouched("storename") && getFieldError("storename");

        const contactError =
            isFieldTouched("contact") && getFieldError("contact");
        const openTimeError =
            isFieldTouched("opentime") && getFieldError("opentime");
        const closeTimeError =
            isFieldTouched("closetime") && getFieldError("closetime");
        const weekendError =
            isFieldTouched("weekend") && getFieldError("weekend");
        const cardError = isFieldTouched("card") && getFieldError("card");
        const wifiError = isFieldTouched("wifi") && getFieldError("wifi");
        const deliveryError =
            isFieldTouched("delivery") && getFieldError("delivery");
        const cityError = isFieldTouched("city") && getFieldError("city");
        const addressError =
            isFieldTouched("address") && getFieldError("address");

        return (
            <Col span={12} offset={6}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item
                        validateStatus={storeTypeError ? "error" : ""}
                        help={storeTypeError || ""}
                    >
                        {getFieldDecorator("storetype", {
                            initialValue:this.props.StoreType,
                            valuePropName:'StoreType',
                            rules: [
                                {
                                    required: true,
                                    message: "Please input your store type!"
                                }
                            ]
                        })(
                            <Select
                                placeholder="Select Category"
                                style={{ width: 320 }}
                                
                            >
                                <Option value="WomensFashion">
                                    Women's Fashion
                                </Option>
                                <Option key="1" value="MensFashion">
                                    Men's Fashion
                                </Option>
                                <Option key="2" value="ElectronicsandDevices">
                                    Electronics and Devices
                                </Option>
                                <Option key="3" value="ElectronicAccessories">
                                    Electronic Accessories
                                </Option>
                                <Option key="4" value="TVandHomeApplicances">
                                    TV and Home Applicances
                                </Option>
                                <Option key="5" value="HealthandBeauty">
                                    Health and Beauty
                                </Option>
                                <Option key="6" value="BabiesandToys">
                                    Babies and Toys
                                </Option>
                                <Option key="7" value="GroceryandPets">
                                    Grocery and Pets
                                </Option>
                                <Option key="8" value="HomeandLifestyle">
                                    Home and Lifestyle
                                </Option>
                                <Option key="9" value="WatchesandAccessories">
                                    Watches and Accessories
                                </Option>
                                <Option
                                    key="10"
                                    value="AutomotiveandMotorbike"
                                >
                                    Automotive and Motorbike
                                </Option>
                                <Option key="12" value="Sports">
                                    Sports
                                </Option>
                            </Select>
                        )}
                    </Form.Item>
                    <div style={{ marginTop: "2%" }} />
                    <Form.Item
                        validateStatus={storeNameError ? "error" : ""}
                        help={storeNameError || ""}
                    >
                        {getFieldDecorator("storename", {
                            initialValue:this.props.storeName,
                            rules: [
                                {
                                    required: true,
                                    message: "Please input your Store Name"
                                }
                            ]
                        })(
                            <Input
                                placeholder="Store Name"
                            />
                        )}
                    </Form.Item>
                    <InputGroup>
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    validateStatus={
                                        openTimeError ? "error" : ""
                                    }
                                    help={openTimeError || ""}
                                >
                                    {getFieldDecorator("opentime", {
                                    initialValue:moment(this.props.ClosingTime, 'HH:mm:ss'),

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
                                >
                                    {getFieldDecorator("closetime", {
                                        initialValue: moment(this.props.ClosingTime, 'HH:mm:ss'),
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
                    </InputGroup>
                    <Form.Item
                        validateStatus={contactError ? "error" : ""}
                        help={contactError || ""}
                    >
                        {getFieldDecorator("contact", {
                            initialValue:this.props.contact,
                            rules: [
                                {
                                    required: true,
                                    message:
                                        "Please input your Store Contact number"
                                }
                            ]
                        })(
                            <Input
                                placeholder="Contact"
                                type="phone"
                            />
                        )}
                    </Form.Item>

                    <Form.Item
                        validateStatus={weekendError ? "error" : ""}
                        help={weekendError || ""}
                    >
                        {getFieldDecorator("weekend", {
                            initialValue:this.props.OpensonWeekend,
                            rules: [
                                {
                                    required: true,
                                    message: "Store opens on weekend?"
                                }
                            ]
                        })(
                            <Select
                                placeholder="Opens on weekend"
                            >
                                <Option value={true}>Yes</Option>
                                <Option value={false}>No</Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item
                        validateStatus={cardError ? "error" : ""}
                        help={cardError || ""}
                    >
                        {getFieldDecorator("card", {
                            initialValue:this.props.AcceptsCard,
                            rules: [
                                {
                                    required: true,
                                    message: "Store accepts credit card?"
                                }
                            ]
                        })(
                            <Select
                                placeholder="Store accepts credit card?"
                            >
                                <Option value={true}>Yes</Option>
                                <Option value={false}>No</Option>
                            </Select>
                        )}
                    </Form.Item>

                    <Form.Item
                        validateStatus={wifiError ? "error" : ""}
                        help={wifiError || ""}
                    >
                        {getFieldDecorator("wifi", {
                            initialValue:this.props.Wifi,
                            rules: [
                                {
                                    required: true,
                                    message: "Store has wifi?"
                                }
                            ]
                        })(
                            <Select
                                placeholder="Store has wifi?"
                            >
                                <Option value={true}>Yes</Option>
                                <Option value={false}>No</Option>
                            </Select>
                        )}
                    </Form.Item>

                    <Form.Item
                        validateStatus={deliveryError ? "error" : ""}
                        help={deliveryError || ""}
                    >
                        {getFieldDecorator("wifi", {
                            initialValue:this.props.Delivery,
                            rules: [
                                {
                                    required: true,
                                    message: "Store provides Delivery?"
                                }
                            ]
                        })(
                            <Select
                                placeholder="Store provides Delivery?"
                            >
                                <Option value={true}>Yes</Option>
                                <Option value={false}>No</Option>
                            </Select>
                        )}
                    </Form.Item>

                    <Form.Item
                        validateStatus={cityError ? "error" : ""}
                        help={cityError || ""}
                    >
                        {getFieldDecorator("city", {
                            initialValue:this.props.City,
                            rules: [{ required: true, message: "Store city" }]
                        })(
                            <Select
                                placeholder="Store city"
                            >
                                <Option value="Lahore">Lahore</Option>
                                <Option value="Islamabad">Islamabad</Option>
                            </Select>
                        )}
                    </Form.Item>

                    <Form.Item
                        validateStatus={addressError ? "error" : ""}
                        help={addressError || ""}
                    >
                        {getFieldDecorator("address", {
                            initialValue:this.props.Address,
                            rules: [
                                { required: true, message: "Store address" }
                            ]
                        })(
                            <Input
                                placeholder="Store address"
                            />
                        )}
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

export default Shop;
