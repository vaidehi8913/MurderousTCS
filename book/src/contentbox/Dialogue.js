import React, { Component } from "react";
import octopusSprite from "../images/octopus_sprite.png";
import scientistSprite from "../images/scientist_sprite.png";

var CHIBI_SIZE = 400;
var CHIBI_MARGIN = 20; // margin between chibi image and dialogue text
var SPEAKER_MARGIN = 20; // bottom margin between one speaker and the next 
var DIALOGUE_TEXT_TOP_OFFSET = 40; // gap between top of chibi image and top of dialogue text

/* This wraps and renders the Chibi sprite image

   PROPS
   imgSource : chibi sprite image source   */
class ChibiSprite extends Component {

    render () {
        var chibiSpriteStyle = {
            width: CHIBI_SIZE,
            height: CHIBI_SIZE
        };

        var chibiImageStyle = {
            width: "100%",
            height: "auto"
        }

        return (
            <div style={chibiSpriteStyle}>
                <img src={this.props.imgSource} style={chibiImageStyle}/>
            </div>
        );
    }
}

/* This is the text associated with a single speaker (no chibi image)

    PROPS
    parentWidth: width of the parent container (SingleSpeaker)          
    text: text for line of dialogue                                 */
class SpeakerLine extends Component {

    render () {
        var speakerLineStyle = {
            marginLeft: CHIBI_MARGIN,
            marginTop: DIALOGUE_TEXT_TOP_OFFSET,
            /*backgroundColor: "#3b55ff",*/
            width: this.props.parentWidth - CHIBI_MARGIN,
            fontFamily: "sans-serif",
            fontSize: 48
        }

        return (
            <div style={speakerLineStyle}>
                {this.props.text}
            </div>
        );
    }
}

/* A single chibi sprite and associated text

    PROPS
    parentWidth: width of parent container (Dialogue)
    chibiSource: chibi image source 
    text: text for line of dialogue                 */
class SingleSpeaker extends Component {

    render () { 
        var singleSpeakerStyle = {
            marginBottom: SPEAKER_MARGIN,
            /*backgroundColor: "#061a99",*/
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start"
        }

        return (
            <div style={singleSpeakerStyle}>
                <ChibiSprite imgSource={this.props.chibiSource} />
                <SpeakerLine parentWidth={this.props.parentWidth} text={this.props.text} />
            </div>
        );
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
    }


    render () {
        var dialogueStyle = {
            /*backgroundColor: "#328FA8",*/
            width: this.state.width, 
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            margin: this.props.margin
        };

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
    }
}

export default Dialogue;