import React from "react";
import { Form, Button } from "react-bootstrap";

class AnswerForm extends React.Component {
  state = {
    selection: "",
    explanation: "",
    readyToSubmit: false,
  };

  changeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    if (this.state.selection !== "" && this.state.explanation !== "") {
      this.setState({ readyToSubmit: true });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.readyToSubmit === true) {
      this.props.submitHandler(this.state);
      this.setState({ selection: "", explanation: "" });
    } else {
      this.addValidation();
    }
  };

  addValidation = () => {
    console.log("incomplete form");
    return (
      <Form.Text className="text-muted">
        You cannot submit without completing!
      </Form.Text>
    );
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label for="answers"> Choose an Answer: </Form.Label>
          <Form.Control
            as="select"
            id="answers"
            name="selection"
            value={this.state.selection}
            onChange={this.changeHandler}
          >
            <option value=""></option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Your Explanation:</Form.Label>
          <Form.Control
            as="textarea"
            name="explanation"
            rows="3"
            value={this.state.explanation}
            onChange={this.changeHandler}
          />
          <Form.Text className="text-muted">
            Please select an answer choice and enter an explanation to continue!
            {this.addValidation}
          </Form.Text>
        </Form.Group>
        <Button type="submit">Submit your answer!</Button>
      </Form>
    );
  }
}

export default AnswerForm;
