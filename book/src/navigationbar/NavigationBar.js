import React, { Component } from "react";
import * as Constants from "Constants";

class NavigationBar extends Component {

    render () {
        var navBarStyle = {
            backgroundColor: (Constants.DEBUG > 0) ? "#fff5a8" : "none",
            width: this.props.width,
            height: 100
        };

        return(
            <div style={navBarStyle} />
        );
    }
}

export default NavigationBar;