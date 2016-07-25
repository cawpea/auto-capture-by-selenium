const mkdirp = require('mkdirp');
const path = require('path');

var Util = {
	makeDir: function(fileName) {
		return new Promise(function(resolve, reject) {
			mkdirp(path.dirname(fileName), function(err) {
				if (err) throw err;
				resolve();
			});
		});
	}
};

module.exports = Util;