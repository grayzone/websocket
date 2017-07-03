import React from "react";
import { Row, Col, Input, Button, Timeline } from "antd";
import $ from "jquery";
import URL from "url";

// var socket; //= new WebSocket('ws://'+ window.location.host + "/ws/join?uname=" + URL.parse(window.location.href, true).query.uname);

class ChatLine extends React.Component {
  render() {
    const chatMsg = [];
    for (let i = 0; i < this.props.data.length; i++) {
      var msg = this.props.data[i];
      var l = <Timeline.Item>{msg}</Timeline.Item>;
      chatMsg.push(l);
    }
    return (
      <Timeline>
        {chatMsg}
      </Timeline>
    );
  }
}

export default class WebSocketPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      list: []
    };
  }
  handleMessageChange = e => {
    this.setState({
      message: e.target.value
    });
  };
  handleSendClick = e => {
    console.log("send the message using web socket.");
    //    console.log(this.connection);
    this.connection.send(this.state.message);
    console.log("click send:", this.state.message);
  };

  componentDidMount() {
    //    console.log("web socket:", this.connection);
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
      var msg;
      switch (data.Type) {
        case 0:
          if (data.User == uname) {
            msg = "you joined the chat room.";
          } else {
            msg = uname + " joined the char room.";
          }
          break;
        case 1:
          msg = data.User + " left the chat room";
          break;
        case 2:
          msg = data.User + " message:" + data.Content;
          break;
      }
      console.log(msg);
      this.setState(prev => ({
        list: prev.list.concat(msg)
      }));
      console.log(this.state.list);
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
        <Col>
        <ChatLine data={this.state.list} />
        </Col>
      </Row>
    );
  }
}
