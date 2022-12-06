<?php
// 예약 후 회원.json에 저장 
$data = $_POST['requestObject'];
$userId = json_decode($data)->member_id;
$reserve_num = json_decode($data)->reserve_num;
$fileName = $userId . ".json";
$myfile = fopen($fileName, "a");
fwrite($myfile, $data . "\n");

// 예약 후 reserve_num올리기 

$r_id = $_POST['requestId'];
$myFile = fopen("../store/screening.json", "r");
$arr = array();
while (!feof($myFile)) {
    global $arr;
    $data = fgets($myFile);
    if ($data == "") {
        continue;
    }
    $data = json_decode($data);
    if ($data->id == $r_id) {

        $data->reserve_seat = (int) $reserve_num;
        $data = json_encode($data, JSON_UNESCAPED_UNICODE);
        array_push($arr, $data);
        continue;
    } else {
        $data = json_encode($data, JSON_UNESCAPED_UNICODE);
        array_push($arr, $data);
    }
}
$myFile2 = fopen("../store/screening.json", "w");
for ($i = 0; $i < count($arr); $i++) {
    fwrite($myFile2, $arr[$i] . "\n");
}


echo $data;
?>