import _ from 'lodash';

import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";

import SurveyField from "./SurveyField";

const FIELDS = [
  { label: 'Survey Title', name: 'title' },
  { label: 'Subject Line', name: 'subject' },
  { label: 'Email Body', name: 'ebody' },
  { label: 'Recipient List', name: 'emails' }
];

class SurveyForm extends Component {

  renderFields() {
    // return (
    //   <div>
    //     <Field label="Survey Title" type="text" name="title" component={SurveyField} />
    //     <Field label="Subject Line" type="text" name="subject" component={SurveyField} />
    //     <Field label="Email Body" type="text" name="ebody" component={SurveyField} />
    //     <Field label="Recipient List" type="text" name="emails" component={SurveyField} />
    //   </div>
    // );

    // return _.map(FIELDS, field => {
    //   return <Field component={SurveyField} type="text" label={field.label} />
    // });

    return _.map(FIELDS, ({ label, name }) => {
      return <Field key={name} component={SurveyField} type="text" label={label} name={name} />
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          {this.renderFields()}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'surveyForm'
})(SurveyForm);
