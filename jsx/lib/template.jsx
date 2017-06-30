import React from "react";
import { Input, Button, Row, Col } from "antd";

export default class Template extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      output: ""
    };
  }

  handleInputChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  handleOutputChange = e => {
    this.setState({
      output: e.target.value
    });
  };

  handleStartClick = e => {
    console.log("start the web socket.");
    var ws = new WebSocket("ws://127.0.0.1:8080/websocket");

    ws.onopen = () => {
      ws.send("ping");
      this.setState(prev => ({
        output: prev.output + "\n" + "first message sent"
      }));
    };

    this.state.ws.onmessage = evt => {
      var text = this.state.text;
      this.setState(prev => ({
        output: prev.output + "\n" + text
      }));
    };
    this.state.ws.onclose = () => {
      this.setState(prev => ({
        output: prev.output + "\n" + "Connection closed..."
      }));
    };
  };

  render() {
    return (
      <div>
        <Row>
          <Col>
            <Input value={this.state.text} onChange={this.handleInputChange} />
          </Col>
          <Col>
            <Button onClick={this.handleStartClick}>Start</Button>
          </Col>
          <Col>
            <Button onClick={this.handleSendClick}>Send</Button>
          </Col>
          <Col>
            <Input
              type="textarea"
              value={this.state.output}
              onChange={this.handleOutputChange}
              rows={100}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
