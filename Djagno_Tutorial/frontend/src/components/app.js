import React, {Component} from "react";
import {render} from "react-dom";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import HomePage from "./homepage";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Redirect
} 
from "react-router-dom";

export default class App extends Component{
    constructor(props){
        super(props);
    }

    render (){
        //return <h1>Helo World</h1>;
        //return <HomePage/>;
        return <Router> 
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path = '/LogIn/' element={<LogIn />}>  </Route>
                <Route path = '/SignUp/' element={ <SignUp />}>  </Route>
            </Routes>
        </Router>
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);