import React, { Component } from "react";
import { reduxForm, updateSyncErrors } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

class SurveyNew extends Component {

  // constructor(props) {
  //   super(props);

  //   this.state = { new: true };
  // }

  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return <SurveyFormReview onCancel={ ()=> this.setState({ showFormReview: false }) } />;
    }

    return <SurveyForm onSurveySubmit={() => this.setState({ showFormReview: true })} />;
  }

  render() {
    return (
      <div>
        {
          /* <SurveyForm /> */
          this.renderContent()
        }
      </div>
    );
  }
}

// With this update, the form cleans its data
export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);
