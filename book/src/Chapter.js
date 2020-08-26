import React, { Component } from "react";
import NavigationBar from "./navigationbar/NavigationBar";
import ContentBox from "./contentbox/ContentBox";
import ExtrasBar from "./extrasbar/ExtrasBar";
 
var CONTENT_WIDTH = 2000;

/* The container for one chapter of our book.  This is everything
   that will show up on the webpage, including the left navigation
   bar, the center content box, and the right "extras" bar.

   PROPS: none for now
   
   WISHLIST: eventually we need to pass in some JSON-like argument
   that includes all of the chapter content.  Then we can use this
   to format each chapter individually.  For now, we hardcode one
   chapter.                                                         */
class Chapter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        }

        this.updateDimensions = this.updateDimensions.bind(this);
    }

    updateDimensions() {
        this.setState({
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        });
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions)
    }

    fromJSON(jsonString) {
        var chapterData = JSON.parse(jsonString);
        return chapterData;
    }

    render() {
        var sideBarWidth = (this.state.windowWidth - CONTENT_WIDTH) / 2;

        var chapterStyle = {
            display: "flex",
            flexDirection: "row"
        }

        return (
        <div style={chapterStyle} > 
            <NavigationBar width={sideBarWidth} />
            <ContentBox width={CONTENT_WIDTH} />
            <ExtrasBar width={sideBarWidth} />
        </div>
        );
    }
}
 
export default Chapter;