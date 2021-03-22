import React, { Component } from "react";
import axios from "axios";
import {TouchableOpacity} from "react-native";
import { Popover, ArrowContainer } from "react-tiny-popover";

import * as Constants from "Constants";

/*
 * PROPS
 * contentIdentifier
 * index
 * prefillComment
 * passUpComment
 * setEmail
 * getEmail
 */
class FeedbackForm extends Component {
    constructor(props) {
	super(props);

        this.state = {
	    email: this.props.getEmail(),
	    comment: this.props.prefillComment
	};

	this.handleSubmit = this.handleSubmit.bind(this);
	this.handleEmailChange = this.handleEmailChange.bind(this);
	this.handleCommentChange = this.handleCommentChange.bind(this);
	this.postToGoogleForm = this.postToGoogleForm.bind(this);
    }

    handleSubmit(event) {
	console.log("submitted feedback about ["
		+ this.props.contentIdentifier + ", " + this.props.index 
		+ "]: " + this.state.comment);

	this.postToGoogleForm();

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

	this.props.setEmail(event.target.value);
    }

    handleCommentChange(event) {
	this.setState({
	    comment: event.target.value
	});

	this.props.passUpComment(event.target.value);
    }

    postToGoogleForm() {
	const formData = new FormData()

	formData.append(Constants.GOOGLE_FORMS_ELEMID_ENTRY, this.props.contentIdentifier);

	formData.append(Constants.GOOGLE_FORMS_EMAIL_ENTRY, this.state.email);

	formData.append(Constants.GOOGLE_FORMS_COMMENT_ENTRY, this.state.comment);

	axios.post(Constants.GOOGLE_FORMS_ACTION_URL, formData).catch(()=> console.log("Post error"));
    }

    render() {
	var emailInputStyle = {
	    borderRadius: "4px",
	    border: "2px solid",
	    width: "95%",
	    margin: "2px",
	    padding: "5px"
	};

	var commentTextAreaStyle = {
	    borderRadius: "4px",
	    border: "2px solid",
	    width: "95%",
	    margin: "2px",
 	    padding: "5px"
	};

	var submitButtonStyle = {
	    borderRadius: "4px",
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
 * setEmail
 * getEmail
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

	this.comment = "";
	this.passComment = this.passComment.bind(this);
    }

    passComment(c) {
	this.comment = c;
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
	var arrowPadding = 10;

	var feedbackFormContainerStyle = {
	    width: this.props.extrasWidth - arrowSize - 20,
	    backgroundColor: Constants.FEEDBACK_FORM_BACKGROUND_COLOR,
	    borderRadius: "8px",
	    padding: "5px"
	};

	return(
	    <Popover isOpen={this.state.isPopoverOpen}
		     positions={["right"]}
		     content={<div>Hi! I am popover content.</div>} 
		     onClickOutside={this.onClickOutside}
		     padding={arrowPadding}
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
			     	       	      contentIdentifier={this.props.contentInfo.key}
			     		      passUpComment={this.passComment}
			     		      prefillComment={this.comment}
			     		      setEmail={this.props.setEmail}
			     		      getEmail={this.props.getEmail}/>
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
