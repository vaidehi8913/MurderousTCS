import React, { Component } from "react";
import * as Constants from "Constants";

class ExtrasBar extends Component {

    render () {
        var extrasBarStyle = {
            backgroundColor: (Constants.DEBUG > 0) ? "#ffadcf" : "none",
            width: this.props.width,
            height: 100
        };

        return(
            <div style={extrasBarStyle} />
        );
    }
}

export default ExtrasBar;