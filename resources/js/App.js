import React, { Component } from "react";
import "./App.css";
import Index from "./Index.js";
import ShopCreate from "./ShopCreate.js";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "antd/dist/antd";
import axios from "axios";

import { BrowserRouter, Route } from "react-router-dom";

var shop;
class App extends Component {
    constructor() {
        axios.get("/api/users/shop").then(res => {
            console.log(res.data);
            shop = res.data.shop;
        });
    }

    render() {
        return (
            <div>
                {shop && <Index />}
                {!shop && <ShopCreate />}
            </div>
        );
    }
}

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
