import React, { Component } from "react";
import ReactDOM from 'react-dom';
import {TouchableOpacity} from 'react-native';

import Dialogue from "contentbox/Dialogue";
import ComicImage from "contentbox/ComicImage";
import ChapterHeading from "contentbox/ChapterHeading";
import ExtraList from "contentbox/ExtraList";
import FeedbackButton from "contentbox/FeedbackButton";

import * as Constants from "Constants";

/*
 * Wraps the ExtraList component with the sole purpose of 
 * assiging it to the correct grid cell
 *
 * PROPS
 * contentInfo
 * index
 * extrasWidth
 *
 */
class ExtraElement extends Component {
    constructor(props){
	super(props);

	this.extraElementStyle = {
	    backgroundColor: (Constants.DEBUG > 2) ? "#ebe134" : "none",
	    gridColumnStart: "extras-start",
	    gridRowStart: "row-start " + (this.props.index + 1),
	    gridRowEnd: "rows-end",
	    width: this.props.extrasWidth
	}
    }

    render() {
	var contentInfo = this.props.contentInfo;
	var extraComponent = null;
  
	if (contentInfo.hasOwnProperty("extras")) {
	    extraComponent = 
	        <div style={this.extraElementStyle}
		     key={contentInfo.key}>
		    <ExtraList extraListInfo={contentInfo.extras}
			       extrasWidth={this.props.extrasWidth} />
		</div>;
	}

	return extraComponent;
    }    
}


/*  This formats the content to sit inside 
    Constants.CONTENT_WIDTH, and to place the extras
    correctly.

    PROPS
    extrasWidth
    contentInfo
    index
*/
class ContentElement extends Component {
    constructor(props) {
        super(props);

        this.contentElementStyle = {
            backgroundColor: (Constants.DEBUG > 2) ? "#dbdbdb" : "none",
            display: "flex",
            flexDirection: "row"
        };

        this.contentContainerStyle = {
            backgroundColor: (Constants.DEBUG > 2) ? "#11b8b5" : "none",
	    gridColumnStart: "content-start",
	    gridRowStart: "row-start " + (this.props.index + 1)
        }; 

        this.extrasContainerStyle = {
            backgroundColor: (Constants.DEBUG > 2) ? "#e31bbe" : "none",
            width: this.props.extrasWidth - Constants.CONTENT_MARGIN
        };
    }
  

    render() {
        var contentInfo = this.props.contentInfo;
        var contentComponent; 

	if (contentInfo.type === "image") {
            contentComponent =  <ComicImage contentInfo={contentInfo} 
                                            key={contentInfo.key}/>;

        } else if (contentInfo.type === "dialogue") {
            contentComponent =  <Dialogue dialogueInfo={contentInfo} 
                                          parentWidth={Constants.CONTENT_WIDTH}
                                          key={contentInfo.key}/>;

        } else if (contentInfo.type === "heading") {
            contentComponent =  <ChapterHeading headingInfo={contentInfo}
                                                parentWidth={Constants.CONTENT_WIDTH}
                                                key={contentInfo.key}/>;
        }

        return (
            <div style={this.contentContainerStyle}
		 key={contentInfo.key}>
                {contentComponent}
            </div>
        );
    }
}

/* The ContentBox contains the "middle bar" of our layout.
   This is where the comic images, dialogue, and the rest 
   of our main content will go. 
   
   Some of the main repeating components have standard 
   wrappers. ComicImage and ChapterHeading are in this file.  
   Dialogue is implemented in a separate file.  

   PROPS
   contentInfo: the json info with the Chapter content
   height: height of the window from the parent component
           (Chapter)
   extrasWidth: width of the extras bar, calculated at 
                the Chapter level
*/
class ContentBox extends Component {
    constructor(props) {
        super(props);

        this.fromContentData = this.fromContentData.bind(this);
	this.extrasFromContentData = this.extrasFromContentData.bind(this);
	this.buttonsFromContentData = this.buttonsFromContentData.bind(this);
   }

    fromContentData(contentData, index) {
        return(
            <ContentElement contentInfo={contentData}
                            extrasWidth={this.props.extrasWidth}
                            registerExtra={this.props.registerExtra}
		            index={index}/>
        );
    }

    extrasFromContentData(contentData, index) {
	return(
	    <ExtraElement contentInfo={contentData}
		          extrasWidth={this.props.extrasWidth}
			  index={index}/>
	);
    }

    buttonsFromContentData(contentData, index) {

	var feedbackButtonContainerStyle = {
	    backgroundColor: (Constants.DEBUG > 0) ? "#03fc30" : "none",
	    gridColumnStart: "button-start",
	    gridRowStart: "row-start " + (index + 1),
	    placeSelf: "center"
	}

	return(
	    <div style={feedbackButtonContainerStyle}>
		<FeedbackButton contentInfo={contentData}
				index={index}/>
	    </div>
	);
    }

    fromChapterData(contentInfo) {

        var contentComponents = contentInfo.map(this.fromContentData);
        var extraComponents = contentInfo.map(this.extrasFromContentData);
	var buttonComponents = contentInfo.map(this.buttonsFromContentData);

	var contentBoxStyle = {
	    backgroundColor: (Constants.DEBUG > 0) ? "#a8caff" : "none",
	    display: "grid",
	    gridTemplateColumns: "[content-start] " + Constants.CONTENT_WIDTH + "px "
	        + "[content-end button-start] " + Constants.FEEDBACK_BUTTON_WIDTH + "px "
		+ "[button-end extras-start] " + this.props.extrasWidth + "px " 
		+ " [extras-end]",
	    gridTemplateRows: "repeat(" + contentInfo.length + ", [row-start] auto)"
	        + " [rows-end]"
	};

        return(
            <div style={contentBoxStyle}>
                {contentComponents}
		{extraComponents}
		{buttonComponents}
            </div>
        );
    }

    render () {
        var formattedChapterData = this.fromChapterData(this.props.contentInfo);
        return(formattedChapterData);
    }
}

export default ContentBox;
