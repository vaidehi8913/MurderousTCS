import React, { Component } from "react";
import * as Constants from "Constants";

/* Formatting for the chapter heading

    PROPS
    headingInfo: a JSON object with heading information
    parentWidth: width of the parent component (content box)
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
            backgroundColor: (Constants.DEBUG > 1) ? "#7866ff" : "none", 
            width: Constants.CHAPTER_NUMBER_SIZE,
            marginRight: Constants.CONTENT_MARGIN,
            textAlign: "center",
            fontFamily: "sans-serif",
            fontSize: Constants.CHAPTER_TITLE_FONT_SIZE
        };

        this.chapterTitleStyle = {
            backgroundColor: (Constants.DEBUG > 1) ? "#1259ff" : "none",  
            width: ((this.props.parentWidth - Constants.CONTENT_MARGIN) - Constants.CHAPTER_NUMBER_SIZE),
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

export default ChapterHeading;