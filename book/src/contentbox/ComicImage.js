import React, { Component } from "react";
import * as Constants from "Constants";

/* Comic images have no 
   side margins. 
   
   PROPS
   contentInfo: a JSON format object
*/
class ComicImage extends Component {
    constructor(props) {
        super(props);

        this.fromJSON = this.fromJSON.bind(this);

        this.comicImageWrapperStyle = {
            //marginTop: Constants.CONTENT_MARGIN, 
            marginLeft: Constants.CONTENT_MARGIN,
            marginRight: Constants.CONTENT_MARGIN, 
            //marginBottom: Constants.CONTENT_MARGIN, 
            backgroundColor: (Constants.DEBUG > 2) ? "#2b0dbf" : "none",
        }

        this.comicImageStyle = {
            width: "100%", 
            height: "auto"
        };
    }
    
    fromJSON(contentInfo) {
        var imgSource = require ("images/" + contentInfo.source);
        /* I have no idea why my previous 17 tries to get this image to render 
            did not work.  Maybe I will never know.  I sure am glad this one 
            worked though */

        var imgDescription = contentInfo.description;

        return (
            <div style={this.comicImageWrapperStyle}>
                <img src={imgSource} alt={imgDescription} style={this.comicImageStyle}/>
            </div>  
        );
    }

    render () {
        return (this.fromJSON(this.props.contentInfo));
    }
}

export default ComicImage;