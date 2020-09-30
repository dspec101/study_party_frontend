import React from "react";
import {Toast} from 'react-bootstrap'

class CommentsDisplay extends React.Component {


state = {
  user_name: ""
}

componentDidMount () {
  this.userForComment()
}

userForComment = () => {
fetch(`http://localhost:3000/api/v1/comment-user/${this.props.comment.id}`)
  .then(resp => resp.json())
  .then(user => this.setState({ user_name: user.title}))}


render() {

return(
<Toast>
<Toast.Header> <strong className="mr-auto"> {this.state.user_name} </strong> <small> {this.props.comment.created_at} </small> </Toast.Header>
<Toast.Body> "{this.props.comment.description}" </Toast.Body>
</Toast>
)
}
}

export default CommentsDisplay;
