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

        this.chapterStyle = {
            display: "flex",
            flexDirection: "row"
        }
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

    render() {
        var sideBarWidth = (this.state.windowWidth - Constants.CONTENT_WIDTH) / 2;
        var contentBoxInfo = this.props.chapterInfo.contentBox;
        var navBarInfo = this.props.chapterInfo.navigationBar;

        return (
            <div style={this.chapterStyle} key={this.props.chapterInfo.key}> 
                <NavigationBar width={sideBarWidth} 
                               navBarInfo={navBarInfo}/>
                <ContentBox width={Constants.CONTENT_WIDTH} 
                            contentInfo={contentBoxInfo}/>
                <ExtrasBar width={sideBarWidth} />
            </div>
        );
    }
}
 
export default Chapter;