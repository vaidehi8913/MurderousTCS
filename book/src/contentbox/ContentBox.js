import React, { Component } from "react";
import ReactDOM from 'react-dom';

import Dialogue from "contentbox/Dialogue";
import ComicImage from "contentbox/ComicImage";
import ChapterHeading from "contentbox/ChapterHeading";
import ExtraList from "contentbox/ExtraList";

import * as Constants from "Constants";

/*  This formats the content to sit inside 
    Constants.CONTENT_WIDTH, and to place the extras
    correctly.

    PROPS
    extrasWidth
    contentInfo
    registerExtra
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
            width: Constants.CONTENT_WIDTH
        }; 

        this.extrasContainerStyle = {
            backgroundColor: (Constants.DEBUG > 2) ? "#e31bbe" : "none",
            width: this.props.extrasWidth - Constants.CONTENT_MARGIN
        };

        this.contentComponentFromInfo = this.contentComponentFromInfo.bind(this);
        //this.extrasComponentFromInfo = this.extrasComponentFromInfo.bind(this);

        this.state = {
            mounted: false
        };

        this.extraState = {
            top: 0,
            mounted: false,
            extraUnregistered: true
        };

        this.parseAndRegisterExtra = this.parseAndRegisterExtra.bind(this);
    }

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

    }

    contentComponentFromInfo() {
        var contentInfo = this.props.contentInfo;
        var contentComponent; 

        if (Constants.DEBUG > 2) {
            console.log(contentInfo);
        }

        if (contentInfo.type === "image") {
            contentComponent =  <ComicImage contentInfo={contentInfo} 
                                            key={contentInfo.key} />;

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
            <div style={this.contentContainerStyle}>
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

    render() {
        var contentComponent = this.contentComponentFromInfo();
        this.parseAndRegisterExtra();

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

        this.contentBoxStyle = {
            backgroundColor: (Constants.DEBUG > 0) ? "#a8caff" : "none",
            width: Constants.CONTENT_WIDTH, 
            display: "flex",
            flexDirection: "column"
        };
    }

    fromContentData(contentData) {
        return(
            <ContentElement contentInfo={contentData}
                            extrasWidth={this.props.extrasWidth}
                            registerExtra={this.props.registerExtra}/>
        );
    }

    fromChapterData(contentInfo) {
        var contentComponents = contentInfo.map(this.fromContentData);

        if (Constants.DEBUG > 2) {
            console.log("ContentBox width:" + this.contentBoxStyle.width);
        }

        return(
            <div style={this.contentBoxStyle}>
                {contentComponents}
            </div>
        );
    }

    render () {
        var formattedChapterData = this.fromChapterData(this.props.contentInfo);
        return(formattedChapterData);
    }
}

export default ContentBox;