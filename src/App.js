import React from "react";
import RoomsContainer from "./containers/RoomsContainer";
import "./App.css";
import MyNav from "./components/MyNav";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import { 
  Route, Switch, Redirect, withRouter } from "react-router-dom"

class App extends React.Component {
  state = {
    loggedIn: false,
    userObj: {},
    user_title: ""
  };

  handleSubmit = (user) => {
    fetch(`http://localhost:3000/api/v1/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({user}),
    })
      .then((resp) => resp.json())
      // .then(data => console.log('userdata', data))}
      .then((resp) => this.setState({ loggedIn: true, userObj: resp, user_title: user.title }));
  };

  userRender = () =>{
    let userObj = this.state.userObj
    return userObj.id
  }

  render() {
    console.log(this.state.loggedIn)
    return (
        <div className="App">
        <header className="App-header">
        <MyNav user={this.state.user_title} />
        </header>
        {this.state.loggedIn?
        <RoomsContainer userRender={this.userRender} />  
        :
        <Login handleSubmit={this.handleSubmit} /> 
         } 
         </div>  
    );
  }
}
export default App
