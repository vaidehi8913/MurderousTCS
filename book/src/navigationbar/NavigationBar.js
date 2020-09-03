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

        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onClick = this.onClick.bind(this);

        this.fromNavImageElementInfo = this.fromNavImageElementInfo.bind(this);
    }

    onMouseEnter() {
        this.setState({
            isHovering: true
        });
    }

    onMouseLeave() {
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
        var hasHoverBehavior, hoverImageSrc; //, hoverText;
        var hasLinkBehavior, linkOnClick;
        var imageDescription = navImageElementInfo.imageDescription;

        if (navImageElementInfo.hasOwnProperty('hoverImage')) {
            hasHoverBehavior = true;

            if (Constants.DEBUG > 2) {
                var debugString2 = "Navbar hover image path: " + navImageElementInfo.hoverImage;
                console.log(debugString2);
            }
            hoverImageSrc = require("images/" + navImageElementInfo.hoverImage);
            //hoverText = navImageElementInfo.hoverText;
            
        } else {
            if (Constants.DEBUG > 2) {
                var debugString1 = "Does this ever happen?";
                console.log(debugString1);
            }

            hasHoverBehavior = false;
        }

        if (navImageElementInfo.hasOwnProperty('linkOnClick')) {
            hasLinkBehavior = true;
            linkOnClick = navImageElementInfo.linkOnClick;
        } else {
            hasLinkBehavior = false;
        }

        if (this.state.isClicked && hasLinkBehavior) {
            return <Redirect to={linkOnClick} />;
        } else if (this.state.isHovering && hasHoverBehavior) {
            return(
                <img src={hoverImageSrc}
                    style={this.navImageElementStyle}
                    onClick={this.onClick}
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                    alt={imageDescription}/>
            );
        } else {
            return(
                <img src={basicImageSrc}
                    style={this.navImageElementStyle}
                    onClick={this.onClick}
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
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
    parentWidth
*/
class ChapterNavigator extends Component {
    constructor(props) {
        super(props);

        this.chapterNavigatorStyle = {
            backgroundColor: (Constants.DEBUG > 1) ? "#ffae00" : "none",
            width: (Constants.CHAPTER_NAVIGATOR_WIDTH < this.props.parentWidth)
                   ? Constants.CHAPTER_NAVIGATOR_WIDTH
                   : this.props.parentWidth,
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
        return(
            <div style={this.navBarStyle} >
                <ChapterNavigator navBarInfo={this.props.navBarInfo}
                                  parentWidth={this.navBarStyle.width}/>
            </div>
        );
    }
}

export {
    ChapterNavigator, // the chapters don't use this directly, but the home page does.
    NavigationBar
};