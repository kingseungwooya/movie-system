var actorsCount = 1;

// 배우 추가하기
var addActorBt = document.getElementById("addActorBt");

addActorBt.addEventListener("click", function() {
    if(actorsCount < 3) {
        var actorList = document.getElementById("actorList");
        var input   = document.createElement('input'); 
		input.type   = 'text'; 
        input.class = "actor";
		input.name  = "actor" + actorsCount; 
        input.style = "width:90px"  ;
        actorList.appendChild(input);
        actorsCount++;
        console.log(actorsCount);
    } else{
        alert(" 배우 입력은 최대 3명까지 가능합니다. ")
    }
})

// 배우 지우기
var deleteActorBt = document.getElementById("deleteActorBt");

deleteActorBt.addEventListener("click", function() {
    if( actorsCount > 1 ) {
        //var target = [];
        var actorList = document.getElementById("actorList");
        actorList.lastChild.remove();
        
        actorsCount--;
    } else {
        alert("배우 입력 최소값은 1입니다.")
    }
})
var searchTheater = document.getElementById("searchTheater");

var dates = [];
var isDuplicated;
var inputDate;
// 날짜 선택하기 
searchTheater.addEventListener("click", function() {
    var date = document.getElementById("openDate");
    if(date.value != "" ) {
        console.log(date.value);
        inputDate = date.value;
        if(dates.some(contain)){
            isDuplicated = true;
        } else{
            dates.push(date.value);
        }
        document.getElementById("addMovie").disabled = false;
        document.querySelectorAll(".place").forEach (element => {
            element.disabled = false;
        });
    }
    else {
        alert("날짜를 선택해주세요");
    }
    
})

var contain = function(value) {
    return value === inputDate;
}

// 상영정보 추가하기
var addMovie =document.getElementById("addMovie");
addMovie.addEventListener("click", function() {
    if(isDuplicated) {
        alert("같은 날짜에 추가되었습니다.");
        isDuplicated = false;
    }else{
        addMovie.disabled = true;

        var selectedTheater = document.getElementsByName("place");
        var result = document.getElementById("theaterList");
        var checked;
        selectedTheater.forEach((node) => {
            if(node.checked) {
                checked = node;
            }
        })
        var info = document.createElement("p");
    
        var text = inputDate + "," + checked.value;
        var textNode = document.createTextNode(text);
        info.style =  "width:200px;  border: 1px solid black; "
        info.append(textNode);
        info.id = "resultTheater";
        result.append(info);
    }
    
})

const elImage = document.getElementById("poster");
elImage.addEventListener("change", (evt) => {
  const image = evt.target.files[0];
  if(!validImageType(image)) { 
    console.warn("invalide image file type");
    return;
  }
});

function valideImageType(image) {
  const result = ([ 'image/jpeg',
                    'image/png',
                    'image/jpg' ].indexOf(image.type) > -1);
  return result;
}

var poster = document.getElementById("poster");

$(function() {
    $("#search_box").keyup(function() {
        var myval = $("input[name=contact]:checked").val();
        $.ajax({
            url: "./store.php",
            data: { keyword : $(this).val(), contact : myval},
            method: "POST"
        })

        .done(function(result) {
            $(".suggestion_box").html(result);
        })
    })
});