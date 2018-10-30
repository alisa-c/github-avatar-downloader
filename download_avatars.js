var request = require('request');

var token = require('./secrets.js')

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${token.GITHUB_TOKEN}`
    }
  };

  request(options, function(err, res, body) {
    var parsedBody = JSON.parse(body);
    cb(err, parsedBody);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  result.forEach(function(user) {
    console.log(user.avatar_url);
  });
});


console.log('Welcome to the GitHub Avatar Downloader!');