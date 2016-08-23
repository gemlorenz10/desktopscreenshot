/**
 * Created by ontue on 8/19/2016.
 */
'use strict';

var gui = require('nw.gui');
var win = gui.Window.get();

function systray() {

    
//    win.hide();


}

win.on( 'minimize', function(){ systray(); });


//setTimeout( function(){win.minimize()}, 1500 );