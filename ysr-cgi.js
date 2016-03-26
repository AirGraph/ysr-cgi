//	AJAX CGI for yandex speech recognition.
//		Version 0.0.1.
//			Copyright (c) Jungle Software, 2016.

var querystring = require('querystring'),
		assert = require('assert'),
		url = require('url'),
		fs = require('fs'),

		yandex = require('yandex-recognizer'),

		service, dataBuffer, bufferSize, finText, curText, responce;

(function (namespace) {
	'use strict';

	var Cgi = function() {

		if (!(this instanceof namespace.Cgi)) { return new namespace.Cgi(); }

	};

	Cgi.prototype = {

		_onConnect: function (sessionId, code) {

			finText = '';
			curText = '';

			service.send(dataBuffer, 32000);

		},

		_onResult: function (data) {

			if(data.uttr) {

				finText += data.text;
				curText = '';

			} else { if(data.text.length > curText.length) curText = data.text; }

		},

		_onClose: function (e) {

			console.log('wasClean: ' + e.wasClean);
			console.log('code: ' + e.code);
			console.log('reason: ' + e.reason + '\n');

			responce.writeHead(200, {'Content-Type': 'text/plain'});
			responce.end(finText + curText);

			service = null;
			dataBuffer = null;
			bufferSize = 0;

		},

		_onError: function (e) {

			responce.writeHead(1006, {'Content-Type': 'text/plain'});
			responce.end('W3CWebSocket error...');

			service = null;
			dataBuffer = null;
			bufferSize = 0;

		},

		GET: function (req, res) {

			var qstring = url.parse(req.url).query,
					file = querystring.parse(qstring)['file'];

			responce = res;
			fs.stat(file, function (err, stats){

				assert.equal(null, err);
				bufferSize = stats.size;
				fs.open(file, 'r', function (err, fd) {

					assert.equal(null, err);
					dataBuffer = new Buffer(bufferSize);
					fs.read(fd, dataBuffer, 0, bufferSize, null,
						function (err, bytesRead, buffer) {

						assert.equal(null, err);
						service = yandex.Recognizer({

							onConnect: this._onConnect,
							onResult: this._onResult,
							onClose: this._onClose,
							onError: this._onError,

							apikey: 'YOUR-OWN-YANDEX-API-KEY'

						});
						service.connect();

					}.bind(this));
				}.bind(this));
			}.bind(this));
		}
	};

	namespace.Cgi = Cgi;

}(this));
