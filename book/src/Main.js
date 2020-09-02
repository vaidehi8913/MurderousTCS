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
  render() {
    return (
        <HashRouter>
            <div>
                <div className="pageContent">
                    <Route exact path="/" component={() => <HomePage homeInfo={homeInfo} />} />
                    {/* can change above to <Route exact path= ... to 
                        stop displaying the links on every page */}
                    <Route path="/chapter1" component={() => <Chapter chapterInfo={chapter1Info}/>}/>
                    <Route path="/chapter2" component={() => <Chapter chapterInfo={chapter2Info}/>}/>
                    <Route path="/chapter3" component={() => <Chapter chapterInfo={chapter3Info}/>}/>
                    <Route path="/chapter4" component={() => <Chapter chapterInfo={chapter4Info}/>}/>
                    <Route path="/chapter5" component={() => <Chapter chapterInfo={chapter5Info}/>}/>
                </div>
            </div>
        </HashRouter>  
    );
  }
}
 
export default Main;