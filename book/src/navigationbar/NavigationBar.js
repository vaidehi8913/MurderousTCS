import React, { Component } from "react";

class NavigationBar extends Component {

    render () {
        var navBarStyle = {
            backgroundColor: "#fff5a8",
            width: this.props.width,
            height: 100
        };

        return(
            <div style={navBarStyle} />
        );
    }
}

export default NavigationBar;