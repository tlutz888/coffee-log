import React, { Component} from "react";
import MainContainer from './containers/MainContainer'
import "./style.css";

class App extends Component{
  render(){
    return(
      <div className="App">
        <h1> Welcome to Coffee Log! </h1>
        <MainContainer/>
      </div>
    );
  }
}

export default App;
