import React, { Component } from "react";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import ShopCreate from "./Components/ShopCreate";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "antd/dist/antd";
import axios from "axios";

import { BrowserRouter, Route } from "react-router-dom";

var shop;
class App extends Component {
    constructor(props) {
        super(props);
        axios
            .get("/api/users/shop")
            .then(res => {
                console.log("Shop data is", res.data);
                this.setState({ shop: res.data.shop });
            })
            .catch(err => {
                console.log("api cannot be accessed", err);
            });
    }

    state = {
        shop: 0
    };

    change = () => {
        console.log("changing the state, it must redirect");
        this.setState({ shop: 1 });
    };

    render() {
        return (
            <div>
                {this.state.shop > 0 && <Dashboard />}
                {this.state.shop < 0 && <ShopCreate lift={this.change} />}
            </div>
        );
    }
}

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
