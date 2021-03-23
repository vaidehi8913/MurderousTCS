import React, { Component } from "react";
import * as Constants from "Constants";

import Div3Machine from "intercomps/Div3Machine";

/* 

	PROPS
	contentInfo
*/
class Interactive extends Component {
    constructor(props) {
        super(props);

		this.interactiveComponentStyle = {
			backgroundColor: (Constants.DEBUG > 2) ? "#6c42f5" : "none"
		}
    }

    render () {

		var cI = this.props.contentInfo;

		var interComp;

		if (cI.interactionID === "sample") {
			/*interComp = <div style={this.interactiveComponentStyle}> 
							Girls! I have a totally interactive component! 
						</div>*/
			interComp = <Div3Machine/>;

		} else {
			interComp = <div style={this.interactiveComponentStyle}> 
							{cI.interactionID} is not a valid interaction ID!
						</div>
		}
 
		return(interComp);
    }

}

export default Interactive;
