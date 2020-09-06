import React, { Component } from "react";
import * as Constants from "Constants";

class Tiger extends Component {
    constructor(props) {
        super(props);

        this.state = {
            top: 0
        };

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        this.setState({
            top: this.state.top + 100
        });
    }

    render() {
        var extraComponentStyle = {
            backgroundColor: (Constants.DEBUG > 2) ? "#e895de" : "none",
            //width: "100%", // does not account for margins :(
            marginTop: Constants.CONTENT_MARGIN,
            marginLeft: Constants.CONTENT_MARGIN,
            marginRight: Constants.CONTENT_MARGIN,
            fontSize: 48,
            position: "relative",
            top: this.state.top
        }



        return(
            <div style={extraComponentStyle} onClick={this.onClick}>
                {this.props.name}
            </div>
        );
    }
}

class Antelope extends Component {
    constructor(props) {
        super(props);

        this.state = {
            top: 0
        };

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        this.setState({
            top: this.state.top + 100
        });
    }

    render() {
        var extraComponentStyle = {
            backgroundColor: (Constants.DEBUG > 2) ? "#e895de" : "none",
            //width: "100%", // does not account for margins :(
            marginTop: Constants.CONTENT_MARGIN,
            marginLeft: Constants.CONTENT_MARGIN,
            marginRight: Constants.CONTENT_MARGIN,
            fontSize: 48,
            position: "relative",
            top: this.state.top
        }



        return(
            <div style={extraComponentStyle} onClick={this.onClick}>
                {this.props.name}
            </div>
        );
    }
}

/*
    PROPS
    width
*/
class ExtrasBar extends Component {
    render() {
        var extrasBarStyle = {
            backgroundColor: (Constants.DEBUG > 1) ? "#ffccf9" : "none",
            width: this.props.width,
            //height: 200
        };

        return(
            <div style={extrasBarStyle}>
                <Tiger name={"Daniel"}/>
                <Antelope name={"Aretha"}/>
            </div>
        );
    }
}

export default ExtrasBar;