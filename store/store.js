var actorsCount = 1;

// 배우 추가하기
var addActorBt = document.getElementById("addActorBt");

addActorBt.addEventListener("click", function () {
  if (actorsCount < 3) {
    var actorList = document.getElementById("actorList");
    var input = document.createElement("input");
    input.type = "text";
    input.class = "actor";
    input.name = "actor";
    input.setAttribute("class", "actor");
    input.style = "width:90px";
    actorList.appendChild(input);
    actorsCount++;
    console.log(actorsCount);
  } else {
    alert(" 배우 입력은 최대 3명까지 가능합니다. ");
  }
});

// 배우 지우기
var deleteActorBt = document.getElementById("deleteActorBt");

deleteActorBt.addEventListener("click", function () {
  if (actorsCount > 1) {
    //var target = [];
    var actorList = document.getElementById("actorList");
    actorList.lastChild.remove();

    actorsCount--;
  } else {
    alert("배우 입력 최소값은 1입니다.");
  }
});
var searchTheater = document.getElementById("searchTheater");

var dates = [];
var isDuplicated;
var inputDate;
// 날짜 선택하기
searchTheater.addEventListener("click", function () {
  var date = document.getElementById("openDate");
  if (date.value != "") {
    console.log(date.value);
    inputDate = date.value;
    if (dates.some(contain)) {
      isDuplicated = true;
    } else {
      dates.push(date.value);
    }
    document.getElementById("addMovie").disabled = false;
    document.querySelectorAll(".place").forEach((element) => {
      element.disabled = false;
    });
  } else {
    alert("날짜를 선택해주세요");
  }
});

var contain = function (value) {
  return value === inputDate;
};
var poster = document.getElementById("poster");
// 상영정보 추가하기
var addMovie = document.getElementById("addMovie");
addMovie.addEventListener("click", function () {
  if (isDuplicated) {
    alert("같은 날짜에 추가되었습니다.");
    isDuplicated = false;
  } else {
    addMovie.disabled = true;

    var selectedTheater = document.getElementsByName("place");
    var result = document.getElementById("theaterList");
    var checked;
    selectedTheater.forEach((node) => {
      if (node.checked) {
        checked = node;
      }
    });
    var info = document.createElement("p");

    var text = inputDate + "," + checked.value;
    var textNode = document.createTextNode(text);
    info.style = "width:200px;  border: 1px solid black; ";
    info.append(textNode);
    info.setAttribute("class", "theaterList");
    result.append(info);
  }
});

var movieIdGenerator = 0;
var screnningIdGenerator = 0;
const defaultMovieId = "m";
const defaultScrenningId = "r";
var isSuccess;
var a = document.getElementById("picBt");
a.addEventListener("click", function () {
  var pic = document.getElementById("fileUpload");
  console.log(pic.value);
});
$(function () {
  $("#submit").on("click", function () {
    var name = $("#movieName").val();
    var genre = $(".genre").val();
    var director = $("#director").val();
    var actorList = document.getElementsByClassName("actor");
    var theaterList = document.querySelectorAll(".theaterList"); //상영 리스트
    var pic = document.getElementById("fileUpload").value;

    const changeActorList = new Array();
    for (let index = 0; index < actorList.length; index++) {
      changeActorList.push(actorList[index].value);
    }
    const changeTheaterList = new Array();
    for (let index = 0; index < theaterList.length; index++) {
      console.log("영화관 정보 확인해보기");
      console.log(theaterList.item(index));
      console.log(theaterList.item(index).textContent);
      changeTheaterList.push(theaterList.item(index).textContent);
    }

    console.log("name" + name);
    console.log("genre" + genre);
    console.log("dir" + director);
    console.log("actors" + changeActorList);
    console.log("theaters" + changeTheaterList);
    console.log("pic" + pic);

    // 영화 객체 생성
    var movieId = defaultMovieId + movieIdGenerator;
    movieIdGenerator++;
    const movie = new Movie(
      movieId,
      name,
      genre,
      director,
      changeActorList,
      pic
    );
    console.log("Movie Object: " + JSON.stringify(movie));
    $.ajax({
      type: "post",
      url: "storeMovie.php",
      data: { movieObject: JSON.stringify(movie) },

      success: function (data) {
        isSuccess = true;
        console.log(data);
      },
      error: function (request, status, error) {
        isSuccess = false;
        console.log(
          "code:" +
            request.status +
            "\n" +
            "message:" +
            request.responseText +
            "\n" +
            "error:" +
            error
        );
      },
    });

    // 스케쥴 객체 생성
    for (let index = 0; index < changeTheaterList.length; index++) {
      var screnningId = defaultScrenningId + screnningIdGenerator;
      screnningIdGenerator++;
      var element = changeTheaterList[index];
      console.log(element);
      elementList = element.split(",");
      var date = elementList[0];
      var theaterName = elementList[1];
      const screening = new Screening(
        screnningId,
        date,
        movieId,
        theaterName,
        0
      );
      console.log("Screnning Object: " + JSON.stringify(screening));
      $.ajax({
        type: "post",
        url: "storeSchedule.php",
        data: { screeningObject: JSON.stringify(screening) },

        success: function (data) {
          isSuccess = true;
          console.log(data);
        },
        error: function (request, status, error) {
          isSuccess = false;
          console.log(
            "code:" +
              request.status +
              "\n" +
              "message:" +
              request.responseText +
              "\n" +
              "error:" +
              error
          );
        },
      });
    }
    if (isSuccess) {
      alert(" 영화 정보 저장에 성공하셨습니다.");
    }
  });
});

function Screening(id, date, movie_id, screnning_id, reserve_seat) {
  this.id = id;
  this.date = date;
  this.movie_id = movie_id;
  this.screnning_id = screnning_id;
  this.reserve_seat = reserve_seat;
}

function Movie(id, movie, genre, director, actors, file_name) {
  this.id = id;
  this.movie_name = movie;
  this.genre = genre;
  this.director = director;
  this.actors = actors;
  this.file_name = file_name;
}
