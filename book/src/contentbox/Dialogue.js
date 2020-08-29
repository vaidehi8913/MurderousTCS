import React, { Component } from "react";

var CHIBI_SIZE = 400;
var CHIBI_MARGIN = 20; // margin between chibi image and dialogue text
var SPEAKER_MARGIN = 20; // bottom margin between one speaker and the next 
var DIALOGUE_TEXT_TOP_OFFSET = 40; // gap between top of chibi image and top of dialogue text
var DIALOGUE_FONT_SIZE = 48;

/* This wraps and renders the Chibi sprite image.

    PROPS
    dialogueLineInfo : JSON dialogueLineInfo object
*/
class ChibiSprite extends Component {
    constructor(props) {
        super(props);

        this.fromDialogueLineInfo = this.fromDialogueLineInfo.bind(this);
    }

    fromDialogueLineInfo(dialogueLineInfo) {
        var chibiSpriteStyle = {
            width: CHIBI_SIZE,
            height: CHIBI_SIZE
        };

        var chibiImageStyle = {
            width: "100%",
            height: "auto"
        }

        console.log("WOAHHHH");
        var chibiImageSource = require ("images/" + dialogueLineInfo.chibiImage);
        console.log("HEYYYY");

        var chibiSpriteComponent = 
            <div style={chibiSpriteStyle}>
                <img src={chibiImageSource} 
                     style={chibiImageStyle} 
                     alt={dialogueLineInfo.chibiDescription}/>
            </div>;

        return (chibiSpriteComponent);
    }

    render () {
        return (this.fromDialogueLineInfo(this.props.dialogueLineInfo));
    }
}

/* This is the text associated with a single speaker (no chibi image)                                

    WISHLIST: This doesn't allow us to format text (bold, italicize, underline words)
    Can we figure out how to render html tags from the input JSON string?

    PROPS
    parentWidth: width of the parent container (SingleSpeaker) 
    dialogueLineInfo: JSON object with info about the dialogueLine
*/
class SpeakerLine extends Component {
    constructor(props) {
        super(props);

        this.fromDialogueLineInfo = this.fromDialogueLineInfo.bind(this);

        this.state = {
            width: this.props.parentWidth - CHIBI_MARGIN
        };
    }

    fromDialogueLineInfo(dialogueLineInfo) {
        var speakerLineStyle = {
            marginLeft: CHIBI_MARGIN,
            marginTop: DIALOGUE_TEXT_TOP_OFFSET,
            /* backgroundColor: "#3b55ff", // for debugging */
            width: this.state.width,
            fontFamily: "sans-serif",
            fontSize: DIALOGUE_FONT_SIZE
        }

        console.log("text width: " + this.state.width);

        var speakerLineComponent = 
            <div style={speakerLineStyle}>
                {dialogueLineInfo.line}
            </div>;

        return speakerLineComponent;
    }

    render () {
        return this.fromDialogueLineInfo(this.props.dialogueLineInfo);
    }
}

/* A single chibi sprite and associated text

    PROPS
    parentWidth: width of parent container (Dialogue)
    dialogueLineInfo: JSON object with info about the dialogueLine
*/
class SingleSpeaker extends Component {
    constructor(props) {
        super(props);

        this.fromDialogueLineInfo = this.fromDialogueLineInfo.bind(this);
    }

    fromDialogueLineInfo(dialogueLineInfo) {
        var singleSpeakerStyle = {
            marginBottom: SPEAKER_MARGIN,
            /*backgroundColor: "#061a99", // for debugging */
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start"
        }

        var chibiComponent = <ChibiSprite dialogueLineInfo={dialogueLineInfo} />;

        var speakerLineComponent = <SpeakerLine dialogueLineInfo={dialogueLineInfo}
                                                parentWidth={this.props.parentWidth} />;

        var singleSpeakerComponent = 
            <div style={singleSpeakerStyle}>
                {chibiComponent}
                {speakerLineComponent}
            </div> ;

        return (singleSpeakerComponent);

    }

    render () { 
        return (this.fromDialogueLineInfo(this.props.dialogueLineInfo));
    }

}

/* This class encapsulates a chunk of dialogue (multiple 
   speakers)

   PROPS
   parentWidth : width of parent component (ContentBox)

   arggggh why is it so hard to spell dialogue :( */
class Dialogue extends Component {
    constructor(props) {
        super(props);

        this.state = {
            width: this.props.parentWidth - (2 * this.props.margin)
        }

        this.fromDialogueInfo = this.fromDialogueInfo.bind(this);
        this.fromDialogueLineInfo = this.fromDialogueLineInfo.bind(this);
    }

    fromDialogueLineInfo(dialogueLineInfo) {
        var dialogueLineComponent = 
            <SingleSpeaker parentWidth={this.state.width}
                           dialogueLineInfo={dialogueLineInfo} />;

        return (dialogueLineComponent);
    }

    fromDialogueInfo(dialogueInfo) {
        var dialogueStyle = {
            /*backgroundColor: "#328FA8", // for debugging */
            width: this.state.width, 
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            margin: this.props.margin
        };

        var scriptInfo = dialogueInfo.script;
        var scriptComponents = scriptInfo.map(this.fromDialogueLineInfo);

        var dialogueComponent = 
            <div style={dialogueStyle}>
                {scriptComponents}
            </div>;

        return (dialogueComponent);
    }

    render () {
        return (this.fromDialogueInfo(this.props.dialogueInfo));
    }
}

export default Dialogue;