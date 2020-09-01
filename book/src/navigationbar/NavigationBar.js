import React, { Component } from "react";
import * as Constants from "Constants";
import fullColorNavBarImg from "images/navbar/full-color.png";

/*  This displays the clickable image that allows the user to 
    move from chapter to chapter

    PROPS
    parentWidth: width of the parent component (NavigationBar)
*/
class ChapterNavigator extends Component {
    constructor(props) {
        super(props);

        this.chapterNavigatorStyle = {
            backgroundColor: (Constants.DEBUG > 1) ? "#ffae00" : "none",
            width: Constants.CHAPTER_NAVIGATOR_WIDTH
        };

        this.chapterNavigatorImageStyle = {
            width: "100%",
            height: "auto"
        };

        this.chapterNavigatorClickHandler = this.chapterNavigatorClickHandler.bind(this);

        this.state = {
            imageClicks: 0,
            chapter1Clicks: 0,
            chapter2Clicks: 0,
            chapter3Clicks: 0,
            chapter4Clicks: 0,
            chapter5Clicks: 0,
            relativeXPosition: 0,
            relativeYPosition: 0
        }
    }

    chapterNavigatorClickHandler(e) {
        this.setState({
            relativeXPosition: e.clientX /*- (this.props.parentWidth - Constants.CHAPTER_NAVIGATOR_WIDTH)*/,
            relativeYPosition: e.clientY,
            imageClicks: this.state.imageClicks + 1
        });
    }

    render() {
        var debugModeOutput;

        if (Constants.DEBUG > 2) {
            debugModeOutput = 
                <h1> {"Image clicks: " + this.state.imageClicks
                    + ", 1: " + this.state.chapter1Clicks
                    + ", 2: " + this.state.chapter2Clicks
                    + ", 3: " + this.state.chapter3Clicks
                    + ", 4: " + this.state.chapter4Clicks
                    + ", 5: " + this.state.chapter5Clicks
                    + ", X: " + this.state.relativeXPosition
                    + ", Y: " + this.state.relativeYPosition}</h1>;
        }

        return (
            <div style={this.chapterNavigatorStyle}>
                <img src={fullColorNavBarImg}
                     style={this.chapterNavigatorImageStyle}
                     onClick={this.chapterNavigatorClickHandler}
                     alt={"Chapter navigator image goes here!"}/>
                {debugModeOutput}
            </div>
        );
    }
}

/* Wrapper component for the whole left navigation bar.

    PROPS (eventually)
    width: width of the navbar, calculated at the parent 
           level (Chapter)
    chapterNumber: to tell the navbar which chapter to
                   hightlight
*/
class NavigationBar extends Component {
    constructor(props) {
        super(props);

        this.navBarStyle = {
            backgroundColor: (Constants.DEBUG > 0) ? "#fff5a8" : "none",
            width: this.props.width,
            display: "flex",
            flexDirection: "row-reverse"
        };
    }

    render () {
        return(
            <div style={this.navBarStyle} >
                <ChapterNavigator parentWidth={this.props.width}/>
            </div>
        );
    }
}

export default NavigationBar;