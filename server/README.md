### Node JS for Beginners

##### Executing our first node js app.
```bash
# This is because we configured it like that in package.json Scripts section.
node index.js
```

##### Installing the HEROKU CLI
1. Create an account in Heroku
2. Loggin into our account.
3. Commit our codebase to git.
4. Install the CLI
```bash
# https://cli.heroku.com
# Installing heroku cli
brew install heroku # Seems to be deprecated
brew tap heroku/brew && brew install heroku

# Verify heroku installation
heroku -v

# Login to Heroku
heroku login # Then enter your credentials

# Create a new application
# This will give us two links. 1. Is the site that we can visit through the browsers, 2. Is the deployment target, it is a git repository.
heroku create

# Once we have our repository created locally, we will need to specify the remote host for it
git remote add heroku <second-link-from-previous-step> # heroku in this command is only a name, it can be different

# Push changes
git push heroku master

# Opening our application
heroku open # It will launch a browser
# or
heroku open --app <app-name>

# If we have some issues with previous step, we can verify it with the following command
heroku logs
# or
heroku logs --app <app-name>


# What about the following changes??? New deployment...
# we just need to commit and push the new changes, it will be automatically re-deployed.

```

##### Nodejs-Google-Auth
1. passportjs.org: for mananging the authentication with third party services.
2. Passport installation
```bash
npm install --save passport passport-google-oauth20
```
3. Create a google application in developers section: https://console.developers.google.com/
  - In this case: emaily-dev
  - Enable it: Click on `enable API`
  - Search for `oauth` when enabling the API, but this seems to be deprecated, so we can search for google+ API.
  - Click on `Google+ API`, and there you are going to see `oauth` option. We need `enable` it.
  - Enable the API is not enough, we will also need create credentials. So press on `create credentials` and choose the option `oauth client ID`.
  - Product name shown to users: `emaily-dev`
  - authorized javascript origins: http://localhost:5000
  - authorized redirect URIs: http://localhost:5000/*
4. We may get `redirect_uri_mismatch` error when testing the google auth. But it is because the redict URI. We will only need to update it to `/auth/google/callback`

##### Installing tools
- npm install --save nodemon
  - Once installed nodemon, we can start the application with `npm run dev` where `dev` was defined in the scripts section of package.json.
- npm install --save mongoose
- npm install --save cookie-session

- npm install --save concurrently

- Required dependencies in client side
  - `npm install --save redux react-redux react-router-dom`

##### Important Heroku Commands
- heroku open: It will give us the address we need to use in google developer console.


##### Google authentication from Heroku deployed app
- We may get an error called `redirect_uri_mismatch`, it is due to http vs https
- It basically is specified in passport.js file in `GoogleStrategy` configuration.
  - One solution would be add the entire address
  - Another solution solve something regarding to heroku proxy. (add to GoogleStrategy `proxy: true`) 


#### Moving to the client side
##### Create a react app
- First we will need to install the required tools for creating a react app. `sudo npm install -g create-react-app`
- Comand for creating a new app. `npx create-react-app <app-name>`






