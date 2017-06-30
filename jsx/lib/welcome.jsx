import React from "react";
import { Row, Col, Input, Button } from "antd";
import $ from "jquery";

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ""
    };
  }

  handleUserNameChange = e => {
    this.setState({
      username: e.target.value
    });
  };

  handleEnterClick = e => {
    console.log("click enter:", e.target.value);
    var url = "/join";
    $.ajax({
      url: url,
      dataType: "json",
      type: "POST",
      cache: false,
      async: false,
      data: {
        uname: this.state.username,
        tech: "websocket"
      },
      success: data => {
        console.log("enter the chatroom:", data);
      },
      error: (xhr, status, err) => {
        console.error(url, status, err.toString());
      }
    });
  };

  render() {
    return (
      <Row>
        <Col>
          <form action="/join" method="POST">
            <Input
              value={this.state.username}
              onChange={this.handleUserNameChange}
              name="uname"
            />
            <Button htmlType="submit">Enter</Button>
          </form>
        </Col>
        <Col />
      </Row>
    );
  }
}
