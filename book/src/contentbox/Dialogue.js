import React, { Component } from "react";
import * as Constants from "Constants";

/* This wraps and renders the Chibi sprite image.

    PROPS
    dialogueLineInfo : JSON dialogueLineInfo object
*/
class ChibiSprite extends Component {
    constructor(props) {
        super(props);

        this.fromDialogueLineInfo = this.fromDialogueLineInfo.bind(this);

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

    fromDialogueLineInfo(dialogueLineInfo) {

        console.log("WOAHHHH");
        var chibiImageSource = require ("images/" + dialogueLineInfo.chibiImage);
        console.log("HEYYYY");

        var chibiSpriteComponent = 
            <div style={this.chibiSpriteStyle}>
                <img src={chibiImageSource} 
                     style={this.chibiImageStyle} 
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
            width: this.props.parentWidth - Constants.CHIBI_SIZE - Constants.CHIBI_MARGIN
        };

        this.speakerLineStyle = {
            marginLeft: Constants.CHIBI_MARGIN,
            marginTop: Constants.DIALOGUE_TEXT_TOP_OFFSET,
            backgroundColor: (Constants.DEBUG > 1) ? "#3b55ff" : "none", 
            width: this.state.width,
            fontFamily: "sans-serif",
            fontSize: Constants.DIALOGUE_FONT_SIZE
        }
    }

    fromDialogueLineInfo(dialogueLineInfo) {
        console.log("text width: " + this.state.width);

        var speakerLineComponent = 
            <div style={this.speakerLineStyle}>
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

        this.singleSpeakerStyle = {
            marginBottom: Constants.SPEAKER_MARGIN,
            backgroundColor: (Constants.DEBUG > 1) ? "#061a99" : "none", 
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            //width: this.props.parentWidth //redundant
        }
    }

    fromDialogueLineInfo(dialogueLineInfo) {
        var chibiComponent = <ChibiSprite dialogueLineInfo={dialogueLineInfo} />;

        var speakerLineComponent = <SpeakerLine dialogueLineInfo={dialogueLineInfo}
                                                parentWidth={this.props.parentWidth} />;

        var singleSpeakerComponent = 
            <div style={this.singleSpeakerStyle}>
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
   dialogueInfo: JSON object with the dialogue that should be
                 rendered
   parentWidth : width of parent component (ContentBox)
   key: should initialize dialogue object with a key, since 
        it is in a list
   (no longer expects the margin)

   arggggh why is it so hard to spell dialogue :( */
class Dialogue extends Component {
    constructor(props) {
        super(props);

        this.state = {
            width: this.props.parentWidth - (2 * Constants.CONTENT_MARGIN)
        }

        this.fromDialogueInfo = this.fromDialogueInfo.bind(this);
        this.fromDialogueLineInfo = this.fromDialogueLineInfo.bind(this);

        this.dialogueStyle = {
            backgroundColor: (Constants.DEBUG > 1) ? "#328FA8" : "none", 
            width: this.state.width, 
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            margin: Constants.CONTENT_MARGIN
        };
        // Since this has a bottom margin and each SingleSpeaker also has
        // a bottom margin, this results in an extra margin at the bottom 
        // of each dialogue block.  We could fix it, but imo it will make
        // the code too unreadable to be worth it for such a small fix
    }

    fromDialogueLineInfo(dialogueLineInfo) {
        var dialogueLineComponent = 
            <SingleSpeaker parentWidth={this.state.width}
                           dialogueLineInfo={dialogueLineInfo} 
                           key={dialogueLineInfo.key}/>;

        return (dialogueLineComponent);
    }

    fromDialogueInfo(dialogueInfo) {
        var scriptInfo = dialogueInfo.script;
        var scriptComponents = scriptInfo.map(this.fromDialogueLineInfo);

        var dialogueComponent = 
            <div style={this.dialogueStyle}>
                {scriptComponents}
            </div>;

        return (dialogueComponent);
    }

    render () {
        return (this.fromDialogueInfo(this.props.dialogueInfo));
    }
}

export default Dialogue;