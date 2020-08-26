import React, { Component } from "react";
import kitePicture1 from "../images/kite_picture_1.jpg";
import Dialogue from "./Dialogue";
import chapter1Content from "../chapter-jsons/chapter1.json";

var CONTENT_MARGIN = 20;
var CHAPTER_NUMBER_SIZE = 200;
var CHAPTER_TITLE_FONT_SIZE = 100;

/* Comic images have no 
   side margins. 
   
   PROPS
   imgSource : image source for the comic image 
   description: description of image for hovering (currently not implemented)
*/
class ComicImage extends Component {
    render () {
        var comicImageStyle = {
            marginTop: this.props.margin, 
            marginBottom: this.props.margin
        }

        return (
            <img src={this.props.imgSource} style={comicImageStyle} alt={this.props.description}/>
        );
    }
}

/* Formatting for the chapter heading

    PROPS
    number: chapter number
    title: chapter title
    parentWidth: width of the parent component (content box)
*/
class ChapterHeading extends Component{
    render () {
        var chapterHeadingStyle = {
            display: "flex",
            flexDirection: "row"
        }

        var chapterNumberStyle = {
            /*backgroundColor: "#ffdc7a", // for debugging */
            width: CHAPTER_NUMBER_SIZE,
            marginRight: this.props.margin,
            textAlign: "center",
            fontFamily: "sans-serif",
            fontSize: CHAPTER_TITLE_FONT_SIZE
        }

        var chapterTitleStyle = {
            /* backgroundColor: "#fcba03", // for debugging */
            width: ((this.props.parentWidth - this.props.margin) - CHAPTER_NUMBER_SIZE),
            fontFamily: "sans-serif",
            /*fontVariant: "small-caps",*/ // can play with this later
            fontSize: CHAPTER_TITLE_FONT_SIZE
        }

        return (
            <div style={chapterHeadingStyle}>
                <div style={chapterNumberStyle}>
                    {this.props.number}
                </div>
                <div style={chapterTitleStyle}>
                    {this.props.title}
                </div>
            </div>
        )
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
            /* TODO: fix this hardcoded picture */
            var contentImg = require("../images/001.png");

            console.log(contentData.source);

            /* YOU ARE HERE: why won't the image load from require(contentData.source) ? */

            return <ComicImage src={contentImg} description={contentData.description} key={contentData.key}/>;
            /* eventually we should just pass the whole contentData right along */
        } else if (contentData.type === "dialogue") {
            return <div key={contentData.key}/>;
            /* TO DO */
        }
    }

    fromChapterData(chapterData) {
        var headingInfo = chapterData.heading;
        var heading = <ChapterHeading number={headingInfo.number} 
                                      title={headingInfo.title} 
                                      parentWidth={2000} 
                                      margin={CONTENT_MARGIN} />;
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
        var contentBoxStyle = {
            backgroundColor: "#a8caff",
            width: this.props.width, 
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        };

        var formattedChapterData = this.fromChapterData(chapter1Content);

        console.log(formattedChapterData);

        return(formattedChapterData);
        
        /*return(
            <div style={contentBoxStyle}>
                <ChapterHeading number={1} title={"The Unanswerable Question"} parentWidth={this.props.width} margin={CONTENT_MARGIN}/>
                <ComicImage imgSource={kitePicture1} margin={CONTENT_MARGIN} description={"Vaidehi and Parmita flying a kite"}/>
                <Dialogue parentWidth={this.props.width} margin={CONTENT_MARGIN}/>
            </div>
        );*/

        /*return(this.fromContentData(chapter1Content));*/
    }
}

export default ContentBox;