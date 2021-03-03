import React, { Component } from "react";
import ReactDOM from 'react-dom';

import Dialogue from "contentbox/Dialogue";
import ComicImage from "contentbox/ComicImage";
import ChapterHeading from "contentbox/ChapterHeading";
import ExtraList from "contentbox/ExtraList";

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
   
        if (Constants.DEBUG > 2) {
	    console.log("rendering extra element: " + this.props.index);
	}

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
    registerExtra
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
            //width: Constants.CONTENT_WIDTH,
	    gridColumnStart: "content-start",
	    gridRowStart: "row-start " + (this.props.index + 1)
        }; 

        this.extrasContainerStyle = {
            backgroundColor: (Constants.DEBUG > 2) ? "#e31bbe" : "none",
            width: this.props.extrasWidth - Constants.CONTENT_MARGIN
        };

        this.contentComponentFromInfo = this.contentComponentFromInfo.bind(this);
        //this.extrasComponentFromInfo = this.extrasComponentFromInfo.bind(this);

	/*
        this.state = {
            mounted: false
        };

        this.extraState = {
            top: 0,
            mounted: false,
            extraUnregistered: true
        };*/

        //this.parseAndRegisterExtra = this.parseAndRegisterExtra.bind(this);
    }
    
    /*
    componentDidMount() {
        var rect = ReactDOM.findDOMNode(this).getBoundingClientRect()

        if (Constants.DEBUG > 2) {
            console.log("content component mounted, top: " + rect.top);
        }

        this.extraState = {
            top: rect.top,
            extraUnregistered: true
        };

        this.setState({
            mounted: true
        });

    }*/

    contentComponentFromInfo() {
        var contentInfo = this.props.contentInfo;
        var contentComponent; 

	/*
        if (Constants.DEBUG > 2) {
            console.log(contentInfo);
        }
	*/

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

    /*extrasComponentFromInfo() {
        var contentInfo = this.props.contentInfo;

        if (contentInfo.hasOwnProperty("extras")) {
            return (
                <div style={this.extrasContainerStyle}>
                    <ExtraList extraListInfo={contentInfo.extras}
                               extrasWidth={this.props.extrasWidth} />
                </div>
            );
        } else {
            return (
                <div style={this.extrasContainerStyle} />
            );
        }
    }*/

    /*
    parseAndRegisterExtra() {
        if (Constants.DEBUG > 2) {
            console.log("entering parseAndRegisterExtra");
        }

        if (this.state.mounted && this.extraState.extraUnregistered) {

            if (Constants.DEBUG > 2) {
                console.log("registering extra");
            }

            var contentInfo = this.props.contentInfo;

            if (contentInfo.hasOwnProperty("extras")) {
                var extraListInfo = contentInfo.extras;
                
                var extraInfo = {
                    key: contentInfo.key,
                    top: this.state.top,
                    extraList: extraListInfo
                };

                this.props.registerExtra(extraInfo);

                this.extraState = ({
                    top: this.extraState.top,
                    extraUnregistered: false
                });
            }
        }
    }
    */

    render() {

	if (Constants.DEBUG > 2) {
	    console.log("rendering content component: " + this.props.index );
	}

        var contentComponent = this.contentComponentFromInfo();
        //this.parseAndRegisterExtra();

        return contentComponent;
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
   registerExtra: a function that passes the information about 
                  an extra and its position back up the chain
*/
class ContentBox extends Component {
    constructor(props) {
        super(props);

        this.fromContentData = this.fromContentData.bind(this);
	this.extrasFromContentData = this.extrasFromContentData.bind(this);

	/*
        this.contentBoxStyle = {
            backgroundColor: (Constants.DEBUG > 0) ? "#a8caff" : "none",
            width: Constants.CONTENT_WIDTH, 
	    display: "flex",
            flexDirection: "column"
        };
	*/
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

    fromChapterData(contentInfo) {

	// can use contentInfo.length to initialize the grid
	// to use the repeat command, will have to format a string
	// npm install react-string-format
	// import { format } from 'react-string-format';
	// format('text: {1}, number: {0}', 'hello!', 123);

        var contentComponents = contentInfo.map(this.fromContentData);
        var extraComponents = contentInfo.map(this.extrasFromContentData);

	    /*
        if (Constants.DEBUG > 2) {
            console.log("ContentBox width:" + this.contentBoxStyle.width);
        }
	*/

	var contentBoxStyle = {
	    backgroundColor: (Constants.DEBUG > 0) ? "#a8caff" : "none",
	    //width: Constants.CONTENT_WIDTH + this.props.extrasWidth,
	    display: "grid",
	    gridTemplateColumns: "[content-start] " + Constants.CONTENT_WIDTH + "px "
				 + "[content-end extras-start] " + this.props.extrasWidth + "px " 
		 		 + " [extras-end]",
	    gridTemplateRows: "repeat(" + contentInfo.length + ", [row-start] auto)"
			      + " [rows-end]"
	};

        return(
            <div style={contentBoxStyle}>
                {contentComponents}
		{extraComponents}
            </div>
        );
    }

    render () {
        var formattedChapterData = this.fromChapterData(this.props.contentInfo);
        return(formattedChapterData);
    }
}

export default ContentBox;
