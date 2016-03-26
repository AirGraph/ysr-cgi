# ysr-cgi
AJAX CGI for yandex-recognizer

## Questions and Bug Reports
* mailing list: Victor.Vazin@gmail.com

## Installation
Install the ysr-cgi and it's dependencies by executing
the following `NPM` command.
```
npm install ysr-cgi --save
```
## Troubleshooting
The ysr-cgi depends on several other packages. These are.

* yandex-recognizer

Ensure, that your user has write permission to wherever the node modules
are being installed.

QuickStart
==========
Simple AJAX request in ExtJS style:
```
Ext.Ajax.request({

	url: 'ysr',
	method: 'GET',
	params: { file: audioFileName },
	success: function (res, opts) {

		var recognizedText = res.responseText;

	},
	failure: function (res, opts) {...}

});
```
## Next Steps
* [server example](https://www.npmjs.com/package/sd-server)
