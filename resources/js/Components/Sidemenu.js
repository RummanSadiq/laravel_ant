import React, { Component } from "react";
import logo from "../react_images/logo.png";
import { NavLink } from "react-router-dom";
import { Layout, Icon, Menu, Divider, Row, Col, Affix } from "antd";
import Axios from "axios";
const { Sider } = Layout;

const SubMenu = Menu.SubMenu;

class Sidemenu extends Component {
    state = {
        collapsed: true
    };

    logout() {
        Axios.get("/api/logout").then(res => {
            console.log(res);
            console.log(res.data);
        });
    }

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        return (
            <Affix offsetTop={0} style={{ backgroundColor: "white" }}>
                <Row style={{ position: "absolute" }}>
                    <Col xl={8} lg={8} sm={4} xs={4} md={6} style={{ minHeight: "50vh" }}>
                        <Sider
                            collapsible
                            collapsed={this.state.collapsed}
                            onCollapse={this.onCollapse}
                            theme="light"
                        >
                            <Menu theme="light" mode="inline">
                                <div className="logo">
                                    <img
                                        src={logo}
                                        alt="Shopx"
                                        width='100'
                                        height='100'
                                    />
                                </div>
                                <Divider />
                                <Menu.Item key="1" style={{ fontSize: "22px" }}>
                                    <NavLink to="/shop">
                                        <Icon
                                            type="shop"
                                            theme="filled"
                                            style={{ fontSize: "100%" }}
                                        />
                                        <span>Shop</span>
                                    </NavLink>
                                </Menu.Item>

                                <Divider />
                                <Menu.Item key="2" style={{ fontSize: "22px" }}>
                                    <NavLink to="/Messages">
                                        <Icon
                                            type="message"
                                            theme="filled"
                                            style={{ fontSizse: "100%" }}
                                        />
                                        <span>Messages</span>
                                    </NavLink>
                                </Menu.Item>
                                <Divider />
                                <SubMenu
                                    key="products"
                                    title={
                                        <span style={{ fontSize: "22px" }}>
                                            <Icon
                                                type="database"
                                                theme="filled"
                                                style={{ fontSize: "100%" }}
                                            />
                                            <span>Products</span>
                                        </span>
                                    }
                                >
                                    
                                    <Menu.Item
                                        key="3"
                                        style={{ fontSize: "20px" }}
                                    >
                                        <NavLink to="/Add">
                                            {" "}
                                            <Icon
                                                type="file-add"
                                                theme="filled"
                                                style={{ fontSize: "80%" }}
                                            />
                                            <span>Add Product</span>
                                        </NavLink>
                                    </Menu.Item>
                                    <Divider />

                                    <Menu.Item
                                        key="4"
                                        style={{ fontSize: "20px" }}
                                    >
                                        <NavLink to="/ViewProduct">
                                            <Icon
                                                type="table"
                                                style={{ fontSize: "80%" }}
                                            />
                                            <span>View Products</span>
                                        </NavLink>
                                    </Menu.Item>
                                </SubMenu>
                                <Divider />
                                <Menu.Item key="5" style={{ fontSize: "22px" }}>
                                    <NavLink to="/Reviews">
                                        <Icon
                                            type="star"
                                            theme="filled"
                                            style={{ fontSize: "100%" }}
                                        />
                                        <span>Reviews</span>
                                    </NavLink>
                                </Menu.Item>
                                <Divider />
                                <Menu.Item key="6" style={{ fontSize: "22px" }}>
                                    <NavLink to="/FAQs">
                                        <Icon
                                            type="question"
                                            style={{ fontSize: "100%" }}
                                        />
                                        <span>FAQ'S</span>
                                    </NavLink>
                                </Menu.Item>
                                <Divider />
                                <Menu.Item key="7" style={{ fontSize: "22px" }}>
                                    <NavLink to="/Posts">
                                        <Icon
                                            type="layout"
                                            theme="filled"
                                            style={{ fontSize: "100%" }}
                                        />
                                        <span>Posts</span>
                                    </NavLink>
                                </Menu.Item>
                                <Divider />
                                <Menu.Item key="8" style={{ fontSize: "22px" }}>
                                    <NavLink to="/logout">
                                        <Icon
                                            type="logout"
                                            style={{
                                                fontSize: "100%",
                                                color: "red"
                                            }}
                                        />
                                        <span style={{ color: "red" }}>
                                            Logout
                                        </span>
                                    </NavLink>
                                </Menu.Item>
                                <Divider />

                                <Menu.Item />
                                <Divider />
                            </Menu>
                        </Sider>
                    </Col>
                </Row>
            </Affix>
        );
    }
}

export default Sidemenu;
