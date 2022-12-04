const open = () => {
  document.querySelector(".modal").classList.remove("hidden");
}

const close = () => {
  document.querySelector(".modal").classList.add("hidden");
}

document.querySelector(".openBtn").addEventListener("click", open);
document.querySelector(".closeBtn").addEventListener("click", close);
document.querySelector(".bg").addEventListener("click", close);


var inputId = document.getElementById("loginId");
var inputPw = document.getElementById("loginPw");
var submitBt = document.getElementById("submitBt"); 
var signInBt = document.getElementById("signInBt");

// 로그인
submitBt.addEventListener("click", function() {
  if(inputValidation(inputId, inputPw)) {

  }
})

// 회원가입 
signInBt.addEventListener("click", function() {
  if(inputValidation(inputId, inputPw)) {
    
  }
})

// 검증
function inputValidation(inputId, inputPw) {
  var patternId = "^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$";
  
  var patternPw = ": ^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$";

  var message = "아이디 또는 패스워드의 입력 양식을 체크해주세요";

  if(!patternId.test(inputId)) {
    alert(message)
    return false;
  }
  if(!patternPw.test(inputPw)) {
    alert(message)
    return false;
  }
  return true;
}
