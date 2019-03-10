import React, { Component } from "react";
import "./App.css";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "antd/dist/antd";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Chat from "./Components/Chat";
import Sidemenu from "./Components/Sidemenu";
import Faqs from "./Components/FAQs";
import Posts from "./Components/Posts";
import UserReviews from "./Components/UserReviews";
import AddProduct from "./Components/Add Product";
import ViewProducts from "./Components/View Products";
import Shop from "./Components/Shop";
class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    {/* <Sidemenu /> */}
                    <Route path="" component={Sidemenu} />
                    <Route exact path="" component={Shop} />

                    {/* <Route path="" component={Shop} /> */}
                    <Route path="/Messages" component={Chat} />
                    <Route path="/Faqs" component={Faqs} />
                    <Route path="/Reviews" component={UserReviews} />
                    <Route path="/Posts" component={Posts} />
                    <Route path="/Add" component={AddProduct} />
                    <Route path="/ViewProduct" component={ViewProducts} />
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
        );
    }
}

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
