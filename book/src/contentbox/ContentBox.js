import React, { Component } from "react";
import Dialogue from "contentbox/Dialogue";
import * as Constants from "Constants";

/* Comic images have no 
   side margins. 
   
   PROPS
   contentData: a JSON format object
*/
class ComicImage extends Component {
    constructor(props) {
        super(props);

        this.fromJSON = this.fromJSON.bind(this);

        this.comicImageStyle = {
            marginTop: this.props.margin, 
            marginBottom: this.props.margin,
            width: "100%",
            height: "auto"
        };
    }
    
    fromJSON(contentData) {
        var imgSource = require ("images/" + contentData.source);
        /* I have no idea why my previous 17 tries to get this image to render 
            did not work.  Maybe I will never know.  I sure am glad this one 
            worked though */

        var imgDescription = contentData.description;

        return (
            <img src={imgSource} alt={imgDescription} style={this.comicImageStyle}/>
        );
    }

    render () {
        return (this.fromJSON(this.props.contentData));
    }
}

/* Formatting for the chapter heading

    PROPS
    headingInfo: a JSON object with heading information
    parentWidth: width of the parent component (content box)
    margin
*/
class ChapterHeading extends Component{
    constructor(props) {
        super(props);

        this.fromJSON = this.fromJSON.bind(this);

        this.chapterHeadingStyle = {
            display: "flex",
            flexDirection: "row"
        };

        this.chapterNumberStyle = {
            backgroundColor: (Constants.DEBUG > 1) ? "#ffdc7a" : "none", 
            width: Constants.CHAPTER_NUMBER_SIZE,
            marginRight: this.props.margin,
            textAlign: "center",
            fontFamily: "sans-serif",
            fontSize: Constants.CHAPTER_TITLE_FONT_SIZE
        };

        this.chapterTitleStyle = {
            backgroundColor: (Constants.DEBUG > 1) ? "#fcba03" : "none",  
            width: ((this.props.parentWidth - this.props.margin) - Constants.CHAPTER_NUMBER_SIZE),
            fontFamily: "sans-serif",
            // fontVariant: "small-caps", // can play with this later
            fontSize: Constants.CHAPTER_TITLE_FONT_SIZE
        }
    }

    fromJSON(headingInfo) {
        var chapterNumber = headingInfo.number;
        var chapterTitle = headingInfo.title;

        var headingObject =  <div style={this.chapterHeadingStyle}>
                                <div style={this.chapterNumberStyle}>
                                    {chapterNumber}
                                </div>
                                <div style={this.chapterTitleStyle}>
                                    {chapterTitle}
                                </div>
                            </div>;

        return (headingObject);
    }

    render () {
        return (this.fromJSON(this.props.headingInfo));
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
   width: the width set by the Chapter component
*/
class ContentBox extends Component {
    constructor(props) {
        super(props);

        this.fromContentData = this.fromContentData.bind(this);

        this.contentBoxStyle = {
            backgroundColor: (Constants.DEBUG > 0) ? "#a8caff" : "none",
            width: this.props.width, 
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        };
    }

    fromContentData(contentData) {
        if (contentData.type === "image") {

            return <ComicImage contentData={contentData} key={contentData.key} />;

        } else if (contentData.type === "dialogue") {

            return <Dialogue dialogueInfo={contentData} 
                             parentWidth={Constants.CONTENT_WIDTH}
                             key={contentData.key}/>;
        }
    }

    fromChapterData(chapterData) {
        var headingInfo = chapterData.heading;

        var heading = <ChapterHeading headingInfo={headingInfo} 
                                      parentWidth={Constants.CONTENT_WIDTH} 
                                      margin={Constants.CONTENT_MARGIN} />;

        var contentInfo = chapterData.content;
        var contentComponents = contentInfo.map(this.fromContentData);

        return(
            <div style={this.contentBoxStyle}>
                {heading}
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