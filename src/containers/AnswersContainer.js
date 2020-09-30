import React from "react";
import AnswerComponent from "../components/AnswerComponent.js";
import AnswerForm from "../components/AnswerForm.js";
import { Button, Card, CardDeck } from "react-bootstrap";

class AnswersContainer extends React.Component {
  state = {
    questionAnswers: [],
    userAnswer: {},
    submitted: false,
    reSort: true,
    updateClicked: false,
    sortedQuestionAnswers: [],
    finalAnswer: false
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    fetch(
      `http://localhost:3000/api/v1/previous-answers/${this.props.questionId}`
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState({ questionAnswers: data }, () => {
          this.sortedDisplayAnswers();
        })
      );
  };

  answerSubmitHandler = (object) => {
    console.log(object);
    if (this.state.updateClicked === false) {
      fetch("http://localhost:3000/api/v1/answers", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          user_id: this.props.userId,
          question_id: this.props.questionId,
          selection: object.selection,
          explanation: object.explanation,
          likes: 0,
        }),
      })
        .then((response) => response.json())
        .then((data) =>
          this.setState({
            submitted: true,
            userAnswer: data,
            questionAnswers: [...this.state.questionAnswers, data],
          })
        );
    } else {
      fetch(
        `http://localhost:3000/api/v1/answers/${this.state.userAnswer.id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({
            selection: object.selection,
            explanation: object.explanation,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) =>
          this.setState({
            submitted: true,
            userAnswer: data,
            questionAnswers: [...this.state.questionAnswers, data],
            updateClicked: false,
          })
        );
    }
  };

  sortedDisplayAnswers = () => {
    let sortedQuestionAnswers = this.state.questionAnswers.sort(
      (qaObjA, qaObjB) => qaObjB.likes - qaObjA.likes
    );
    this.setState({ sortedQuestionAnswers: sortedQuestionAnswers });
  };

  updateClickHandler = () => {
    this.setState({ updateClicked: true });
  };

  finalSubmitHandler = () => {
    this.setState({ finalAnswer: !this.state.finalAnswer, submitted: false });
  }

  refresh = () => {
    this.finalSubmitHandler()
    this.props.questionSelector()
    this.setState({userAnswer: {}})
  }

  render() {
    console.log(this.state.userAnswer)
    return (
      <>
      {this.state.finalAnswer === true?
      <>
      <p> Correct Answer: {this.props.correctAnswer}  </p>
      <Button onClick={this.refresh} bg="dark" >
      {" "}
       Next Question {" "}
    </Button>
    </>
     :
     <>
        {this.state.submitted === true && this.state.updateClicked === false ? (
          <div>
            <CardDeck> 
            <Card className="answer-card" style={{ width: "15rem", marginBottom:"15px" }} >
              <Card.Body>
              <Card.Header> Your Answer </Card.Header>
                <Card.Title>
                  {" "}
                {this.state.userAnswer.selection}{" "}
                </Card.Title>
                <Card.Text>
                  Your Explanation: {this.state.userAnswer.explanation}
                </Card.Text>
                <Button onClick={this.updateClickHandler} style={{marginRight: "5px", marginBottom: "5px"}} >
                  Update your answer?
                </Button>
                <Button onClick={this.finalSubmitHandler} variant="outline-primary" style={{ marginBottom: "5px"}}>
                  Submit your final answer!
                </Button>
              </Card.Body>
            </Card>
            </CardDeck>
            <h5> Top Responses </h5>
            {this.state.sortedQuestionAnswers.map((answer) => (
              <AnswerComponent
                answer={answer}
                key={answer.id}
                getData={this.getData}
              />
            ))}
          </div>
        ) : (
          <div>
            <AnswerForm submitHandler={this.answerSubmitHandler} />
          </div>
        )}
        </>
        }
      </>
    );
  }
}

export default AnswersContainer;
