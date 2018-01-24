##Gillz N Skillz

Plan your next fishing adventure with Gillz N Skillz.

A fishing app built with React, Loopback and MongoDB.

Deployed to the interwebs with Heroku magic following the steps below:

:zap: HEROKU DEPLOYMENT LOOPBACK :zap:
(This is important because Georgie Kirschner created amazing instructions for a complicated deployment, now made easy breezy!)
Follow these steps to deploy your app to Heroku. Perform these steps on the master branch with your latest working code from the main develop branch.
1. “npm install -g strongloop”
2. Make sure you have the Heroku toolbelt installed https://devcenter.heroku.com/articles/heroku-cli
3. Create a file in the root called “Procfile”
4. Enter following line to the new Procfile “web: slc run”
5. Login to heroku on the command line with “heroku login” (Heroku account require, create one if you haven’t yet)
6. Run “heroku apps:create --buildpack https://github.com/strongloop/strongloop-buildpacks.git”
7. Duplicate “server/config.json” file to “server/config.production.json”
8. Change the port value in the server/config.production.json to 80
9. Comment out “/build” by using a pound sign “#/build” in the “client/.gitignore” file
10. Update the “files” value in the “server/middleware.json” to
“files”: {
“loopback#static”: {
“params”: “$!../client/build”
}
},
11. Add “files”: {} to the “server/middleware.development.json” file
12. Run “npm run build” in the client folder
13. Commit and push all changes to the master branch
14. Run “git push heroku master” (this will take a few minutes to finish)
15. Run “heroku open” once the deployment is finished
Note: You may need to comment out the server code in root.js on initial deployment to pull front end vs. back end.
If everything went according to plan you should see your working app via a live herokuapp.com URL

