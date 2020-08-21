import React, { Component } from "react";
import NavigationBar from "./NavigationBar";
import ContentBox from "./ContentBox";
import ExtrasBar from "./ExtrasBar";
 
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

    render() {
        var contentWidth = 2000;
        var sideBarWidth = (this.state.windowWidth - contentWidth) / 2;

        var chapterStyle = {
            display: "flex",
            flexDirection: "row"
        }

        return (
        <div style={chapterStyle} > 
            <NavigationBar width={sideBarWidth} />
            <ContentBox width={contentWidth} />
            <ExtrasBar width={sideBarWidth} />
        </div>
        );
    }
}
 
export default Chapter;