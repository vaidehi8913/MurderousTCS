import React, { Component } from "react";
//import octopusSprite from "../images/octopus_sprite.png";
//import scientistSprite from "../images/scientist_sprite.png";

var CHIBI_SIZE = 400;
var CHIBI_MARGIN = 20; // margin between chibi image and dialogue text
var SPEAKER_MARGIN = 20; // bottom margin between one speaker and the next 
var DIALOGUE_TEXT_TOP_OFFSET = 40; // gap between top of chibi image and top of dialogue text
var DIALOGUE_FONT_SIZE = 48;

/* This wraps and renders the Chibi sprite image

   PROPS
   imgSource : chibi sprite image source   
   
   OR
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

        var chibiImageSource = require ("images/" + dialogueLineInfo.chibiImage);

        var chibiSpriteComponent = 
            <div style={chibiSpriteStyle}>
                <img src={chibiImageSource} 
                     style={chibiImageStyle} 
                     alt={dialogueLineInfo.chibiDescription}/>
            </div>;

        return (chibiSpriteComponent);
    }

    render () {
        var chibiSpriteStyle = {
            width: CHIBI_SIZE,
            height: CHIBI_SIZE
        };

        var chibiImageStyle = {
            width: "100%",
            height: "auto"
        }

        /* TODO: set alt to be more descriptive */
        if (this.props.dialogueLineInfo == null) {
            return (
                <div style={chibiSpriteStyle}>
                    <img src={this.props.imgSource} style={chibiImageStyle} alt={"chibi"}/>
                </div>
            );
        } else {
            return (this.fromDialogueLineInfo(this.props.dialogueLineInfo));
        }
    }
}

/* This is the text associated with a single speaker (no chibi image)

    PROPS
    parentWidth: width of the parent container (SingleSpeaker)          
    text: text for line of dialogue                                 
    
    OR
    parentWidth: width of the parent container (SingleSpeaker) 
    dialogueLineInfo: JSON object with info about the dialogueLine

    TO DO: There's some issue here where the width is not being passed 
    down correctly
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
        var speakerLineStyle = {
            marginLeft: CHIBI_MARGIN,
            marginTop: DIALOGUE_TEXT_TOP_OFFSET,
            /* backgroundColor: "#3b55ff", // for debugging */
            width: this.props.parentWidth - CHIBI_MARGIN,
            fontFamily: "sans-serif",
            fontSize: DIALOGUE_FONT_SIZE
        }

        if (this.props.dialogueLineInfo == null) {
        return (
            <div style={speakerLineStyle}>
                {this.props.text}
            </div>
        );
        } else {
            return this.fromDialogueLineInfo(this.props.dialogueLineInfo);
        }
    }
}

/* A single chibi sprite and associated text

    PROPS
    parentWidth: width of parent container (Dialogue)
    chibiSource: chibi image source 
    text: text for line of dialogue                 
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
        var singleSpeakerStyle = {
            marginBottom: SPEAKER_MARGIN,
            /*backgroundColor: "#061a99", // for debugging */
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start"
        }

        if (this.props.dialogueLineInfo == null) {
            return (
                <div style={singleSpeakerStyle}>
                    <ChibiSprite imgSource={this.props.chibiSource} />
                    <SpeakerLine parentWidth={this.props.parentWidth} text={this.props.text} />
                </div>
            );
        } else {
            return (this.fromDialogueLineInfo(this.props.dialogueLineInfo));
        }
    }

}

/* This class encapsulates a chunk of dialogue (multiple 
   speakers)

   WISHLIST: Eventually we should pass in dialogue info in
   a standard JSON format, and have this parse and format it.

   PROPS
   parentWidth : width of parent component (ContentBox)

   everything else is currently hardcoded in (see wishlist)

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
        var dialogueStyle = {
            /*backgroundColor: "#328FA8", // for debugging */
            width: this.state.width, 
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            margin: this.props.margin
        };

        /*if (this.props.dialogueInfo == null) {
            return(
                <div style={dialogueStyle}>
                    <SingleSpeaker parentWidth={this.state.width}
                                chibiSource={scientistSprite}
                                text={"Who on earth are you? And why are you bothering me while I am working on my greatest invention?"} />
                    <SingleSpeaker parentWidth={this.state.width}
                                chibiSource={octopusSprite}
                                text={"I think you mean OUR greatest invention!"} />
                </div>
            );
        } else {*/
            return (this.fromDialogueInfo(this.props.dialogueInfo));
        //}
    }
}

export default Dialogue;