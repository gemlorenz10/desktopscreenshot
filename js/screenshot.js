/**
 * Created by ontue on 8/19/2016.
 */
'use strict'


var video = document.querySelector( 'video' );
var canvas = document.querySelector( 'canvas' );
var con = canvas.getContext("2d");
var server_url = "http://work.org/nw/desktopscreenshot/server_side/";

var track = null;
var dcm = nw.Screen.DesktopCaptureMonitor;
nw.Screen.Init();


function upload_image(){
   // computer_info();
    var dataURL = canvas.toDataURL();
    var time_element = document.getElementById('time').outerHTML,
        time = time_element.replace( '<h2 id="time">', '' ),
        new_time = time.replace( '</h2>','' );
    var name_element = document.getElementById('hostname').outerHTML,
        name = name_element.replace('<h2 id="hostname">',''),
        new_name = name.replace('</h2>','');



var url = server_url + "/image_upload.php?image=" + dataURL;
    console.log( url );
    $.ajax({
        type: "GET",
        url: url,
        success: function(re) {
            console.log('saved');
            console.log(re);
            dataURL = null;
            time_element = null;
            name_element = null;
        }
    });

}


function draw( video, canvas ) {
    computer_info();

    if (video.srcObject != null) {
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        con.drawImage(video, 0, 0, canvas.width, canvas.height);
        track.stop();
        video.srcObject = null;
        upload_image();
        setTimeout(function () {
            draw( video, canvas );
            // get_stream(success, fallback);
        }, 60000);
    }else{
        get_stream(success, fallback);
        setTimeout(function () {
            draw( video, canvas );
            // get_stream(success, fallback);
        }, 700);
    }
}


function computer_info(){
    var exec = require('child_process').exec, hostname, time;
    exec('hostname', function(error, stdout, stderr) {
        document.getElementById('hostname').innerHTML = stdout;
    });
    exec('time /T', function(error, stdout, stderr) {
        document.getElementById("time").innerHTML = stdout;
    });
}

function success( stream ){
    track = stream.getTracks()[0];  // if only one media track
    video.srcObject = stream;
    //  console.log( video );
}

function fallback( error ){
    console.log( error );
}

function get_stream( success, fallback ){
    console.log('get stream');
    dcm.start( true, false );
    dcm.once("added", function (id, name, order, type) {
        //select first stream and shutdown
        var constraints = {
            video: {
                mandatory: {
                    chromeMediaSource: 'desktop',
                    chromeMediaSourceId: dcm.registerStream(id),
                    maxWidth: screen.width,
                    maxHeight: screen.height
                }
            }
        };

        navigator.webkitGetUserMedia( constraints, success, fallback );

        dcm.stop();

    });
}
draw( video, canvas );