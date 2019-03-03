import React, { Component } from "react";
import { Row, Col, Card, Avatar, Rate } from "antd";
import axios from 'axios';
class UserReviews extends Component {
  state = {
    Review: [
      // {
      //   username: "John",
      //   time: "12/12/12",
      //   description: "this is not a good store",
      //   rating: 1
      // },
      // {
      //   username: "John",
      //   time: "12/12/12",
      //   description: "this is not a good store",
      //   rating: 2
      // }
    ]   
  };

// componentDidMount(){
// axios.get('/api/')
// }  

  render() {
    return (
      <div style={{ maxWidth: "80%" }}>
        <Col span={16} offset={6}>
          <h1 style={{ textAlign: "center" }}>
            What Users think about your store
          </h1>
          {this.state.Review.map(element => (
            <div style={{ padding: "3%" }}>
              <Card
                title={
                  <div>
                    {" "}
                    <Avatar size={64} icon="user" />
                    <span style={{marginLeft:'1%'}}>{element.user_id}</span>
                  </div>
                }
                extra={<Rate disabled defaultValue={element.rating} />}
              >
                {element.description}
              </Card>
            </div>
          ))}
        </Col>
      </div>
    );
  }
}

export default UserReviews;
