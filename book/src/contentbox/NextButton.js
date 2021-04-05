import React, { Component } from "react";
import * as Constants from "Constants";
import 'fontawesome/css/all.css';

/* Formatting for the chapter heading

    PROPS
    headingInfo: a JSON object with heading information
    parentWidth: width of the parent component (content box)
*/
class NextButton extends Component {
  constructor(props) {
    super(props);

    this.nextButtonStyle = {
      width: Constants.CONTENT_WIDTH,
      height: "auto",
      backgroundColor: "#70C08B",
      border: "none",
      color: "white",
      padding: "16px 32px"
    };

    this.fromNextButtonInfo = this.fromNextButtonInfo.bind(this);

  }

  fromNextButtonInfo() {
    // var nextButtonInfo = this.props.navImageElementInfo;
    // var link = nextButtonInfo.link;

    var text = <i className="icon" className="fas fa-backspace" ></i>;

    return (
      <form action={"/#/chapter2"}>
        <input type="submit"
          value="-->"
          style={this.nextButtonStyle} />
      </form>
    );
  }

  render() {

    return (
      <div>
        {this.fromNextButtonInfo()}
      </div>

    );
  }
}

export default NextButton;