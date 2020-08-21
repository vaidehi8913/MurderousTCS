import React, { Component } from "react";

class ExtrasBar extends Component {

    render () {
        var extrasBarStyle = {
            backgroundColor: "#ffadcf",
            width: this.props.width,
            height: 100
        };

        return(
            <div style={extrasBarStyle} />
        );
    }
}

export default ExtrasBar;