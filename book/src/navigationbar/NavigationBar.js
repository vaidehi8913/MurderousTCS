import React, { Component } from "react";
import * as Constants from "Constants";
import fullColorNavBarImg from "images/navbar/navbar-full-color.png";

class ChapterNavigator extends Component {
    constructor(props) {
        super(props);

        this.chapterNavigatorStyle = {
            //backgroundImage: fullColorNavBarImg,
            width: "100%",
            //height: "100%"
        };
    }

    render() {
        return (
            <img src={fullColorNavBarImg}
                style={this.chapterNavigatorStyle}
                alt={"chapter navigator goes here!"}/>
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
            //display: "flex",
            //flexDirection: "row",
            //justifyContent: "right"
        };
    }

    render () {
        return(
            <div style={this.navBarStyle} >
                <ChapterNavigator/>
            </div>
        );
    }
}

export default NavigationBar;