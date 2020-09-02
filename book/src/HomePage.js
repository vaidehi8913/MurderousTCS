import React, { Component } from "react";

import * as Constants from "Constants";
import { ChapterNavigator } from "navigationbar/NavigationBar";

/*  The component that shows up at the path "/"

    PROPS
    parentWidth
    homeInfo 
*/
class HomePage extends Component {
    constructor(props) {
        super(props);

        this.homePageStyle = {
            backgroundColor: (Constants.DEBUG > 0) ? "#7ab577" : "none",
            width: this.props.parentWidth,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }
    }

    render() {
        var navBarInfo = this.props.homeInfo.navigationBar;

        return (
            <ChapterNavigator navBarInfo={navBarInfo} />
        );
    }
}

export default HomePage;