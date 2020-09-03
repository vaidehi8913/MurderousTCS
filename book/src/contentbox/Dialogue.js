import React, { Component } from "react";
import * as Constants from "Constants";

/* This wraps and renders the Chibi sprite image.

    PROPS
    dialogueInfo : JSON dialogueInfo object
*/
class ChibiSprite extends Component {
    constructor(props) {
        super(props);

        this.fromDialogueInfo = this.fromDialogueInfo.bind(this);

        this.chibiSpriteStyle = {
            width: Constants.CHIBI_SIZE,
            height: Constants.CHIBI_SIZE,
            backgroundColor: (Constants.DEBUG > 1) ? "#324ea8" : "none"
        };

        this.chibiImageStyle = {
            width: "100%",
            height: "auto"
        }
    }

    fromDialogueInfo(dialogueInfo) {

        if (Constants.DEBUG > 2) {
            console.log("WOAHHHH");
        }
        
        var chibiImageSource = require ("images/" + dialogueInfo.chibiImage);

        if (Constants.DEBUG > 2) {
            console.log("HEYYYY");
        }

        var chibiSpriteComponent = 
            <div style={this.chibiSpriteStyle}>
                <img src={chibiImageSource} 
                     style={this.chibiImageStyle} 
                     alt={dialogueInfo.chibiDescription}/>
            </div>;

        return (chibiSpriteComponent);
    }

    render () {
        return (this.fromDialogueInfo(this.props.dialogueInfo));
    }
}

/* This is the text associated with a single speaker (no chibi image)                                

    WISHLIST: This doesn't allow us to format text (bold, italicize, underline words)
    Can we figure out how to render html tags from the input JSON string?

    PROPS
    parentWidth: width of the parent container (SingleSpeaker) 
    dialogueInfo: JSON object with info about the dialogue
*/
class SpeakerLine extends Component {
    constructor(props) {
        super(props);

        this.fromDialogueInfo = this.fromDialogueInfo.bind(this);

        this.state = {
            width: this.props.parentWidth 
                    - Constants.CHIBI_SIZE 
                    - Constants.CHIBI_MARGIN
        };

        this.speakerLineStyle = {
            marginLeft: Constants.CHIBI_MARGIN,
            marginTop: Constants.DIALOGUE_TEXT_TOP_OFFSET,
            backgroundColor: (Constants.DEBUG > 1) ? "#3b55ff" : "none", 
            width: this.state.width,
            fontFamily: Constants.DIALOGUE_FONT_FAMILY,
            fontSize: Constants.DIALOGUE_FONT_SIZE
        }
    }

    fromDialogueInfo(dialogueInfo) {
        console.log("text width: " + this.state.width);

        var speakerLineComponent = 
            <div style={this.speakerLineStyle}>
                {dialogueInfo.line}
            </div>;

        return speakerLineComponent;
    }

    render () {

        if (Constants.DEBUG > 2) {
            console.log("SpeakerLine state width: " + this.state.width);
            console.log("SpeakerLine style width: " + this.speakerLineStyle.width);
        }

        return this.fromDialogueInfo(this.props.dialogueInfo);
    }
}

/* A single chibi sprite and associated text

    PROPS
    parentWidth: width of parent container (Dialogue)
    dialogueInfo: JSON object with info about the dialogue
*/
class Dialogue extends Component {
    constructor(props) {
        super(props);

        this.fromDialogueInfo = this.fromDialogueInfo.bind(this);

        this.dialogueStyle = {
            marginBottom: Constants.SPEAKER_MARGIN,
            backgroundColor: (Constants.DEBUG > 1) ? "#061a99" : "none", 
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            width: this.props.parentWidth 
        }
    }

    fromDialogueInfo(dialogueInfo) {
        var chibiComponent = <ChibiSprite dialogueInfo={dialogueInfo} />;

        var speakerLineComponent = <SpeakerLine dialogueInfo={dialogueInfo}
                                                parentWidth={this.props.parentWidth} />;

        var singleSpeakerComponent = 
            <div style={this.dialogueStyle}>
                {chibiComponent}
                {speakerLineComponent}
            </div> ;

        return (singleSpeakerComponent);

    }

    render () { 
        return (this.fromDialogueInfo(this.props.dialogueInfo));
    }

}

export default Dialogue;