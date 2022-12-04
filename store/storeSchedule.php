<?php
    $screeningObject =  $_POST['screeningObject'];

    $myfile = fopen("screening.json", "a");

    fwrite($myfile, $screeningObject ."\n");

    echo $screeningObject -> movie_id;
?>