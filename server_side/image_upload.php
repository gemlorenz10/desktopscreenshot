<?php
if ( ! isset( $_POST['image'] ) ) die("No image");

$img = $_POST['image'];
if ( $img == null ){
    die("No image data.");
}
else {
    $img = str_replace('data:image/png;base64,', '', $img);
    $img = str_replace(' ', '+', $img);
    $data = base64_decode( $img );
    $file = './images-' . time() . ".png";
    $success = file_put_contents($file, $data);
    
    if ( $success ) echo 0;
    else echo 1;
}