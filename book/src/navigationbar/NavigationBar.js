import React, { Component } from "react";
import {
    Redirect
} from "react-router-dom";
import * as Constants from "Constants";

/*  This is a space between elements in the nav bar.

    PROPS
    navSpacerInfo: JSON object specifying the spacing
*/
class NavSpacer extends Component {
    constructor(props){
        super(props);
    }

    render() {
        var navSpacerHeight;

        if (this.props.navSpacerInfo.size === "small") {
            navSpacerHeight = Constants.SMALL_SPACER_SIZE;
        } else if (this.props.navSpacerInfo.size === "medium") {
            navSpacerHeight = Constants.MEDIUM_SPACER_SIZE;
        } else if (this.props.navSpacerInfo.size === "large") {
            navSpacerHeight = Constants.LARGE_SPACER_SIZE;
        } else {
            navSpacerHeight = 0;

            if (Constants.DEBUG > 2) {
                console.log("Spacer does not have valid \"size\" field.");
            }
        }

        var navSpacerStyle = {
            backgroundColor: (Constants.DEBUG > 1) ? "#eb6b34" : "none",
            height: navSpacerHeight
        };

        return(
            <div style={navSpacerStyle} />
        );
    }
}

/*  This is one clickable image in the nav bar.

    PROPS
    navImageElementInfo: JSON object containing information
                         about this navImageElement
*/
class NavImageElement extends Component {
    constructor(props) {
        super(props);

        this.navImageElementStyle = {
            width: "100%",
            height: "auto"
        };

        this.state = {
            isClicked: false,
            isHovering: false
        }

        this.onHover = this.onHover.bind(this);
        this.offHover = this.offHover.bind(this);
        this.onClick = this.onClick.bind(this);

        this.fromNavImageElementInfo = this.fromNavImageElementInfo.bind(this);
    }

    onHover() {
        this.setState({
            isHovering: true
        });
    }

    offHover() {
        this.setState({
            isHovering: false
        });
    }

    onClick(e) {
        this.setState({
            isClicked: true
        });
    }

    fromNavImageElementInfo() {
        var navImageElementInfo = this.props.navImageElementInfo;
        var basicImageSrc = require("images/" + navImageElementInfo.basicImage);
        var hasHoverBehavior, hoverImageSrc, hoverText;
        var hasLinkBehavior, linkOnClick;
        var imageDescription = navImageElementInfo.imageDescription;

        if (navImageElementInfo.hoverImage === null) {
            hasHoverBehavior = false;
        } else {
            hasHoverBehavior = true;
            //hoverImageSrc = require("images/" + navImageElementInfo.hoverImage);
            hoverText = navImageElementInfo.hoverText;
        }

        if (navImageElementInfo.linkOnClick === null) {
            hasLinkBehavior = false;
        } else {
            hasLinkBehavior = true;
            linkOnClick = navImageElementInfo.linkOnClick;
        }

        if (this.state.isClicked && hasLinkBehavior) {
            return <Redirect to={linkOnClick} />;
        } else if (this.state.isHovering && hasHoverBehavior) {
            return(
                <img src={hoverImageSrc}
                    style={this.navImageElementStyle}
                    onClick={this.onClick}
                    alt={imageDescription}/>
            );
        } else {
            return(
                <img src={basicImageSrc}
                    style={this.navImageElementStyle}
                    onClick={this.onClick}
                    alt={imageDescription}/>
            );
        }
    }

    render() {
        return (this.fromNavImageElementInfo());
    }

}

/*  The right-aligned part of the navbar that contains all
    of the navigation elements. (Though the actual right-
    alignment comes from one step up.)

    PROPS
    navBarInfo: a JSON object that contains information about
                what the navbar includes
*/
class ChapterNavigator extends Component {
    constructor(props) {
        super(props);

        this.chapterNavigatorStyle = {
            backgroundColor: (Constants.DEBUG > 1) ? "#ffae00" : "none",
            width: Constants.CHAPTER_NAVIGATOR_WIDTH,
            display: "flex",
            flexDirection: "column"
        };

        this.fromNavElementInfo = this.fromNavElementInfo.bind(this);
        this.fromNavBarInfo = this.fromNavBarInfo.bind(this);
    }

    fromNavElementInfo(navElementInfo) {
        if (navElementInfo.type === "imageElement") {
            return (
                <NavImageElement navImageElementInfo={navElementInfo} 
                                 key={navElementInfo.key} />
            );
        } else // (navElementInfo.type === "spacer") 
        {
            return (
                <NavSpacer navSpacerInfo={navElementInfo} 
                           key={navElementInfo.key}/>
            );
        }
    }

    fromNavBarInfo() {
        const navBarElements = this.props.navBarInfo.navBarElements;
        const navBarComponents = navBarElements.map(this.fromNavElementInfo);

        return(
            <div style={this.chapterNavigatorStyle}>
                {navBarComponents}
            </div>
        );
    }

    render() {
        return(
            this.fromNavBarInfo()
        );
    }
}

/* Wrapper component for the whole left navigation bar.

    PROPS (eventually)
    width: width of the navbar, calculated at the parent 
           level (Chapter)
    navBarInfo: a JSON file with information about the 
                navigation bar
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
        var chapterNumber = this.props.navBarInfo.chapterNumber;

        return(
            <div style={this.navBarStyle} >
                <ChapterNavigator navBarInfo={this.props.navBarInfo}/>
            </div>
        );
    }
}

export {
    ChapterNavigator, // the chapters don't use this directly, but the home page does.
    NavigationBar
};