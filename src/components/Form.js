import React, { Component } from "react";

class Form extends Component {
  constructor(props){
    super(props);
    this.state = {
      question: "",
      answer: "",
      errors: {}
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  };

  handleFieldChange(event) {
    this.validateFieldChange(event.target.name, event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  validateFieldChange(fieldName, fieldValue) {
    // console.log(fieldName);
    // console.log(fieldValue);

    if (fieldValue.trim() === ""){
      let newError = { [fieldName]: `You must enter a ${ fieldName }.` };
      this.setState({ errors: Object.assign(this.state.errors, newError) });
      // console.log(this.state.errors);
      return false;
    }
    else if ((fieldName === "question") && (!fieldValue.endsWith("?"))) { //make sure question ends with ? mark
      let newError = { [fieldName]: "You must formulate a question with a '?' mark" };
      this.setState({ errors: Object.assign(this.state.errors, newError) });
      return false;
    }
    else {
      let errorState = this.state.errors;
      // console.log(errorState);
      // console.log(errorState[fieldName]);
      delete errorState[fieldName];
      this.setState({ errors: errorState });
      return true;
    }
  };

  handleClearForm(event) {
    event.preventDefault();
    this.setState({
      question: "",
      answer: "",
      errors: {}
    });
  };

  handleFormSubmit(event) {
    event.preventDefault();

    let validateQuestion = this.validateFieldChange("question", this.state.question);
    let validateAnswer = this.validateFieldChange("answer", this.state.answer);

    if (validateQuestion && validateAnswer) {
      let formPayload = {
        question: this.state.question,
        answer: this.state.answer
      };

      // send this payload up to the App.js
      this.props.trackForm(formPayload);
      this.handleClearForm(event);
    }
  };

  render(){
    let handleFieldChange = (event) => {
      this.handleFieldChange(event);
    };

    let handleClearForm = (event) => {
      this.handleClearForm(event);
    };

    let errorDiv;
    let errorItems;

    if (Object.keys(this.state.errors).length > 0) {
      errorItems = Object.values(this.state.errors).map(error => {
        return(
          <li key={ error }>{ error }</li>
        );
      });
      errorDiv = <div className="callout alert">{ errorItems }</div>
    };

    return(
      <div>
        <form id="new-question-answer-form" onSubmit={ this.handleFormSubmit }>
          <label htmlFor="question">New Question: </label>
          <input
            type="text"
            name="question"
            value={ this.state.question }
            onChange={ handleFieldChange }
          />
        <label htmlFor="answer">Answer: </label>
          <input
            type="text"
            name="answer"
            value={ this.state.answer }
            onChange={ handleFieldChange }
          />
          <div className="new-question-answer-form-button-group">
            <button className="button" onClick={ handleClearForm }>Clear</button>
            &emsp;
            &emsp;
            <button className="button" type="submit">Submit</button>
          </div>
        </form>
        { errorDiv }
      </div>
    );
  };
};

export default Form;
