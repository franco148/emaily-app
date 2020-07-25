const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');

const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
// const recipientSchema = require('../models/Recipient');
const Mailer = require('../services/Mailer');
const surveryTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    console.log('Email Body received: ', req.body);

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
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  // app.post('/api/surveys/webhooks', (req, res) => {
  //   // console.log(req.body);
  //   // res.send({});
  //   // const events = _.map(req.body, (event) => {

  //   const events = _.map(req.body, ({ email, url }) => {
  //     // const pathname = new URL(event.url).pathname;
  //     const pathname = new URL(url).pathname;
  //     const p = new Path('/api/surveys/:surveyId/:choice');
  //     // console.log(p.test(pathname));
  //     const match = p.test(pathname);
  //     if (match) {
  //       return { email, surveyId: match.surveyId, choice: match.choice };
  //     }
  //   });

  //   // console.log(events);
  //   const compactEvents = _.compact(events);
  //   const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');
  //   console.log('UNIQUE EVENTS', uniqueEvents);

  //   res.send({});
  // });

  app.post('/api/surveys/webhooks', (req, res) => {

    const p = new Path('/api/surveys/:surveyId/:choice');

    _.chain(req.body)
      .map(req.body, ({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne({
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false }
          }
        }, {
          $inc: { [choice]: 1 },
          $set: { 'recipients.$.responded': true },
          lastResponded: new Date()
        }).exec();
      })
      .value();

    console.log('Executed!!!');
    res.send({});
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });
};
