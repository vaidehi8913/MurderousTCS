import React, { Component } from "react";
import {TouchableOpacity} from "react-native";
import { Popover, ArrowContainer } from "react-tiny-popover";

import * as Constants from "Constants";

/*
 * PROPS
 * contentIdentifier
 * index
 */
class FeedbackForm extends Component {
    constructor(props) {
	super(props);

        this.state = {
	    email: "",
	    comment: ""
	};

	this.handleSubmit = this.handleSubmit.bind(this);
	this.handleEmailChange = this.handleEmailChange.bind(this);
	this.handleCommentChange = this.handleCommentChange.bind(this);
    }

    handleSubmit(event) {
	console.log("submitted feedback about ["
		+ this.props.contentIdentifier + ", " + this.props.index 
		+ "]: " + this.state.comment);
	this.setState({
	    email: "",
	    comment: ""
	});

	event.preventDefault();
    }


    handleEmailChange(event) {
	this.setState({
	    email: event.target.value
	});
    }

    handleCommentChange(event) {
	this.setState({
	    comment: event.target.value
	});
    }

    render() {

	var emailInputStyle = {
	    borderRadius: "4px",
	    border: "2px solid",
	    width: "90%",
	    margin: "2px",
	    padding: "5px"
	};

	var commentTextAreaStyle = {
	    borderRadius: "4px",
	    border: "2px solid",
	    width: "90%",
	    margin: "2px",
 	    padding: "5px"
	};

	var submitButtonStyle = {
	    borderRadius: "4px",
	    //backgroundColor: "blue",
	    margin: "2px"
	};

	return(
	    <form onSubmit={this.handleSubmit}>
		<input type="text"
		       style={emailInputStyle}
		       value={this.state.email}
		       onChange={this.handleEmailChange}
		       placeholder="Email (optional)"/>
		<textarea value={this.state.comment}
			  onChange={this.handleCommentChange}
			  placeholder="Comment"
		          style={commentTextAreaStyle}/>
		<input type="submit"
		       value="Submit"
		       style={submitButtonStyle}/>
	    </form>
	);
    }

}


/*
 * This is a button that can be used to give 
 * feedback about a given element
 *
 * PROPS
 * contentInfo (so that we can log the feedback
 * 		with a reference back to the 
 * 		element)
 * index
 * extrasWidth
 */
class FeedbackButton extends Component {

    constructor(props) {
	super(props);

	this.baseColor = "orange";
	this.hoverColor = "red";

	this.state = {
	    color : "orange",
	    isPopoverOpen: false
	};

	this.onMouseEnter = this.onMouseEnter.bind(this);
	this.onMouseLeave = this.onMouseLeave.bind(this);
	this.onClick = this.onClick.bind(this);
	this.onClickOutside = this.onClickOutside.bind(this);
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
	this.setState({
	    isPopoverOpen: !this.state.isPopoverOpen
	});
    }

    onClickOutside() {
	this.setState({
	    isPopoverOpen: false
	});
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

	var arrowSize = 10; // should be moved to constants

	var feedbackFormContainerStyle = {
	    width: this.props.extrasWidth - arrowSize - 10,
	    backgroundColor: Constants.FEEDBACK_FORM_BACKGROUND_COLOR,
	    borderRadius: "8px",
	    padding: "5px"
	};

	return(
	    <Popover isOpen={this.state.isPopoverOpen}
		     positions={["right"]}
		     content={<div>Hi! I am popover content.</div>} 
		     onClickOutside={this.onClickOutside}
		     padding={10}
		     content={({ position, childRect, popoverRect }) => (
			<ArrowContainer 
			    position={position}
			    childRect={childRect}
			    popoverRect={popoverRect}
			    arrowColor={Constants.FEEDBACK_FORM_BACKGROUND_COLOR}
			    arrowSize={arrowSize}
			    arrowStyle={{ opacity: 1 }}
			    className="popover-arrow-container"
			    arrowClassName="popover-arrow">
				
			    <div style={feedbackFormContainerStyle}>
			        <FeedbackForm index={this.props.index}
			     	       	      contentIdentifier={this.props.contentInfo.key}/>
			    </div>

			</ArrowContainer>
		     )}
		>

	    	<TouchableOpacity style={feedbackButtonStyle}
			      	  onPress={this.onClick}
			      	  onMouseEnter={this.onMouseEnter}
			      	  onMouseLeave={this.onMouseLeave}>
		    !!!
		</TouchableOpacity>

	    </Popover>
	);
    }
}

export default FeedbackButton;
