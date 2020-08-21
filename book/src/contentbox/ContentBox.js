import React, { Component } from "react";
import kitePicture1 from "../images/kite_picture_1.jpg";
import Dialogue from "./Dialogue"

var CONTENT_MARGIN = 20;

/* Comic images have top and bottom margins, and no 
   side margins. 
   
   PROPS
   imgSource : image source for the comic image */
class ComicImage extends Component {
    render () {
        var comicImageStyle = {
            marginTop: this.props.margin,
            marginBottom: this.props.margin
        }

        return (
            <img src={this.props.imgSource} style={comicImageStyle}/>
        );
    }
}

/* The ContentBox contains the "middle bar" of our layout.
   This is where the comic images, dialogue, and the rest 
   of our main content will go. 
   
   Some of the main repeating components have standard 
   wrappers. ComicImage is in this file.  Dialogue 
   is implemented in a separate file.  

   PROPS
   width : the width that the ContextBox is set to.  This is 
           a constant defined in Chapter.js
   */
class ContentBox extends Component {

    render () {
        var contentBoxStyle = {
            backgroundColor: "#a8caff",
            width: this.props.width, 
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        };

        return(
            <div style={contentBoxStyle}>
                <ComicImage imgSource={kitePicture1} margin={CONTENT_MARGIN}/>
                <Dialogue parentWidth={this.props.width} margin={CONTENT_MARGIN}/>
            </div>
        );
    }
}

export default ContentBox;