var request = require('request');
var fs = require('fs');
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
  if(err){
  console.log("Errors:", err);
  }
  result.forEach(function(user) {
    downloadImageByURL(user.avatar_url, `avatars/${user.login}.jpg`);
  });
});

function downloadImageByURL(url, filePath) {
  request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) {
         console.log('Download complete.');
       })
       .pipe(fs.createWriteStream(filePath));
}


