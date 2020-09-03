import React, { Component } from "react";
import { NavigationBar } from "navigationbar/NavigationBar";
import ContentBox from "contentbox/ContentBox";
import ExtrasBar from "extrasbar/ExtrasBar";
import * as Constants from "Constants";

/* The container for one chapter of our book.  This is everything
   that will show up on the webpage, including the left navigation
   bar, the center content box, and the right "extras" bar.

   PROPS: 
   chapterInfo: json object specifying chapter details and content
   windowHeight: Main can find this
   windowWidth: Main can get this                                   */
class Chapter extends Component {

    constructor(props) {
        super(props);

        this.chapterStyle = {
            display: "flex",
            flexDirection: "row"
        }
    }

    render() {
        var sideBarWidth = (this.props.windowWidth - Constants.CONTENT_WIDTH) / 2;
        var contentBoxInfo = this.props.chapterInfo.content;
        var navBarInfo = this.props.chapterInfo.navigationBar;

        return (
            <div style={this.chapterStyle} key={this.props.chapterInfo.key}> 
                <NavigationBar width={sideBarWidth} 
                               navBarInfo={navBarInfo}/>
                <ContentBox contentInfo={contentBoxInfo}
                            height={this.props.windowHeight}
                            extrasWidth={sideBarWidth}/>
            </div>
        );
    }
}
 
export default Chapter;