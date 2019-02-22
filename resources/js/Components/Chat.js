import React, { Component } from "react";
import {
  Layout,
  Row,
  Col,
  Card,
  Input,
  Avatar,
  Button,
  List,
  message,
  Spin
} from "antd";

const { TextArea } = Input;
const { Header, Content } = Layout;

class Chat extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
  state = {
      newreply:'',
    conversations: [
      { username: "Ahmad", lastmessage: "my Last message" },
      { username: "Umer", lastmessage: "This ismy last Message" }
    ],
    chat: [
      {
        message: "Hey I wanted to ask you something",
        reply: "yeah sure?",
        time: "10:00 am",
        date: "24/01/2019"
      },
      {
        message: "Never Mind, got it",
        reply: "anytime",
        time: "10:00 am",
        date: "24/01/2019"
      },
      {
        message: "yeh",
        reply: "okay",
        time: "10:00 am",
        date: "24/01/2019"
      },
      {
        message: "yeh",
        reply: "okay",
        time: "10:00 am",
        date: "24/01/2019"
      },
      {
        message: "yeh",
        reply: "okay",
        time: "10:00 am",
        date: "24/01/2019"
      },
      {
        message: "yeh",
        reply: "okay",
        time: "10:00 am",
        date: "24/01/2019"
      }
    ]
  };

  handleChange = (event)=>{
    this.setState({ newreply: event.target.value });
    this.inputreply = event.target.value;
  }

  handleSubmit(event) {
      var myreply= this.state.newreply;
      var today = new Date();
    var tdate = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear() ;
    var ttime= today.toLocaleTimeString();

    var str = { message:"", reply: myreply, time:ttime, date:tdate};
    this.state.chat.push(str);
    this.setState({ chat: this.state.chat });
    event.preventDefault();
  }

  render() {
    return (

        <div>
          <Header style={{ backgroundColor: "#f5f5f5" }}>
            <div style={{ textAlign: "center" }}>
              <h1>Customer Queries</h1>
            </div>
          </Header>
          <Row style={{position:"inherit"}}>
            <Col span={4} offset={4}>
              <Card title="Messages" bordered={false}>
                {/* <div style={{ borderBottom: "2px solid" }}>
                  <div style={{ fontWeight: "bold", fontSize: "24px" }}>
                    <Avatar size="large" icon="user" />
                    <span>Username</span>
                  </div>
                  <div style={{ fontSize: "20px" }}>Last Message</div>
                </div> */}

                <List
                  itemLayout="horizontal"
                  dataSource={this.state.conversations}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            size="large"
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                          />
                        }
                        title={<a href="#">{item.username}</a>}
                        description={item.lastmessage}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card
                title="Username"
                bordered={true}
                style={{
                  marginLeft: "10dp",
                  width: "100%",
                }}
              >
                <div 
                style={{height:'700px', overflow:'auto'}}
                >
                  {this.state.chat.map(element => (
                    <div>
                      {element.message && (
                        <div
                          style={{
                            float: "left",
                            backgroundColor: " #d9d9d9",
                            width: "70%",
                            padding: "1%",
                            borderRadius: "2%",
                            margin: "1%"
                          }}
                        >
                          {element.message}
                          <div style={{ marginLeft: "75%" }}>
                            {element.date + " " + element.time}
                          </div>
                        </div>
                      )}

                      {element.reply && (
                        <div
                          style={{
                            float: "right",
                            backgroundColor: "#3366ff",
                            width: "70%",
                            padding: "1%",
                            borderRadius: "2%",
                            marginLeft: "100%",
                            marginRight: "0px",
                            color: "#ffffff",
                            margin: "1%"
                          }}
                        >
                          {element.reply}
                          <div style={{ marginLeft: "75%" }}>
                            {element.date + " " + element.time}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
              <div
                  style={{
                    position: "relative",
                    bottom: "2%",
                    width: "100%",
                    display: "inline-block"
                  }}
                >
                  <TextArea
                    rows={1}
                    placeholder="Enter your reply"
                    block="false"
                    onChange={this.handleChange}
                    value={this.state.newreply}
                    style={{
                      borderTop: "0px",
                      borderLeft: "0px",
                      borderRight: "0px",
                      width: "80%",
                      float: "left"
                    }}
                  />
                  <Button
                    type="primary"
                    shape="circle"
                    icon="check"
                    size="large"
                    style={{ float: "left" }}
                    onClick={this.handleSubmit}
                  />
                </div>
            </Col>
          </Row>
        </div>
    );
  }
}

export default Chat;
