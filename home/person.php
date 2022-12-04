<?php
    $data =  $_POST['personObject'];
    
    $myfile = fopen("person.json", "a");
    fwrite($myfile, $data ."\n");

    echo $data -> Name;
?>