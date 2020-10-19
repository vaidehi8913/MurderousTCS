import React, { Component } from "react";
import { NavigationBar } from "navigationbar/NavigationBar";
import ContentBox from "contentbox/ContentBox";
import * as Constants from "Constants";
import ExtrasBar from "./extrasbar/ExtrasBar";

import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';

/*
    This container allows the extras bar and the content to scroll 
    seamlessly with each other

    PROPS:
    contentInfo
    windowHeight
    extrasWidth
*/
class ScrollBox extends Component {

   constructor(props) {
       super(props);

       this.scrollBoxStyle = {
           backgroundColor: (Constants.DEBUG > 0) ? "#6ae6c7" : "none",
           width: Constants.CONTENT_WIDTH + props.extrasWidth,  
           display: "flex",
           flexDirection: "row",
           height: this.props.height,
           overflow: "auto"
       };
   }

   render () {

        if (Constants.DEBUG > 2) {
            console.log("I'm here!!!");
        }

       return(
           <ScrollSync>
                <div style={this.scrollBoxStyle}>
                    <ScrollSyncPane>
                        <ContentBox contentInfo={this.props.contentInfo} 
                                    height={this.props.windowHeight}
                                    extrasWidth={this.props.extrasWidth}/>
                    </ScrollSyncPane>

                    <ScrollSyncPane>
                        <ExtrasBar width={this.props.extrasWidth} />
                    </ScrollSyncPane>
                </div>
           </ScrollSync>
       );
   }

}


/* Sample syncing from README of the ScrollSync package */
class SyncBox extends Component {
    
    render() {
    return(
      <ScrollSync>
        <div style={{ display: 'flex', position: 'relative', height: 300 }}>
          <ScrollSyncPane>
            <div style={{overflow: 'auto'}}>
              <section style={{ height: 500 }}>
                <h1>Left Pane Content</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam doloribus
                  dolorum
                  est eum eveniet exercitationem iste labore minus, neque nobis odit officiis omnis
                  possimus quasi rerum sed soluta veritatis.</p>
              </section>
            </div>
          </ScrollSyncPane>

          <ScrollSyncPane>
            <div style={{overflow: 'auto'}}>
              <section style={{ height: 1000 }}>
                <h1>Middle Pane Content</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam doloribus
                  dolorum
                  est eum eveniet exercitationem iste labore minus, neque nobis odit officiis omnis
                  possimus quasi rerum sed soluta veritatis.</p>
              </section>
            </div>
          </ScrollSyncPane>

          <ScrollSyncPane>
            <div style={{overflow: 'auto'}}>
              <section style={{ height: 2000 }}>
                <h1>Right Pane Content</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam doloribus
                  dolorum
                  est eum eveniet exercitationem iste labore minus, neque nobis odit officiis omnis
                  possimus quasi rerum sed soluta veritatis.</p>
              </section>
            </div>
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
                <ScrollBox contentInfo={contentBoxInfo}
                           height={this.props.windowHeight}
                           extrasWidth={sideBarWidth} />
            </div>
        );
    }
}
 
export default Chapter;