<?php

$img = $_POST['image'];
$name = $_POST[ 'computer_name' ];
$time = $_POST[ 'time' ];

$name = str_replace('Hostname:','', $name );
$name = str_replace( '-','', $name );
$name = str_replace( ' ','', $name );
$name = preg_replace('/\s+/', '', $name);

define('UPLOAD_DIR', 'images/');
//define('UPLOAD_DIR', 'images/'.$name.'/');



if ( $img == null ){
    echo "Access Denied.";

}else{


    $time = str_replace(' ','', $time);
    $time = str_replace( ':','', $time );
    $time = trim(preg_replace('/\s+/', '', $time));

    $img = str_replace('data:image/png;base64,', '', $img);
    $img = str_replace(' ', '+', $img);
    $data = base64_decode( $img );
    //$len = strlen($img);
    //$data = $len.$img;
    $file = UPLOAD_DIR . $name . '_' . $time . ".png";
    $success = file_put_contents($file, $data);
    
    print $success ? $file : 'Unable to save the file.';
}