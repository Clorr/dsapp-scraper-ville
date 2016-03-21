var geocoder = require("geocoder")
geocoder.selectProvider('google',{key:"-------------"});

var cache = {};

module.exports.geocode = function(address, callback) {
	if(cache[address]) {
		callback(cache[address]);
	} else {
		geocoder.geocode(address, function ( err, data ) {
//			console.log(data);
			if(data.results.length) {
				var res = data.results[0].geometry.location;
				cache[address] = res
				callback(res);
			}
		});
	}
}
