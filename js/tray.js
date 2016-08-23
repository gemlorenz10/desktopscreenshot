/**
 * Created by ontue on 8/19/2016.
 */
'use strict';

var gui = require('nw.gui');
var win = gui.Window.get();

function systray() {

    var tray = new gui.Tray({
        title: 'Tray',
        icon: 'withcenter-cms-logo.png',
        tooltip: 'Withcenter CMS'
    });

    win.hide();

    tray.on('click', function() {
        win.show();
        tray.remove();
        tray = null;
    });
}

win.on( 'minimize', function(){ systray(); });
win.on( 'close', function(){

    var password = prompt( 'Enter password to close the program:', 'Enter Password Here...' );

    if ( password == "00" ){
    this.hide(); // Pretend to be closed already
    console.log("We're closing...");
    this.close(true);
    win.close();
    }else{
        alert( 'Password Incorrect!');
    }
});


setTimeout( function(){win.minimize()}, 1500 );