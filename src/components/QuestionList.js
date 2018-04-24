import React from "react";

import Question from "./Question";

const QuestionList = (props) => {
  let questions = props.questions.map(question => {
    let selected;
    if (props.selectedQuestion === question.id) {
      selected = true
    }

    let handleClick = () => { props.toggleQuestionSelect(question.id) }

    return(
      <Question
        key={ question.id }
        question={ question.question }
        answer={ question.answer }
        selected={ selected }
        handleClick={ handleClick }
      />
    )
  });

  return (
    <div className="question-list">
      { questions }
    </div>
  );

};

export default QuestionList;
