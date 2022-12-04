const open = () => {
  document.querySelector(".modal").classList.remove("hidden");
}

const close = () => {
  document.querySelector(".modal").classList.add("hidden");
}

document.querySelector(".openBtn").addEventListener("click", open);
document.querySelector(".closeBtn").addEventListener("click", close);
document.querySelector(".bg").addEventListener("click", close);

var submitBt = document.getElementById("submitBt"); 
var signInBt = document.getElementById("signInBt");
var inputId;
// 로그인
submitBt.addEventListener("click", function() {
  inputId = document.getElementById("loginId").value;
  var inputPw = document.getElementById("loginPw").value;
  if(inputValidation(inputId, inputPw)) {
    var openBtn = document.querySelector(".openBtn");

    var topBar = document.getElementById("topBar");
    var textNew;
    if(openBtn.textContent == "로그인"){
      textNew = document.createTextNode("로그아웃");
      // 버튼 앞에 아이디 추가 
      var textNode = document.createTextNode(inputId);

      var aNode = document.createElement("a");
      aNode.setAttribute("class", "idtext")
      aNode.style.width = "70px";
      aNode.append(textNode);
      appendFirst(topBar, aNode);
    }
    

    // 교체할 노드 만들기
    var newOpenBt = document.createElement("button");
    newOpenBt.setAttribute("class","openBtn");
    newOpenBt.setAttribute("onclick", "logoutClick()")
    newOpenBt.appendChild(textNew);

    // 노드 교체
    openBtn.replaceWith(newOpenBt);

  }
})

function logoutClick() {
  var openBtn = document.querySelector(".openBtn");
  var topBar = document.getElementById("topBar");
  var textNew;
  console.log("려시레료")
  if(openBtn.textContent == "로그아웃"){
    console.log("로그아웃");
    textNew = document.createTextNode("로그인");
    
    // 교체할 노드 만들기
    var newOpenBt = document.createElement("button");
    newOpenBt.setAttribute("class","openBtn");
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
};

// 회원가입 
signInBt.addEventListener("click", function() {
  var inputId = document.getElementById("loginId").value;
  var inputPw = document.getElementById("loginPw").value;
  if(inputValidation(inputId, inputPw)) {
    const person = new Person(inputId, inputPw);
    $.ajax({
      type: "post",
      url: "person.php",
      data: { personObject : JSON.stringify(person) },
      success: function (data) {
          alert("회원가입에 성공하셨습니다.!")
          console.log(data);
      },
      error: function (request, status, error) {
          console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
      }
  });
  }
})

// 검증
function inputValidation(inputId, inputPw) {
  console.log(inputId);
  var patternId = /^([A-Za-z0-9]){6,15}$/;
  
  var patternPw = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

  var message = "아이디 또는 패스워드의 입력 양식을 체크해주세요";

  if(!patternId.test(inputId)) {
    alert("ID" + message)
    document.querySelector(".modal").classList.add("hidden");
    return false;
  }
  if(!patternPw.test(inputPw)) {
    alert("PW" + message)
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
