import React, { Component } from "react";
import { NavigationBar } from "navigation/NavigationBar";
import ContentBox from "contentbox/ContentBox";
import * as Constants from "Constants";

import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';

/*
    This container allows the extras bar and the content to scroll 
    seamlessly with each other

    PROPS:
    contentInfo
    windowHeight
    extrasWidth
    getEmail
    setEmail
*/
class ScrollBox extends Component {

   constructor(props) {
       super(props);

       this.scrollBoxStyle = {
           backgroundColor: (Constants.DEBUG > 0) ? "#6ae6c7" : "none",
           width: Constants.CONTENT_WIDTH + Constants.FEEDBACK_BUTTON_WIDTH 
	       + props.extrasWidth,   
           height: this.props.height,
           overflow: "auto"
       };

  }

   render () {
       return(
	   <ScrollSync>
	       <div style={this.scrollBoxStyle}>
	           <ScrollSyncPane>
	               <ContentBox contentInfo={this.props.contentInfo}
	       	           height={this.props.windowHeight}
	                   extrasWidth={this.props.extrasWidth}
	       	           getEmail={this.props.getEmail}
	       		   setEmail={this.props.setEmail}/>
       		   </ScrollSyncPane>
	       </div>
	   </ScrollSync>
       );
   }

}


/* The container for one chapter of our book.  This is everything
   that will show up on the webpage, including the left navigation
   bar, the center content box, and the right "extras" bar.

   PROPS: 
   chapterInfo: json object specifying chapter details and content
   windowHeight: Main can find this
   windowWidth: Main can get this
   setEmail
   getEmail
*/
class Chapter extends Component {

    constructor(props) {
        super(props);

        this.chapterStyle = {
            display: "flex",
            flexDirection: "row"
        }
    }

    render() {
        var sideBarWidth = (this.props.windowWidth - Constants.CONTENT_WIDTH
				- Constants.FEEDBACK_BUTTON_WIDTH) / 2;
        var contentBoxInfo = this.props.chapterInfo.content;
        var navBarInfo = this.props.chapterInfo.navigationBar;

        return (
            <div style={this.chapterStyle} key={this.props.chapterInfo.key}> 
		<NavigationBar width={sideBarWidth} 
                               navBarInfo={navBarInfo}/>
		<ScrollBox contentInfo={contentBoxInfo}
                           height={this.props.windowHeight}
                           extrasWidth={sideBarWidth} 
			   setEmail={this.props.setEmail}
			   getEmail={this.props.getEmail}/>
            </div>
        );
    }
}
 
export default Chapter;
