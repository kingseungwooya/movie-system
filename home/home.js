const open = () => {
  document.querySelector(".modal").classList.remove("hidden");
};

const close = () => {
  document.querySelector(".modal").classList.add("hidden");
};

document.querySelector(".openBtn").addEventListener("click", open);
document.querySelector(".closeBtn").addEventListener("click", close);
document.querySelector(".bg").addEventListener("click", close);

var submitBt = document.getElementById("submitBt");
var signInBt = document.getElementById("signInBt");
var inputId;
// 로그인
submitBt.addEventListener("click", function () {
  inputId = document.getElementById("loginId").value;
  var inputPw = document.getElementById("loginPw").value;
  if (inputValidation(inputId, inputPw)) {
    var openBtn = document.querySelector(".openBtn");

    var topBar = document.getElementById("topBar");
    var textNew;
    if (openBtn.textContent == "로그인") {
      textNew = document.createTextNode("로그아웃");
      // 버튼 앞에 아이디 추가
      var textNode = document.createTextNode(inputId);

      var aNode = document.createElement("a");
      aNode.setAttribute("class", "idtext");
      aNode.style.width = "70px";
      aNode.append(textNode);
      appendFirst(topBar, aNode);
    }

    // 교체할 노드 만들기
    var newOpenBt = document.createElement("button");
    newOpenBt.setAttribute("class", "openBtn");
    newOpenBt.setAttribute("onclick", "logoutClick()");
    newOpenBt.appendChild(textNew);

    // 노드 교체
    openBtn.replaceWith(newOpenBt);
  }
});

function logoutClick() {
  var openBtn = document.querySelector(".openBtn");
  var topBar = document.getElementById("topBar");
  var textNew;
  console.log("려시레료");
  if (openBtn.textContent == "로그아웃") {
    console.log("로그아웃");
    textNew = document.createTextNode("로그인");

    // 교체할 노드 만들기
    var newOpenBt = document.createElement("button");
    newOpenBt.setAttribute("class", "openBtn");
    newOpenBt.appendChild(textNew);

    // 노드 교체
    openBtn.replaceWith(newOpenBt);
    var txt = document.querySelector(".idtext");
    topBar.removeChild(txt);
  }
}

function appendFirst(node, childNode) {
  if (node.firstChild) {
    node.insertBefore(childNode, node.firstChild);
  } else {
    node.appendChild(childNode);
  }
}

// 회원가입
signInBt.addEventListener("click", function () {
  var inputId = document.getElementById("loginId").value;
  var inputPw = document.getElementById("loginPw").value;
  if (inputValidation(inputId, inputPw)) {
    const person = new Person(inputId, inputPw);
    $.ajax({
      type: "post",
      url: "person.php",
      data: { personObject: JSON.stringify(person) },
      success: function (data) {
        alert("회원가입에 성공하셨습니다.!");
        console.log(data);
      },
      error: function (request, status, error) {
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
});

// 검증
function inputValidation(inputId, inputPw) {
  console.log(inputId);
  var patternId = /^([A-Za-z0-9]){6,15}$/;

  var patternPw = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

  var message = "아이디 또는 패스워드의 입력 양식을 체크해주세요";

  if (!patternId.test(inputId)) {
    alert("ID" + message);
    document.querySelector(".modal").classList.add("hidden");
    return false;
  }
  if (!patternPw.test(inputPw)) {
    alert("PW" + message);
    document.querySelector(".modal").classList.add("hidden");
    return false;
  }
  return true;
}

// 회원 객체 생성
function Person(id, pw) {
  this.Name = id;
  this.Password = pw;
}

// 영화 검색

var searchBt = document.getElementById("searchBt");

searchBt.addEventListener("click", function () {
  var key = document.getElementById("keyword").value;
  console.log(key);
  $.ajax({
    type: "post",
    url: "search.php",
    data: {
      keyword: key,
    },
    success: function (data) {
      // 결과를 띄울 부분
      var resultTable = document.querySelector(".resultTable");

      // create table
      let table = document.createElement("table");
      let thead = document.createElement("thead");
      let tbody = document.createElement("tbody");
      thead.style.backgroundColor = "green";
      // setting theead
      let row_1 = document.createElement("tr");
      let heading_1 = document.createElement("th");
      heading_1.innerHTML = "선택";
      let heading_2 = document.createElement("th");
      heading_2.innerHTML = "영화제목";
      let heading_3 = document.createElement("th");
      heading_3.innerHTML = "장르";
      let heading_4 = document.createElement("th");
      heading_4.innerHTML = "감독";
      let heading_5 = document.createElement("th");
      heading_5.innerHTML = "배우";
      let heading_6 = document.createElement("th");
      heading_6.innerHTML = "화일";

      row_1.appendChild(heading_1);
      row_1.appendChild(heading_2);
      row_1.appendChild(heading_3);
      row_1.appendChild(heading_4);
      row_1.appendChild(heading_5);
      row_1.appendChild(heading_6);
      thead.appendChild(row_1);
      console.log(data);

      // response 추가

      jsonData = JSON.parse(data);
      for (let index = 0; index < jsonData.length; index++) {
        let row = document.createElement("tr");

        const element = jsonData[index];
        const id = element["id"];
        const movie_name = element["movie_name"];
        const genre = element["genre"];
        const director = element["director"];
        const actors = element["actors"];
        const file_name = element["file_name"];

        // 선택 radiobox만들기
        let heading_1 = document.createElement("th");
        var radiobox = document.createElement("input");
        radiobox.type = "radio";
        radiobox.setAttribute("name", "selectMovie");
        radiobox.value = id;
        heading_1.appendChild(radiobox);

        //영화 제목
        let heading_2 = document.createElement("th");
        heading_2.innerHTML = movie_name;
        let heading_3 = document.createElement("th");
        heading_3.innerHTML = genre;
        let heading_4 = document.createElement("th");
        heading_4.innerHTML = director;
        let heading_5 = document.createElement("th");
        heading_5.innerHTML = actors;
        let heading_6 = document.createElement("th");
        let imageLink = document.createElement("a");
        imageLink.setAttribute("href", file_name);
        var textNode = document.createTextNode("미리보기");
        imageLink.appendChild(textNode);
        imageLink.innerText = "미리보기";
        heading_6.appendChild(imageLink);
        

        row.appendChild(heading_1);
        row.appendChild(heading_2);
        row.appendChild(heading_3);
        row.appendChild(heading_4);
        row.appendChild(heading_5);
        row.appendChild(heading_6);
        tbody.appendChild(row);
        table.appendChild(tbody);
      }
      table.appendChild(thead);
      resultTable.appendChild(table);
      console.log(JSON.parse(data));

      //$(".resultTable").html(data.length);
    },
    error: function (request, status, error) {
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
});
