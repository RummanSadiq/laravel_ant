import React, { Component } from "react";

import { Col, Card, Row, Button, Form, Select, Input } from "antd";

const Option = Select.Option;

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

    handleedit=()=>{
        this.setState({edit:!this.state.edit});
    }
    render() {
        return (
            <div>
                <Col span={12} offset={6}>
                    <h1 style={{ textAlign: "center" }}>Shop name here</h1>

                    {!this.state.edit &&
                    <Button shape="round" icon="edit" size={"large"} onClick={this.handleedit}>
                            Edit info
                        </Button>}

                        {this.state.edit &&
                    <Button shape="round" icon="save" size={"large"} onClick={this.handleedit}>
                            Save
                        </Button>}

                    {
                    !this.state.edit  &&
                    <Card>
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
                    </Card>}
                    {this.state.edit &&
                    <SHForm/>
                    }
                                    
                    
                </Col>
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
        this.props.form.validateFields();
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
              console.log('Received values of form: ', values);
            }
          });    };

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
            const storeNameError = isFieldTouched("storename") && getFieldError("storename");

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
            const deliveryError = isFieldTouched("delivery") && getFieldError("delivery");
            const cityError = isFieldTouched("city") && getFieldError("city");
            const addressError = isFieldTouched("address") && getFieldError("address");




        return (
            <Col span={12} offset={6}>
                <Card
                    title={
                        <h1 style={{ textAlign: "center" }}>Shop details</h1>
                    }
                >
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item
                            validateStatus={storeTypeError ? "error" : ""}
                            help={storeTypeError || ""}
                        >
                            {getFieldDecorator("storetype", {
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
                                // onChange={handleChangeCategory}
                            >
                                <Option value="Women's Fashion">
                                    Women's Fashion
                                </Option>
                                <Option key="1" value="Men's Fashion">
                                    Men's Fashion
                                </Option>
                                <Option key="2" value="Electronics and Devices">
                                    Electronics and Devices
                                </Option>
                                <Option key="3" value="Electronic Accessories">
                                    Electronic Accessories
                                </Option>
                                <Option key="4" value="TV and Home Applicances">
                                    TV and Home Applicances
                                </Option>
                                <Option key="5" value="Health and Beauty">
                                    Health and Beauty
                                </Option>
                                <Option key="6" value="Babies and Toys">
                                    Babies and Toys
                                </Option>
                                <Option key="7" value="Grocery and Pets">
                                    Grocery and Pets
                                </Option>
                                <Option key="8" value="Home and Lifestyle">
                                    Home and Lifestyle
                                </Option>
                                <Option key="9" value="Watches and Accessories">
                                    Watches and Accessories
                                </Option>
                                <Option
                                    key="10"
                                    value="Automotive and Motorbike"
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
                        validateStatus={storeNameError ? 'error' : ''}
                        help={storeNameError || ''}
                        >
                        {getFieldDecorator('storename', {
            rules: [{ required: true, message: 'Please input your Store Name' }],
          })(
            <Input
            placeholder="Store Name"
        />          )}
                           
                        </Form.Item>

                        
                        <Form.Item
                        validateStatus={openTimeError ? 'error' : ''}
                        help={openTimeError || ''}
                        >
                        {getFieldDecorator('opentime', {
            rules: [{ required: true, message: 'Store opens at' }],
          })(
            <Input
            placeholder="Store opens at"
            type="time"
        />          )}     
                        </Form.Item>

                        <Form.Item
                        validateStatus={closeTimeError ? 'error' : ''}
                        help={closeTimeError || ''}
                        >
                        {getFieldDecorator('closetime', {
            rules: [{ required: true, message: 'Store closes at' }],
          })(
            <Input
            placeholder="Store closes at"
            type="time"
        />          )}     
                        </Form.Item>

                        <Form.Item
                        validateStatus={contactError ? 'error' : ''}
                        help={contactError || ''}
                        >
                        {getFieldDecorator('contact', {
            rules: [{ required: true, message: 'Please input your Store Contact number' }],
          })(
            <Input
            placeholder="Contact"
            type="number"
        />          )}     
                        </Form.Item>

                        <Form.Item
                        validateStatus={weekendError ? 'error' : ''}
                        help={weekendError || ''}
                        >
                        {getFieldDecorator('weekend', {
            rules: [{ required: true, message: 'Store opens on weekend?' }],
          })(
            <Select
            placeholder="Opens on weekend"
        >
        <Option value={true}>Yes</Option>
        <Option value={false}>No</Option>
        </Select>          )}     
                        </Form.Item>
                        <Form.Item
                        validateStatus={cardError ? 'error' : ''}
                        help={cardError || ''}
                        >
                        {getFieldDecorator('card', {
            rules: [{ required: true, message: 'Store accepts credit card?' }],
          })(
            <Select
            placeholder="Store accepts credit card?"
        >
        <Option value={true}>Yes</Option>
        <Option value={false}>No</Option>
        </Select>          )}     
                        </Form.Item>

                        <Form.Item
                        validateStatus={wifiError ? 'error' : ''}
                        help={wifiError || ''}
                        >
                        {getFieldDecorator('wifi', {
            rules: [{ required: true, message: 'Store has wifi?' }],
          })(
            <Select
            placeholder="Store has wifi?"
        >
        <Option value={true}>Yes</Option>
        <Option value={false}>No</Option>
        </Select>          )}     
                        </Form.Item>

                        <Form.Item
                        validateStatus={deliveryError ? 'error' : ''}
                        help={deliveryError || ''}
                        >
                        {getFieldDecorator('wifi', {
            rules: [{ required: true, message: 'Store provides Delivery?' }],
          })(
            <Select
            placeholder="Store provides Delivery?"
        >
        <Option value={true}>Yes</Option>
        <Option value={false}>No</Option>
        </Select>          )}     
                        </Form.Item>

                        
                        <Form.Item
                        validateStatus={cityError ? 'error' : ''}
                        help={cityError || ''}
                        >
                        {getFieldDecorator('city', {
            rules: [{ required: true, message: 'Store city' }],
          })(
            <Select
            placeholder="Store cityprovides Delivery?"
        >
        <Option value="Lahore">Lahore</Option>
        <Option value="Islamabad">Islamabad</Option>
        </Select>          )}     
                        </Form.Item>

                        
                       

                        <Form.Item
                         validateStatus={addressError ? 'error' : ''}
                         help={addressError || ''}
                        >
                            
                            {getFieldDecorator('address', {
            rules: [{ required: true, message: 'Store address' }],
          })(
            <Input
            placeholder="Store address"
        />
                  )}    
                        </Form.Item>
                        

                        <Form.Item>
                            {" "}
                            <div style={{ marginLeft: "90%", marginTop: "2%" }}>
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
                </Card>
            </Col>
        );
    }
}

const SHForm = Form.create({ name: "Shop_Form" })(ShopForm);

export default Shop;
