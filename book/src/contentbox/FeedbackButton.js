import React, { Component } from "react";
import {TouchableOpacity} from "react-native";

import * as Constants from "Constants";

/*
 * This is a button that can be used to give 
 * feedback about a given element
 *
 * PROPS
 * contentInfo (so that we can log the feedback
 * 		with a reference back to the 
 * 		element)
 * index
 */
class FeedbackButton extends Component {

    constructor(props) {
	super(props);

	this.baseColor = "orange";
	this.hoverColor = "red";

	this.state = {
	    color : "orange"
	};

	this.onMouseEnter = this.onMouseEnter.bind(this);
	this.onMouseLeave = this.onMouseLeave.bind(this);
	this.onClick = this.onClick.bind(this);
    }

    onMouseEnter() {
	this.setState({
	    color: this.hoverColor
	});
    }

    onMouseLeave() {
	this.setState({
	    color: this.baseColor
	});
    }

    onClick() {
	console.log("Feedback button " + this.props.index + " clicked");
    }

    render() {
	
        var feedbackButtonStyle = {
	    width: Constants.FEEDBACK_BUTTON_WIDTH,
	    height: Constants.FEEDBACK_BUTTON_WIDTH,
	    justifyContent: "center",
	    alignItems: "center",
	    padding: 10,
	    borderRadius: 100,
	    backgroundColor: this.state.color
	};

	return(
	    <TouchableOpacity style={feedbackButtonStyle}
			      onPress={this.onClick}
			      onMouseEnter={this.onMouseEnter}
			      onMouseLeave={this.onMouseLeave}/>
	);
    }
}

export default FeedbackButton;
