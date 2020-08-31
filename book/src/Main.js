import React, { Component } from "react";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import Chapter from "Chapter";

import chapter1Info from "chapter-jsons/chapter1.json";
import chapter2Info from "chapter-jsons/chapter2.json";
 
class HomePage extends Component {
    render() {
        return (
            <div>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/chapter1">Chapter 1</NavLink></li>
                <li><NavLink to="/chapter2">Chapter 2</NavLink></li>
            </div>
        );
    }
}

class Main extends Component {
  render() {
    return (
        <HashRouter>
            <div>
                <div className="pageContent">
                    <Route path="/" component={HomePage} />
                    {/* can change above to <Route exact path= ... to 
                        stop displaying the links on every page */}
                    <Route path="/chapter1" component={() => <Chapter chapterInfo={chapter1Info}/>}/>
                    <Route path="/chapter2" component={() => <Chapter chapterInfo={chapter2Info}/>}/>
                </div>
            </div>
        </HashRouter>  
    );
  }
}
 
export default Main;