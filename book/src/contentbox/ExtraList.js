import React, { Component } from "react";
import * as Constants from "Constants";

/* Displays an image in the extras bar

    PROPS
    imgExtraInfo
    parentWidth
*/
class ImageExtra extends Component {
    render() {
        var imgExtraInfo = this.props.imgExtraInfo;
        var imgSource = require("images/" + imgExtraInfo.imgSource);
        var imgDescription = imgExtraInfo.description;
        var imgExtraWidth, imageExtraStyle;

        // if a widthMultiplier is included, set the image size to be the
        // widthMultiplier times the contentWidth.  Otherwise, let it take
        // up as much room as possible 
        if (imgExtraInfo.hasOwnProperty("widthMultiplier")) {
            imgExtraWidth = imgExtraInfo.widthMultiplier * Constants.CONTENT_WIDTH;

            if (imgExtraWidth > this.props.parentWidth) {
                imgExtraWidth = this.props.parentWidth;
            }

            imageExtraStyle = {
                width: imgExtraWidth,
                height: "auto"
            };
        } else {
            imageExtraStyle = {
                width: "100%",
                height: "auto"
            };
        }

        return(
            <img src={imgSource}
                 alt={imgDescription}
                 style={imageExtraStyle}/>
        );
    }
}

/* Displays text in the extras bar

    PROPS
    textExtraInfo
*/
class TextExtra extends Component {
    constructor(props) {
        super(props);

        this.textExtraStyle = {
            backgroundColor: (Constants.DEBUG > 2) ? "#a83277" : "none",
            fontSize: Constants.EXTRAS_FONT_SIZE,
            fontFamily: Constants.EXTRAS_FONT_FAMILY
        }
    }

    render() {
        return(
            <div style={this.textExtraStyle} >
                {this.props.textExtraInfo.text}
            </div>
        );
    }
}

/* Renders a list of extras from the JSON
   specifying them

   PROPS
   extraListInfo
   extrasWidth: this should trickle down from waaaaaaaay up in 
                the DOM hierarchy.  From Chapter.
*/
class ExtraList extends Component {
    constructor(props) {
        super(props);

        this.extraListStyle = {
            width: this.props.extrasWidth - (2 * Constants.CONTENT_MARGIN),
            backgroundColor: (Constants.DEBUG > 2) ? "#e31b4d" : "none",
            marginLeft: Constants.CONTENT_MARGIN,
            marginTop: Constants.CONTENT_MARGIN,
            marginRight: Constants.CONTENT_MARGIN
        }

        this.singleExtraStyle = {
            backgroundColor: (Constants.DEBUG > 2) ? "#ffc9e3" : "none",
            marginBottom: Constants.CONTENT_MARGIN
        }

        this.fromSingleExtraInfo = this.fromSingleExtraInfo.bind(this);
    }

    fromSingleExtraInfo(extraInfo) {
        var extraComponent; 

        if (extraInfo.type === "image") {
            extraComponent = <ImageExtra imgExtraInfo={extraInfo} 
                                         parentWidth={this.extraListStyle.width}/>;
        } else if (extraInfo.type === "text") {
            extraComponent = <TextExtra textExtraInfo={extraInfo} />;
        }

        return (
            <div style={this.singleExtraStyle}
                 key={extraInfo.key}>
                {extraComponent}
            </div>
        );
    }

    render() {
        var extraListInfo = this.props.extraListInfo.list;
        var extraComponents = extraListInfo.map(this.fromSingleExtraInfo);

        return (
            <div style={this.extraListStyle}>
                {extraComponents}
            </div>
        );
    }
}

export default ExtraList;