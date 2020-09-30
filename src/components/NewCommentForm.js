import React from "react";
import { Button, Form} from "react-bootstrap";

class NewCommentForm extends React.Component {
  state = {
    newComment: "",
  };

  changeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submitHandler(this.state);
    this.setState({ newComment: ""});
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <h5> Join the conversation! </h5>
        <Form.Group   controlId="formBasicText" >
         <Form.Label> Your Comment </Form.Label>
        <Form.Control 
          type="text"  
          name="newComment"
          placeholder="Enter your comment"
          value={this.state.newComment}
          onChange={this.changeHandler}
        />
        </Form.Group>
        <Button className="comment-button" type="submit">
          Submit!
        </Button>
      </Form>
    );
  }
}

export default NewCommentForm;
