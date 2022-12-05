<?php
    $data =  $_POST['movieObject'];
    
    $myfile = fopen("movie.json", "a");
    fwrite($myfile, $data ."\n");

    echo $data -> movie_name;
?>