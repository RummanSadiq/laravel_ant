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
        axios.get("/api/myshop").then(res => {
            console.log('Shop data is',res.data);
            // this.setState({shop:res.data});
            this.state.shop = res.data;
        }).catch(err=>{
            console.log('api cannot be accessed', err);
        });
    }
    componentWillMount(){
        
    }

    state={
        shop:{}
    }

    render() {
        return (
            <div>
                {this.state.shop && <Dashboard />}
                {!this.state.shop && <ShopCreate />}
            </div>
        );
    }
}

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
