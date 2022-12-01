<?php
$myfile = fopen("movie.json", "a");
$myObj = array();
$myObj["movieName"] = $_POST["movieName"];
$myObj["birthdate"] = $_POST["date"];
$myObj["weight"] = (int)$_POST["weight"];
$output = json_encode($myObj, JSON_UNESCAPED_UNICODE);
fwrite($myfile,$output."\n");
fclose($myfile);
echo "저장되었습니다."

?>

<?php

$myfile = fopen("movie.json", "a");
$myObj = array();
$myObj["name"] = $_POST["name"];
$myObj["birthdate"] = $_POST["date"];
$myObj["weight"] = (int)$_POST["weight"];
$output = json_encode($myObj, JSON_UNESCAPED_UNICODE);
fwrite($myfile,$output."\n");
fclose($myfile);
echo "저장되었습니다."

?>
<?php
    $myFile = fopen("data.json", "r");
    $arr = array();
    while(!feof($myFile)) {
        global $arr;
        $data = fgets($myFile);
        $name =$_POST['name'];
        $afterWeight =$_POST['afterWeight'];
        if($data == "") {
            continue;
        }
        $data = json_decode($data);
        if($data->name == $name) {
            echo($name."의 몸무게 ".$data->weight."를 ".$afterWeight."로 수정합니다.<br>");
            $data->weight = (int)$afterWeight;
            $data = json_encode($data, JSON_UNESCAPED_UNICODE);
            array_push($arr, $data);
            continue;
        }
        else {
            $data = json_encode($data, JSON_UNESCAPED_UNICODE);
            array_push($arr, $data);
        }
    }
    $myFile2 = fopen("data.json", "w");
    for($i = 0; $i < count($arr); $i++) {
        fwrite($myFile2, $arr[$i]."\n");
    }

    
    
?>