import React, { Component } from "react";

class ContentBox extends Component {

    render () {
        var contentBoxStyle = {
            backgroundColor: "#a8caff",
            width: this.props.width, 
            height: 100
        };

        return(
            <div style={contentBoxStyle} />
        );
    }
}

export default ContentBox;