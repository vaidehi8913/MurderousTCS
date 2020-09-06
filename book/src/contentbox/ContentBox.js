import React, { Component } from "react";

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
        this.extrasComponentFromInfo = this.extrasComponentFromInfo.bind(this);
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

    extrasComponentFromInfo() {
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
    }

    render() {
        var contentComponent = this.contentComponentFromInfo();
        var extrasComponent = this.extrasComponentFromInfo();

        // return (
        //     <div style={this.contentElementStyle}>
        //         {contentComponent}
        //         {extrasComponent}
        //     </div>
        // );
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
*/
class ContentBox extends Component {
    constructor(props) {
        super(props);

        this.fromContentData = this.fromContentData.bind(this);

        this.contentBoxStyle = {
            backgroundColor: (Constants.DEBUG > 0) ? "#a8caff" : "none",
            width: Constants.CONTENT_WIDTH, //+ this.props.extrasWidth, 
            display: "flex",
            flexDirection: "column",
            height: this.props.height, 
            overflow: "auto"
        };
    }

    fromContentData(contentData) {
        return(
            <ContentElement contentInfo={contentData}
                            extrasWidth={this.props.extrasWidth}/>
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