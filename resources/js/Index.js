import React, { Component } from "react";
import "./App.css";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "antd/dist/antd";
import { BrowserRouter, Route } from "react-router-dom";
import Chat from "./Components/Chat";
import Sidemenu from "./Components/Sidemenu";
import Faqs from "./Components/FAQs";
import Posts from "./Components/Posts";
import UserReviews from "./Components/UserReviews";
import AddProduct from "./Components/Add Product";
import EPForm from "./Components/EditProduct";
import ViewProducts from "./Components/View Products";
import background from "./react_images/background.jpg";

import Shop from "./Components/Shop";
class Index extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Route path="" component={Sidemenu} />
                        <Route exact path="" component={Shop} />
                        <Route path="/Messages" component={Chat} />
                        <Route path="/Faqs" component={Faqs} />
                        <Route path="/Reviews" component={UserReviews} />
                        <Route path="/Posts" component={Posts} />
                        <Route path="/Add" component={AddProduct} />
                        <Route path="/ViewProduct" component={ViewProducts} />
                        <Route path="/Edit" component={EPForm} />
                        <Route path="/Shop" component={Shop} />
                        <Route
                            path="/logout"
                            component={() => {
                                window.location.href = "/logout";
                                return null;
                            }}
                        />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default Index;
