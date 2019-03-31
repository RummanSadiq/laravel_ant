import React, { Component } from "react";
import logo from "../react_images/logo.png";
import { NavLink } from "react-router-dom";
import { Layout, Icon, Menu, Divider, Row, Col } from "antd";
import Axios from "axios";
const {  Sider } = Layout;

const SubMenu = Menu.SubMenu;

class Sidemenu extends Component {
    state = {
        collapsed: false
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
            <Row style={{ position: "absolute" }}>
                <Col span={8} style={{ minHeight: "50%" }}>
                    <Sider
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this.onCollapse}
                        theme="dark"
                    >
                        <Menu theme="dark" mode="inline">
                            <div className="logo">
                                <img
                                    src={logo}
                                    alt="Shopx"
                                    style={{ width: 180 }}
                                />
                            </div>
                            <Divider />
                            <Menu.Item key="1" style={{ fontSize: "22px"}}>
                                <NavLink to="/shop">
                                   
                                 <Icon
                                        type="shop"
                                        theme="filled"
                                        style={{ fontSize: "100%", color:'white' }}
                                    />
                               <span style={{ color:'white' }}>      Shop</span>
                                </NavLink>
                            </Menu.Item>

                            <Divider />
                            <Menu.Item key="2" style={{ fontSize: "22px" }}>
                                <NavLink to="/Messages">
                                  <Icon
                                        type="message"
                                        theme="filled"
                                        style={{ fontSize: "100%", color:'white' }}
                                    />
                                <span style={{ color:'white' }}>      Messages</span>
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
                                            style={{ fontSize: "100%", color:'white' }}
                                        />
                                 <span style={{color:'white' }}>        Products</span>
                                    </span>
                                }
                            >
                                <Divider />
                                <Menu.Item key="3" style={{ fontSize: "20px" }}>
                                    <NavLink to="/Add">
                                        {" "}
                                        <Icon
                                            type="file-add"
                                            theme="filled"
                                            style={{ fontSize: "80%", color:'white' }}
                                        />
                                   <span style={{fontSize: "22px",color:'white' }}>     Add Product</span>
                                    </NavLink>
                                </Menu.Item>
                                <Divider />

                                <Menu.Item key="4" style={{ fontSize: "20px" }}>
                                    <NavLink to="/ViewProduct">
                                        <Icon
                                            type="table"
                                            style={{ fontSize: "80%", color:'white' }}
                                        />
                                   <span style={{ color:'white' }}>     View Products</span>
                                    </NavLink>
                                </Menu.Item>
                            </SubMenu>
                            <Divider />
                            <Menu.Item key="5" style={{ fontSize: "22px" }}>
                                <NavLink to="/Reviews">
                                    <Icon
                                        type="star"
                                        theme="filled"
                                        style={{ fontSize: "100%", color:'white' }}
                                    />
                                    <span style={{ color:'white' }}>Reviews</span>
                                </NavLink>
                            </Menu.Item>
                            <Divider />
                            <Menu.Item key="6" style={{ fontSize: "22px" }}>
                                <NavLink to="/FAQs">
                                    <Icon
                                        type="question"
                                        style={{ fontSize: "100%", color:'white' }}
                                    />
                                    <span style={{ color:'white' }}>FAQ'S</span>
                                </NavLink>
                            </Menu.Item>
                            <Divider />
                            <Menu.Item key="7" style={{ fontSize: "22px" }}>
                                <NavLink to="/Posts">
                                    <Icon
                                        type="layout"
                                        theme="filled"
                                        style={{ fontSize: "100%", color:'white' }}
                                    />
                                    <span style={{ color:'white' }}>Posts</span>
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
                                    <span style={{ color: "red" }}>Logout</span>
                                </NavLink>
                            </Menu.Item>
                            <Divider />
                            <Menu.Item >
                                
                            </Menu.Item>
                            <Divider />
                        </Menu>
                    </Sider>
                </Col>
            </Row>
        );
    }
}

export default Sidemenu;
