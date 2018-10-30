var request = require('request');
var fs = require('fs');
var token = require('./secrets.js')

var args = process.argv.slice(2);

if (args.length < 2) {
  console.log("Error: Owner and repo not specified. Enter owner and repo.")
} else {

var Owner = args[0];
var Name = args[1];


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

getRepoContributors(Owner, Name, function(err, result) {
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

}
