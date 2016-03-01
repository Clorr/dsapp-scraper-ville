var cheerio = require('cheerio');
var http = require("http");
var geo = require('./geo.js');

// Utility function that downloads a URL and invokes
// callback with the data.
function download(url, callback) {
  http.get(url, function(res) {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on("end", function() {
      callback(data);
    });
  }).on("error", function() {
    callback(null);
  });
}

download("http://www.spectacles.carrefour.fr/rechercheDetaillee.do", function(response) {
    $ = cheerio.load(response);
	
	$('#produitList > li').each(function(i,v){
		var entry = cheerio.load(v);
		var data = {};
		data.title = entry('h3').html();
		data.lieu = entry('.lieu').html();
		data.date = entry('.date').html();
		geo.geocode(data.lieu, function(geodata){
			data.location = geodata;
			console.log(data);
		})
	});
});
