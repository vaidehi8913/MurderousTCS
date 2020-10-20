import React, { Component } from "react";
import * as Constants from "Constants";
import ExtraList from "contentbox/ExtraList";

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

class Tortoise extends Component {
    render () {
        var extraComponentStyle = {
            backgroundColor: (Constants.DEBUG > 2) ? "#e895de" : "none",
            //width: "100%", // does not account for margins :(
            marginTop: Constants.CONTENT_MARGIN,
            marginLeft: Constants.CONTENT_MARGIN,
            marginRight: Constants.CONTENT_MARGIN,
            fontSize: 48
        }

        return(
            <div style={extraComponentStyle}>
                {this.props.name}
            </div>
        );
    }
}


/*
    The actual divs that render the list of extras are in the ExtraList
    file.  This container only takes care of positioning the top.

    PROPS
    singleExtraToRender
    extrasWidth
*/
class FloatingExtra extends Component {

    render() {
        const floatingExtraStyle = {
            backgroundColor: (Constants.DEBUG > 2) ? "#e895de" : "none",
            //width: "100%", // does not account for margins :(
            marginTop: Constants.CONTENT_MARGIN,
            marginLeft: Constants.CONTENT_MARGIN,
            marginRight: Constants.CONTENT_MARGIN,
            position: "relative",
            top: this.props.singleExtraToRender.top
        }

        return(
            <div style={floatingExtraStyle}>
                <ExtraList extraListInfo={this.props.singleExtraToRender.extraList}
                           extrasWidth={this.props.extrasWidth} />
            </div>
        );
    }
}

/*
    PROPS
    width
    //height

    extrasToRender
*/
class ExtrasBar extends Component {

    constructor(props) {
        super(props);

        this.createSingleExtraListComponent = this.createSingleExtraListComponent.bind(this);
        
        const extrasBarStyle = {
            backgroundColor: (Constants.DEBUG > 1) ? "#d43162" : "none",
            width: this.props.width
        };
    }

    createSingleExtraListComponent(singleExtraToRender) {
        return (
            <FloatingExtra singleExtraToRender={singleExtraToRender}
                           extrasWidth={this.props.width}/>
        );
    }

    render() {
        var extrasBarStyle = {
            backgroundColor: (Constants.DEBUG > 1) ? "#e3acbd" : "none",
            width: this.props.width,
            height: 0
        };

        if (Constants.DEBUG > 2) {
            console.log("rendering extras: " + this.props.extrasToRender);
        }

        var extraComponents = (this.props.extrasToRender).map(this.createSingleExtraListComponent);

        return(
            <div style={extrasBarStyle}>
                {/*<Tiger name={"Aretha"} />
                <Antelope name={"Daniel"} />
                <Tortoise name={"Stephan"}/>*/}
                {extraComponents}
            </div>
        );
    }
}

export default ExtrasBar;