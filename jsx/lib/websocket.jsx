import React from "react";
import { Row, Col, Input, Button } from "antd";
import $ from "jquery";
import URL from "url";

// var socket; //= new WebSocket('ws://'+ window.location.host + "/ws/join?uname=" + URL.parse(window.location.href, true).query.uname);

export default class WebSocketPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }

  handleMessageChange = e => {
    this.setState({
      message: e.target.value
    });
  };
  handleSendClick = e => {
    console.log("send the message using web socket.");
    console.log(this.connection);
    this.connection.send(this.state.message);
    console.log("click send:", this.state.message);
  };

  componentDidMount() {
    console.log("web socket:", this.connection);
    var p = URL.parse(window.location.href, true);
    var uname = p.query.uname;
    var wsurl = "ws://" + window.location.host + "/ws/join?uname=" + uname;
    console.log("web socket url:", wsurl);
    this.connection = new WebSocket(wsurl);
    console.log("new socket connection:", this.connection);

    this.connection.onopen = () => {
      console.log("open the web socket.");
    };

    this.connection.onmessage = event => {
      var data = JSON.parse(event.data);
      console.log("message:", data);
      switch (data.Type) {
        case 0:
          if (data.User == uname) {
            console.log("you joined the chat room.");
          } else {
            console.log(uname + " joined the char room.");
          }
        case 1:
          console.log(data.User + " left the chat room");
        case 2:
          console.log(data.User + " message:" + data.Content);
      }
    };
  }

  render() {
    return (
      <Row>
        <Col>
          <Input
            value={this.state.message}
            onChange={this.handleMessageChange}
          />
        </Col>
        <Col>
          <Button onClick={this.handleSendClick}>Send</Button>
        </Col>
      </Row>
    );
  }
}
