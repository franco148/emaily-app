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

```













