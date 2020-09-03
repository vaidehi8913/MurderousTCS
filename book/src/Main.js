import React, { Component } from "react";
import {
    Route,
    //NavLink,
    HashRouter
} from "react-router-dom";

import Chapter from "Chapter";
import HomePage from "HomePage";

import chapter1Info from "chapter-jsons/chapter1.json";
import chapter2Info from "chapter-jsons/chapter2.json";
import chapter3Info from "chapter-jsons/chapter3.json";
import chapter4Info from "chapter-jsons/chapter4.json";
import chapter5Info from "chapter-jsons/chapter5.json";
import homeInfo from "chapter-jsons/home.json";

class Main extends Component {
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
        return (
            <HashRouter>
                <div>
                    <div className="pageContent">
                        <Route exact path="/" component={() => <HomePage homeInfo={homeInfo} />} />
                        {/* can change above to <Route exact path= ... to 
                            stop displaying the links on every page */}
                        <Route path="/chapter1" component={() => <Chapter chapterInfo={chapter1Info}
                                                                          windowWidth={this.state.windowWidth}
                                                                          windowHeight={this.state.windowHeight}/>}/>
                        <Route path="/chapter2" component={() => <Chapter chapterInfo={chapter2Info}
                                                                          windowWidth={this.state.windowWidth}
                                                                          windowHeight={this.state.windowHeight}/>}/>
                        <Route path="/chapter3" component={() => <Chapter chapterInfo={chapter3Info}
                                                                          windowWidth={this.state.windowWidth}
                                                                          windowHeight={this.state.windowHeight}/>}/>
                        <Route path="/chapter4" component={() => <Chapter chapterInfo={chapter4Info}
                                                                          windowWidth={this.state.windowWidth}
                                                                          windowHeight={this.state.windowHeight}/>}/>
                        <Route path="/chapter5" component={() => <Chapter chapterInfo={chapter5Info}
                                                                          windowWidth={this.state.windowWidth}
                                                                          windowHeight={this.state.windowHeight}/>}/>
                    </div>
                </div>
            </HashRouter>  
        );

        // fix this lol
    }
}
 
export default Main;