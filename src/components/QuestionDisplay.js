import React from "react";

function QuestionDisplay(props) {

  return (
    <div>
      <p> {props.question.description} </p>
      <p> A. {props.question.A} </p>
      <p> B. {props.question.B} </p>
      <p> C. {props.question.C} </p>
      <p> D. {props.question.D} </p>
      <p> E. {props.question.E} </p>
    </div>
  );
}

export default QuestionDisplay;
