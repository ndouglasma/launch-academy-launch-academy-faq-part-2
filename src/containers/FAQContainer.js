import React from "react";

import QuestionList from "../components/QuestionList";
import Form from "../components/Form";

class FAQContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selectedQuestion: null,
      questions: []
    }

    this.toggleQuestionSelect = this.toggleQuestionSelect.bind(this);
    this.trackForm = this.trackForm.bind(this);
  }

  toggleQuestionSelect(id) {
    if (id === this.state.selectedQuestion) {
      this.setState({ selectedQuestion: null})
    }
    else {
      this.setState({ selectedQuestion: id })
    }
  };

  trackForm(formPayload) {
    fetch("/api/v1/questions", {
      method:"POST",
      body: JSON.stringify(formPayload)
    })
    .then(response => {
      if(response.ok) {
        return response;
      }
      else {
        let error = new Error("Error in fetch: POST `/api/v1/questions`");
        throw(error);
      }
    })
    .then(response => {
        return response.json();
    })
    .then(body => {
      this.setState({
        questions: [...this.state.questions, body]
      });
    })
    .catch(error => {
      console.error(error);
    });
  };

  componentDidMount() {
    fetch("/api/v1/questions")
    .then(response => {
      if(response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
      this.setState({
        questions: data,
      });
    })
    .catch(error => {
      console.error(error);
    });
  };

  render() {
    return(
      <div className="faq-content">
        <h2>We Are Here To Help</h2>
        <div>
          <QuestionList
            questions={ this.state.questions }
            selectedQuestion={ this.state.selectedQuestion }
            toggleQuestionSelect={ this.toggleQuestionSelect }
          />
          <div className="faq-form">
            <Form trackForm={this.trackForm}/>
          </div>
        </div>
      </div>
    )
  }
}

export default FAQContainer;
