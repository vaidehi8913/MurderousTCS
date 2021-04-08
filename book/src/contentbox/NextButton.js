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

    this.fromNextButtonInfo = this.fromNextButtonInfo.bind(this);

  }

  fromNextButtonInfo() {
    var nextButtonInfo = this.props.contentInfo;

    var nextButtonStyle = {
      width: Constants.CONTENT_WIDTH - 7,
      height: "auto",
      backgroundColor: nextButtonInfo.bgColor,
      border: "none",
      color: nextButtonInfo.textColor,
      padding: "16px 32px",
      borderRadius: "10px"
    };

    return (
      <form action={nextButtonInfo.link}>
        <input type="submit"
          value={nextButtonInfo.text}
          style={nextButtonStyle}
        />
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