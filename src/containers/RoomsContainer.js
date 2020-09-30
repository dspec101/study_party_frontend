import React from "react";
// import roomsData from "../data.js/roomsdata.js";
import RoomList from "../components/RoomList";
import QuestionDisplay from "../components/QuestionDisplay.js";
import CommentsContainer from "./CommentsContainer.js";
import AnswersContainer from "./AnswersContainer.js";
import { Container, Col, Row, Jumbotron } from "react-bootstrap";

class RoomContainer extends React.Component {
  state = {
    rooms: [],
    currentRoom: null,
    questions: [],
    currentQuestion: null,
  };

  componentDidMount() {
    this.roomsFetch();
    this.questionsFetch();
  }

  roomsFetch = () => {
    fetch("http://localhost:3000/api/v1/parties")
      .then((response) => response.json())
      .then((data) => this.setState({ rooms: data }));
  };

  questionsFetch = () => {
    fetch("http://localhost:3000/api/v1/questions")
      .then((response) => response.json())
      .then((data) => this.setState({ questions: data }));
  };

  roomSelector = (id) => {
    let singleRoom = this.state.rooms.find((room) => room.id === id);
    this.setState({ currentRoom: singleRoom }, () => this.questionSelector());
  }

  questionSelector = () => {
    console.log(this.state.currentQuestion)
    let newArray = [...this.state.questions];
    let correctType = newArray.filter(
      (question) => question.category === this.state.currentRoom.category
    );
    let randomQuestion =
      correctType[Math.floor(Math.random() * correctType.length)];
    this.setState({ currentQuestion: randomQuestion }, () => {console.log(this.state.currentQuestion)});
  };

 
  render() {
    return (
      <Container>
        <div>
          {this.state.currentRoom ? (
            <>
              {" "}
              <Jumbotron style={{backgroundColor: "#f0edf5"}}>
                {" "}
                <h1> Welcome to {this.state.currentRoom.title} ! </h1>{" "}
              </Jumbotron>
              <Row>
                <Col md={5} style={{backgroundColor: "#f0edf5"}}>
                  <h5> Study Group Chat </h5>
                  <CommentsContainer id={this.state.currentRoom.id} userId={this.props.userRender()}/>
                </Col>
                <Col md={7}>
                  <div>
                    {this.state.currentQuestion ? (
                      <QuestionDisplay question={this.state.currentQuestion} />
                    ) : null}
                  </div>
                  {this.state.currentQuestion? 
                    <AnswersContainer questionId={this.state.currentQuestion.id} correctAnswer={this.state.currentQuestion.right_answer} userId={this.props.userRender()} questionSelector={this.questionSelector} answerDisplayFunction={this.answerDisplayFunction} />
                  : null }
                </Col>
              </Row>
            </>
          ) : (
            <RoomList
              data={this.state.rooms}
              roomSelector={this.roomSelector}
            />
          )}
        </div>
      </Container>
    );
  }
}

export default RoomContainer;
