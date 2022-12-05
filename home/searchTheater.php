<?php

$inputfile = fopen("../store/screening.json", "r");
$keyword = $_POST["movieId"];
$wordLength = strlen($keyword);
$lines = @file("../store/screening.json");

// 결과 객체 리스트 
$result = array();

// 검색
if ($lines != null) {
  if (!empty($keyword)) {
    for ($i = 0; $i < count($lines); $i++) {
      $arr = explode("<br>", $lines[$i]);
      $screening = json_decode($arr[0]);
      $movie_id = $screening->movie_id;
      if($movie_id == $keyword) {
        array_push($result, $screening);
      }

    }
  }

}

fclose($inputfile);
echo json_encode($result, JSON_UNESCAPED_UNICODE);
?>