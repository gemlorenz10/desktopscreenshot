/**
 * Created by ontue on 8/19/2016.
 */
'use strict'


var video = document.querySelector( 'video' );
var canvas = document.querySelector( 'canvas' );
var con = canvas.getContext("2d");
var image_upload_url = "http://work.org/image_upload.php";
//var image_upload_url = "http://work.org/nw/desktopscreenshot/server_side/image_upload.php";
var track = null;
var dcm = nw.Screen.DesktopCaptureMonitor;
nw.Screen.Init();


function upload_image(){

    var dataURL = canvas.toDataURL();
    
    console.log( image_upload_url );
    $.ajax({
        type: "POST",
        url: image_upload_url,
        data: {
            image : dataURL
        },
        success: function(re) {
            console.log('saved');
            console.log(re);
            dataURL = null;
        }
    });

}


function draw( video, canvas ) {


    if (video.srcObject != null) {
        try {
            canvas.height = video.videoHeight;
            canvas.width = video.videoWidth;
            con.drawImage(video, 0, 0, canvas.width, canvas.height);
            track.stop();
        }
        catch ( e ) {
            console.log(e);
            alert("Error on handling video tag");
        }
        
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


function success( stream ){
    console.log( 'success' );
    console.log( stream );
    track = stream.getTracks()[0];  // if only one media track
    console.log( track );

    video.srcObject = stream;
    //video.srcObject = track;
    console.log( video );
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
