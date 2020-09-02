import React, { Component } from "react";
import {
    Redirect
} from "react-router-dom";
import * as Constants from "Constants";

import fullColorNavBarImg from "images/navbar/full_color.png";
import chapter1NavBarImg from "images/navbar/chapter1.png";
import chapter2NavBarImg from "images/navbar/chapter2.png";
import chapter3NavBarImg from "images/navbar/chapter3.png";
import chapter4NavBarImg from "images/navbar/chapter4.png";
import chapter5NavBarImg from "images/navbar/chapter5.png";

/*  This is a space between elements in the nav bar.

    PROPS
    navSpacerInfo: JSON object specifying the spacing
*/
class NavSpacer extends Component {
    constructor(props){
        super(props);

        this.navSpacerStyle = {
            backgroundColor: (Constants.DEBUG > 1) ? "#eb6b34" : "none",
            height: Constants.MEDIUM_SPACER_SIZE // this needs to be changed to depend on the spacer info
        };
    }

    render() {
        return(
            <div style={this.navSpacerStyle} />
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
    of the navigation elements.

    PROPS
    parentWidth: width of the parent component (NavigationBar)
    chapterNumber: which chapter is this anyway?
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

        this.chapterNavigatorImageStyle = {
            width: "100%",
            height: "auto"
        };

        this.initializeImageRef = this.initializeImageRef.bind(this);
        this.chapterNavigatorClickHandler = this.chapterNavigatorClickHandler.bind(this);
        this.renderImage = this.renderImage.bind(this);

        this.state = {
            imageClicks: 0,
            chapter1Clicks: 0,
            chapter2Clicks: 0,
            chapter3Clicks: 0,
            chapter4Clicks: 0,
            chapter5Clicks: 0,
            clickAbsoluteXPosition: 0,
            clickAbsoluteYPosition: 0,
            clickRelativeXPosition: 0,
            clickRelativeYPosition: 0,
            imageXPosition: 0,
            imageYPosition: 0,
            chapterNavigatorRef: null,
            redirectToChapter1: false,
            redirectToChapter2: false,
            redirectToChapter3: false,
            redirectToChapter4: false,
            redirectToChapter5: false,
        }

        this.chapterBoundingBoxes = {
            // make your code modular, they said
            // if you have to keep copy-pasting, your code style is bad, they said
            oneTop: -10,
            oneBottom: 280,
            oneLeft: 60,
            oneRight: 940, 
            twoTop: 280,
            twoBottom: 560,
            twoLeft: 60,
            twoRight: 940,
            threeTop: 560, 
            threeBottom: 870,
            threeLeft: 60,
            threeRight: 940, 
            fourTop: 870,
            fourBottom: 1160,
            fourLeft: 60,
            fourRight: 940,
            fiveTop: 1160,
            fiveBottom: 1540,
            fiveLeft: 60,
            fiveRight: 940
        }

        this.chapterNavigatorRef = React.createRef();

        this.fromNavElementInfo = this.fromNavElementInfo.bind(this);
        this.fromNavBarInfo = this.fromNavBarInfo.bind(this);
        this.originalNavBarGenerator = this.originalNavBarGenerator.bind(this);
    }

    initializeImageRef(element) {
        this.setState({
            chapterNavigatorRef: element
        });
    }

    chapterNavigatorClickHandler(e) {

        var domrect = this.state.chapterNavigatorRef.getBoundingClientRect();

        var imgX = domrect.x;
        var imgY = domrect.y;

        this.setState({
            imageXPosition: imgX,
            imageYPosition: imgY
        });

        var relX = e.clientX - imgX;
        var relY = e.clientY - imgY;
        // originally I set this in the state, and referred
        // to it, but I think there is some weird issue 
        // where the state takes time to update, so clicks
        // were weirdly one step behind

        this.setState({
            clickAbsoluteXPosition: e.clientX,
            clickAbsoluteYPosition: e.clientY,
            clickRelativeXPosition: relX,
            clickRelativeYPosition: relY,
            imageClicks: this.state.imageClicks + 1
        });

        // These numbers still seem a little off when clicking 
        // around the screen (the top corner of the image) is 
        // registering a negative relative Y coordinate?  
        // Maybe this is why Kirupa's example had a loop?

        if (relX >= this.chapterBoundingBoxes.oneLeft 
            && relX <= this.chapterBoundingBoxes.oneRight 
            && relY >= this.chapterBoundingBoxes.oneTop 
            && relY <= this.chapterBoundingBoxes.oneBottom) {
            this.setState ({
                chapter1Clicks: this.state.chapter1Clicks + 1,
                redirectToChapter1: true
            });
        } else if (relX >= this.chapterBoundingBoxes.twoLeft 
            && relX <= this.chapterBoundingBoxes.twoRight 
            && relY >= this.chapterBoundingBoxes.twoTop 
            && relY <= this.chapterBoundingBoxes.twoBottom) {
            this.setState ({
                chapter2Clicks: this.state.chapter2Clicks + 1,
                redirectToChapter2: true
            });
        } else if (relX >= this.chapterBoundingBoxes.threeLeft 
            && relX <= this.chapterBoundingBoxes.threeRight 
            && relY >= this.chapterBoundingBoxes.threeTop 
            && relY <= this.chapterBoundingBoxes.threeBottom) {
            this.setState ({
                chapter3Clicks: this.state.chapter3Clicks + 1,
                redirectToChapter3: true
            });
        } else if (relX >= this.chapterBoundingBoxes.fourLeft 
            && relX <= this.chapterBoundingBoxes.fourRight 
            && relY >= this.chapterBoundingBoxes.fourTop 
            && relY <= this.chapterBoundingBoxes.fourBottom) {
            this.setState ({
                chapter4Clicks: this.state.chapter4Clicks + 1,
                redirectToChapter4: true
            });
        } else if (relX >= this.chapterBoundingBoxes.fiveLeft 
            && relX <= this.chapterBoundingBoxes.fiveRight 
            && relY >= this.chapterBoundingBoxes.fiveTop 
            && relY <= this.chapterBoundingBoxes.fiveBottom) {
            this.setState ({
                chapter5Clicks: this.state.chapter5Clicks + 1,
                redirectToChapter5: true
            });
        }
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


    renderImage() {
        var chapterNavigatorImgSource = fullColorNavBarImg;

        if (this.props.chapterNumber === 1) {
            chapterNavigatorImgSource = chapter1NavBarImg;
        } else if (this.props.chapterNumber === 2) {
            chapterNavigatorImgSource = chapter2NavBarImg;
        } else if (this.props.chapterNumber === 3) {
            chapterNavigatorImgSource = chapter3NavBarImg;
        } else if (this.props.chapterNumber === 4) {
            chapterNavigatorImgSource = chapter4NavBarImg;
        } else if (this.props.chapterNumber === 5) {
            chapterNavigatorImgSource = chapter5NavBarImg;
        }

        return(
            <img src={chapterNavigatorImgSource}
                 style={this.chapterNavigatorImageStyle}
                 onClick={this.chapterNavigatorClickHandler}
                 alt={"Chapter navigator image goes here!"}/>
        );
    }

    originalNavBarGenerator() {
        if (this.state.redirectToChapter1 && this.props.chapterNumber !== 1){
            return(<Redirect to="/chapter1"/>);
        } else if (this.state.redirectToChapter2 && this.props.chapterNumber !== 2){
            return(<Redirect to="/chapter2"/>);
        } if (this.state.redirectToChapter3 && this.props.chapterNumber !== 3){
            return(<Redirect to="/chapter3"/>);
        } if (this.state.redirectToChapter4 && this.props.chapterNumber !== 4){
            return(<Redirect to="/chapter4"/>);
        } if (this.state.redirectToChapter5 && this.props.chapterNumber !== 5){
            return(<Redirect to="/chapter5"/>);
        }

        var debugModeOutput;

        if (Constants.DEBUG > 2) {
            debugModeOutput = 
                <h1> {"Image clicks: " + this.state.imageClicks
                    + ", 1: " + this.state.chapter1Clicks
                    + ", 2: " + this.state.chapter2Clicks
                    + ", 3: " + this.state.chapter3Clicks
                    + ", 4: " + this.state.chapter4Clicks
                    + ", 5: " + this.state.chapter5Clicks
                    + ", absolute X: " + this.state.clickAbsoluteXPosition
                    + ", absolute Y: " + this.state.clickAbsoluteYPosition
                    + ", relative X: " + this.state.clickRelativeXPosition
                    + ", relative Y: " + this.state.clickRelativeYPosition
                    + ", element X: " + this.state.imageXPosition 
                    + ", element Y: " + this.state.imageYPosition
                    + ", ref:" + this.state.chapterNavigatorRef}</h1>;
        }

        return (
            <div style={this.chapterNavigatorStyle}
                ref={this.initializeImageRef}>
                {this.renderImage()}
                {debugModeOutput}
            </div>
        );
    }

    render() {
        console.log(this.fromNavBarInfo());

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
                <ChapterNavigator parentWidth={this.props.width}
                                  chapterNumber={chapterNumber}
                                  navBarInfo={this.props.navBarInfo}/>
            </div>
        );
    }
}

export default NavigationBar;