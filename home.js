var isIsu1Checked = false;
var students = [];


var storeBt = document.getElementById("store");
storeBt.addEventListener("click" , function() {
  var name = document.getElementById("name").value;
  var web = document.getElementById("web").value;
  var eng = document.getElementById("eng").value;
  var chang = document.getElementById("chang").value;
  var isu1 = document.getElementById("isu1").value;

  const student =  new StudentInfo(name, web, eng, chang);

  if(isIsu1Checked) {
    // 추가되면 그 때 멤버변수 추가
    student.addVar();
    student.setIsu1(isu1);
  }

  students.push(student);

  alert(name + "학생의 정보가 저장되었습니다.")
})

var addBt = document.getElementById("addSubject");
addBt.addEventListener("click", function() {
  var isu1 = prompt("새로 추가할 과목 이름을 입력하세요.");
  var resultBox = document.getElementById("resultBox");
  var text = document.createTextNode(isu1 +"을 추가하셨습니다.");
  resultBox.append(text);

  isIsu1Checked = true;
  StudentInfo.prototype.addVar = function() {
    this.isu1 = 0;
  }
})


function StudentInfo(name, web, eng, chang) {
  this.name = name;
  this.web = web;
  this.eng = eng;
  this.chang = chang;

  this.setIsu1 = function(isu1) {
    this.isu1 = isu1;
  }

  this.sum = function() {
    var isu1 = 0;
    if(isIsu1Checked) {
      isu1 = this.isu1;
    }
    return parseInt(web) + parseInt(eng) + parseInt(chang) + parseInt(isu1);
  }
}
var searchBt = document.getElementById("searchBt");
searchBt.addEventListener("click" , function() {
  var keyword = document.getElementById("searchByName").value;

  var htmlStr = "";
	htmlStr += "<table>";
  htmlStr += "<tr><th>학생 이름</th><th>웹프로그래밍</th><th>IT 영어</th><th>창업 실습</th><th>os</th><th>합계</th></tr>";
  for (let index = 0; index < students.length; index++) {
    const element = students[index];
    if(element.name == keyword){
      htmlStr += "<tr>";
      htmlStr += "<td>" + element.name +"</td>";
      htmlStr += "<td>" + element.web +"</td>";
      htmlStr += "<td>" + element.eng +"</td>";
      htmlStr += "<td>" + element.chang +"</td>";
      htmlStr += "<td>" + element.isu1 +"</td>";
      htmlStr += "<td>" + element.sum() +"</td>";
      htmlStr += "</tr>"
    }
    
  }
	htmlStr += "</table>";

	// 결과 HTML을 FORM의 결과 출력 DIV에 삽입

	$("#resultBox2").html(htmlStr);
}
);


