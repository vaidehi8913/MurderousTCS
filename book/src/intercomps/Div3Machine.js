import React, { Component } from "react";
import * as Constants from "Constants";

import "intercomps/Div3Machine.css";
import 'fontawesome/css/all.css';

/*

  PROPS

*/
class Div3Machine extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      number: 0,
      numberIsFinal: false
    };

    this.newDigit = this.newDigit.bind(this);
    this.deleteDigit = this.deleteDigit.bind(this);
    this.enterNumber = this.enterNumber.bind(this);
    this.keyboardDigit = this.keyboardDigit.bind(this);

    this.enterButton = null;
  }

  newDigit(i) {
    if (this.state.numberIsFinal) {
      this.setState({
        number: i,
        numberIsFinal: false
      });
    } else {
      this.setState({
        number: (this.state.number * 10) + i
      });
    }

    this.enterButton.focus();
  }

  deleteDigit() {
    if (this.state.numberIsFinal) {

      this.setState({
        numberIsFinal: false,
        number: 0
      });

    } else {
      var m = this.state.number % 10;
      var r = (this.state.number - m) / 10;

      this.setState({
        number: r
      });
    }

    this.enterButton.focus();
  }

  enterNumber() {
    this.setState({
      numberIsFinal: true
    });

  }

  keyboardDigit(e) {
    if (e.key == '1') {
      this.newDigit(1);
    } else if (e.key == '2') {
      this.newDigit(2);
    } else if (e.key == '3') {
      this.newDigit(3);
    } else if (e.key == '4') {
      this.newDigit(4);
    } else if (e.key == '5') {
      this.newDigit(5);
    } else if (e.key == '6') {
      this.newDigit(6);
    } else if (e.key == '7') {
      this.newDigit(7);
    } else if (e.key == '8') {
      this.newDigit(8);
    } else if (e.key == '9') {
      this.newDigit(9);
    } else if (e.key == '0') {
      this.newDigit(0);
    } else if (e.key == 'p') {
      this.enterNumber();
    } else if (e.key == 'Backspace') {
      this.deleteDigit();
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.keyboardDigit);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyboardDigit);
  }

  render() {
    var displayStyle = {
      height: 15,
      width: 360,
      marginLeft: 50,
      textAlign: "right",
      fontFamily: "monospace",
      fontSize: "4.5em",
      padding: 20,
    };

    var display =
      <div style={displayStyle} >
        {this.state.number}
      </div>;

    var buttonStyle = {
      fontSize: "2.75em",
      textAlign: "center",
      width: 75,
      height: 50,
      fontFamily: "sans-serif",
      color: "#FFF",
      backgroundColor: "#454545",
      fontWeight: "bold",
      lineHeight: "3px",
    };

    var tableStyle = {
      width: 400,
      height: 200
    };

    var keypad = <table style={tableStyle} className="keypad">
      <tr>
        <td><button onClick={() => { this.newDigit(1) }} style={buttonStyle}> 1 </button></td>
        <td><button onClick={() => { this.newDigit(2) }} style={buttonStyle}> 2 </button></td>
        <td><button onClick={() => { this.newDigit(3) }} style={buttonStyle}> 3 </button></td>
      </tr>
      <tr>
        <td><button onClick={() => { this.newDigit(4) }} style={buttonStyle}> 4 </button></td>
        <td><button onClick={() => { this.newDigit(5) }} style={buttonStyle}> 5 </button></td>
        <td><button onClick={() => { this.newDigit(6) }} style={buttonStyle}> 6 </button></td>
      </tr>
      <tr>
        <td><button onClick={() => { this.newDigit(7) }} style={buttonStyle}> 7 </button></td>
        <td><button onClick={() => { this.newDigit(8) }} style={buttonStyle}> 8 </button></td>
        <td><button onClick={() => { this.newDigit(9) }} style={buttonStyle}> 9 </button></td>
      </tr>
      <tr>
        <td><button onClick={this.deleteDigit} style={buttonStyle}> <i className="icon" className="fas fa-backspace" ></i> </button></td>
        <td><button onClick={() => { this.newDigit(0) }} style={buttonStyle}> 0 </button></td>
        <td><button onClick={this.enterNumber} style={buttonStyle} ref={x => this.enterButton = x}> <i className="icon" className="fas fa-arrow-circle-right"></i> </button></td>
      </tr>
    </table>;

    var baseImgFilePath;

    if (this.state.numberIsFinal) {
      if (this.state.number % 3 == 0) {
        baseImgFilePath = "div3machine/yes.png";
      } else {
        baseImgFilePath = "div3machine/no.png";
      }
    } else {
      baseImgFilePath = "div3machine/off.png";
    }

    var baseImgSrc = require("images/" + baseImgFilePath);
    var base = <img src={baseImgSrc} alt="div3 Machine Base" />;

    return (
      <div className="machineDiv">
        <div className="dsply">{display}</div>
        <div className="kypd">{keypad}</div>
        <div className="baseDiv">{base}</div>
      </div>
    );
  }
}

export default Div3Machine;
