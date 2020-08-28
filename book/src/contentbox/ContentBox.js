import React, { Component } from "react";
import chapter1Content from "chapter-jsons/chapter1.json";
import Dialogue from "contentbox/Dialogue";

var CONTENT_MARGIN = 20;
var CHAPTER_NUMBER_SIZE = 200;
var CHAPTER_TITLE_FONT_SIZE = 100;

/* Comic images have no 
   side margins. 
   
   PROPS
   contentData: a JSON format object
*/
class ComicImage extends Component {
    constructor(props) {
        super(props);

        this.fromJSON = this.fromJSON.bind(this);
    }
    
    fromJSON(contentData) {
        var comicImageStyle = {
            marginTop: this.props.margin, 
            marginBottom: this.props.margin,
            width: "100%",
            height: "auto"
        }

        var imgSource = require ("images/" + contentData.source);
        /* I have no idea why my previous 17 tries to get this image to render 
            did not work.  Maybe I will never know.  I sure am glad this one 
            worked though */

        var imgDescription = contentData.description;

        return (
            <img src={imgSource} alt={imgDescription} style={comicImageStyle}/>
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
    }

    fromJSON(headingInfo) {
        var chapterHeadingStyle = {
            display: "flex",
            flexDirection: "row"
        }

        var chapterNumberStyle = {
            // backgroundColor: "#ffdc7a", // for debugging 
            width: CHAPTER_NUMBER_SIZE,
            marginRight: this.props.margin,
            textAlign: "center",
            fontFamily: "sans-serif",
            fontSize: CHAPTER_TITLE_FONT_SIZE
        }

        var chapterTitleStyle = {
            // backgroundColor: "#fcba03", // for debugging 
            width: ((this.props.parentWidth - this.props.margin) - CHAPTER_NUMBER_SIZE),
            fontFamily: "sans-serif",
            // fontVariant: "small-caps", // can play with this later
            fontSize: CHAPTER_TITLE_FONT_SIZE
        }

        var chapterNumber = headingInfo.number;
        var chapterTitle = headingInfo.title;

        var headingObject =  <div style={chapterHeadingStyle}>
                                <div style={chapterNumberStyle}>
                                    {chapterNumber}
                                </div>
                                <div style={chapterTitleStyle}>
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
   width : the width that the ContextBox is set to.  This is 
           a constant defined in Chapter.js
*/
class ContentBox extends Component {
    constructor(props) {
        super(props);

        this.fromContentData = this.fromContentData.bind(this);
    }

    fromContentData(contentData) {
        if (contentData.type === "image") {

            return <ComicImage contentData={contentData} key={contentData.key} />;

        } else if (contentData.type === "dialogue") {

            return <Dialogue dialogueInfo={contentData} 
                             parentWidth={2000}
                             margin={CONTENT_MARGIN}/>;
                             /* TODO: fix hardcoded parentWidth */
        }
    }

    fromChapterData(chapterData) {
        var headingInfo = chapterData.heading;

        var heading = <ChapterHeading headingInfo={headingInfo} 
                                      parentWidth={2000} 
                                      margin={CONTENT_MARGIN} />
                                      /* TODO: fix hardcoded parentWidth */

        var contentInfo = chapterData.content;
        var contentComponents = contentInfo.map(this.fromContentData);

        var contentBoxStyle = {
            backgroundColor: "#a8caff",
            width: this.props.width, 
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        };

        return(
            <div style={contentBoxStyle}>
                {heading}
                {contentComponents}
            </div>
        );
    }


    render () {

        var formattedChapterData = this.fromChapterData(chapter1Content);

        //console.log(formattedChapterData);

        return(formattedChapterData);
    }
}

export default ContentBox;