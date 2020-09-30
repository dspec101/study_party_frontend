import React from "react";
import NewCommentForm from "../components/NewCommentForm.js";
import CommentsDisplay from "../components/CommentsDisplay.js";

class CommentsContainer extends React.Component {
  state = {
    comments: [],
  };

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/comments")
      .then((response) => response.json())
      .then((data) => this.setState({ comments: data }));
  }

  filteredComments = () => {
    let newRoomComments = this.state.comments.filter(
      (comment) => comment.party_id === this.props.id
    );
    return newRoomComments.map(comment => <CommentsDisplay comment={comment}/>)
  };

  commentSubmitHandler = (object) => {
    let newArray = [...this.state.comments];
    fetch("http://localhost:3000/api/v1/comments", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        party_id: this.props.id,
        user_id: this.props.userId,
        description: object.newComment,
      }),
    })
      .then((response) => response.json())
      .then(response => this.setState({comments: [...newArray, response]}))
  };

  render() {
    return (
      <>
        {this.filteredComments()}
        <div>
          <NewCommentForm submitHandler={this.commentSubmitHandler} />
        </div>
      </>
    );
  }
}

export default CommentsContainer;
