import React, { Component } from "react";
import picture from "./clickable_sample.jpg";
import speechBubbleImg from "./speech_bubble.jpg";

class SpeechBubble extends Component {
    render () {
        var speechBubbleStyle = {
            position: "relative",
            top: 896,
            left: 641,
            width: 400,
            height: 250,
            backgroundImage: "url(" + speechBubbleImg + ")" 
        };

        return (
            <div style={speechBubbleStyle} />
        );
    }
}
class ClickableKite extends Component {
    constructor(props) {
        super(props);

        this.clickHandler = this.clickHandler.bind(this);

        this.state = {
            panelClicks: 0,
            imageClicks: 0,
            xPosition: 0,
            yPosition: 0,
            panelIsClicked: false
        };
    }

    clickHandler (e) {
       this.setState({
            xPosition: e.clientX,
            yPosition: e.clientY,
            imageClicks: this.state.imageClicks + 1
       });

       var minX = 625;
       var maxX = 1097;
       var minY = 1174;
       var maxY = 1528;

       if (e.clientX >= minX && e.clientX <= maxX
            && e.clientY >= minY && e.clientY <= maxY) {

                this.setState({
                    panelClicks: this.state.panelClicks + 1,
                    panelIsClicked: ! this.state.panelIsClicked
                });
        }
    }

    render () {

        var kitePictureStyle = {
            backgroundImage: "url(" + picture + ")" ,
            height: 2220,
            width: 1667
        };

        var condSpeechBubble;

        if (this.state.panelIsClicked) {
            condSpeechBubble = <SpeechBubble/>;
        }

        return(
            <div>
                <div style={kitePictureStyle} onClick={this.clickHandler}>
                    {condSpeechBubble}
                </div>
                {<h1>{"Panel clicks: " + this.state.panelClicks 
                        + ", Image clicks: " + this.state.imageClicks
                        + ", X Position: " + this.state.xPosition 
                        + ", Y Position: " + this.state.yPosition}</h1>}
            </div>
        );
    }
}
 
export default ClickableKite;