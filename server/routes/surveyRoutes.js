const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
// const recipientSchema = require('../models/Recipient');
const Mailer = require('../services/Mailer');
const surveryTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      // recipients: recipientSchema.split(',').map(email => { return { email: email }})
      // recipients: recipients.split(',').map(email => ({ email })),
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    // ? Great place to send an email!
    const mailer = new Mailer(survey, surveryTemplate(survey));
  });
};
