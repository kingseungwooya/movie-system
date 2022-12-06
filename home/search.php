<?php
// 검색 조건 영화제목, 감독이름, 출연자 이름
// server단에서는 주어진 조건대로 객체를 read만하고 객체 그대로를 반환한다. 
// 그 객체에 대한 웹 출력은 js에서 작업한다. 
// setting
$inputfile = fopen("../store/movie.json", "r");
$keyword = $_POST["keyword"];
$wordLength = strlen($keyword);
$lines = @file("../store/movie.json");
// 결과 객체 리스트 
$result = array();

// 검색
if ($lines != null) {
  if (!empty($keyword)) {
    for ($i = 0; $i < count($lines); $i++) {
      $arr = explode("<br>", $lines[$i]);
      $movie = json_decode($arr[0]);
      $movie_name = $movie->movie_name;
      $director = $movie->director;
      $actors = $movie->actors;
      //echo $arr[0];
      //echo $movie_name;
      // echo json_encode($movie, JSON_UNESCAPED_UNICODE);


      if (!strcasecmp($keyword, substr($movie_name, 0, $wordLength))) {
        array_push($result, $movie);
      } else if (!strcasecmp($keyword, substr($director, 0, $wordLength))) {
        array_push($result, $movie);
      } else {
        for ($i = 0; $i < count($actors); $i++) {
          if (!strcasecmp($keyword, substr($actors[$i], 0, $wordLength))) {
            array_push($result, $movie);
          }
        }
      }
    }
  }

}

fclose($inputfile);
echo json_encode($result, JSON_UNESCAPED_UNICODE);
?>