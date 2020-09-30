import React from "react";
import { Card, Button, CardDeck } from "react-bootstrap"


class AnswerComponent extends React.Component{

state={
    originalLikes: 0,
    updatedLikes: 0,
    user_name: ""
  }

  componentDidMount () {
    this.setState({originalLikes: this.props.answer.likes, updatedLikes: this.props.answer.likes})
    this.userForCard()
  }


  likeIncrementor = () => {
    let newLikes = this.state.updatedLikes+1
      fetch(`http://localhost:3000/api/v1/answers/${this.props.answer.id}` , {
        method: "PATCH",
        headers: {
        "content-type": "application/json",
        "accept": "application/json"
    },
    body: JSON.stringify({likes: newLikes})})
    .then(resp => resp.json())
    // .then(data => console.log("responsedata", data))}
    .then(likesData => this.setState({updatedLikes: likesData.likes}))
    this.props.getData() }
 
    likesDecider = () => {
        if (this.state.originalLikes === this.state.updatedLikes) {
            return this.state.originalLikes
        }
        else {
        return this.state.updatedLikes
    }}

      userForCard = () => {
        fetch(`http://localhost:3000/api/v1/propper-user/${this.props.answer.id}`)
        .then(resp => resp.json())
        .then(user => this.setState({ user_name: user.title}))
    }



    // left to do:

    // routes 
    // profile to edit 
    // about us section?
    // login authenitcation



    render() {
        return (
            <div>
            <CardDeck> 
            <Card style={{ width: '15rem', marginBottom:"15px", borderColor:"coral" }} > 
            <Card.Body>
              <Card.Header> <strong> Answer from {this.state.user_name} </strong> </Card.Header>
              <Card.Title> {this.props.answer.selection}  </Card.Title>
              <Card.Text>
              {this.props.answer.explanation}
              </Card.Text>
              <Card.Subtitle> Likes: {this.likesDecider()} </Card.Subtitle>
              <Button className="likes-button" type="click" variant="light" onClick={this.likeIncrementor} bg="dark" >
              &#10084;
              </Button>
            </Card.Body>
            <Card.Footer> Created: {this.props.answer.formatted_time} </Card.Footer>
          </Card>
          </CardDeck>
            </div>
            );
    }


}

export default AnswerComponent;