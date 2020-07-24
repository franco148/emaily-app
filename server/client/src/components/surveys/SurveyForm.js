import _ from 'lodash';

import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from 'react-router-dom';

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

          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  // if (!values.title) {
  //   errors.title = 'You must provide a title';
  // }

  // if (!values.subject) {
  //   errors.title = 'You must provide a subject';
  // }

  // if (!values.ebody) {
  //   errors.title = 'You must provide a body';
  // }

  _.each(FIELDS, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm'
})(SurveyForm);
