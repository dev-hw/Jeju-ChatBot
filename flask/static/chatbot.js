var sendForm = document.querySelector('#chatform'),
    textInput = document.querySelector('.chatbox'),
    chatList = document.querySelector('.chatlist'),
    userBubble = document.querySelectorAll('.userInput'),
    botBubble = document.querySelectorAll('.bot__output'),
    animateBotBubble = document.querySelectorAll('.bot__input--animation'),
    overview = document.querySelector('.chatbot__overview'),
    hasCorrectInput,
    imgLoader = false,
    animationCounter = 1,
    animationBubbleDelay = 600,
    input,
    previousInput,
    isReaction = false,
    unkwnCommReaction = "I didn't quite get that.",
    chatbotButton = document.querySelector(".submit-button")

sendForm.onkeydown = function(e){
  if(e.keyCode == 13){
    e.preventDefault();

    //No mix ups with upper and lowercases
    var input = textInput.value.toLowerCase();

    //Empty textarea fix
    if(input.length > 0) {
      createBubble(input)
    }
  }
};

sendForm.addEventListener('submit', function(e) {
  //so form doesnt submit page (no page refresh)
  e.preventDefault();

  //No mix ups with upper and lowercases
  var input = textInput.value.toLowerCase();

  //Empty textarea fix
  if(input.length > 0) {
    createBubble(input)
  }
}) //end of eventlistener

var createBubble = function(input) {
  //create input bubble
  var chatBubble = document.createElement('li');
  chatBubble.classList.add('userInput');

  //adds input of textarea to chatbubble list item
  chatBubble.innerHTML = input;

  //adds chatBubble to chatlist
  chatList.appendChild(chatBubble)

  checkInput(input);
}


// 텍스트 입력 후 전송 시 호출됨
var checkInput = function(input) {

  isReaction = true;

  // input으로 답변을 받기
  // answer = 함수(input)

  // 답변을 제주도 사투리어로 변경
  // jeju_answer = 함수(answer)

  // 음성 출력 여부 확인
  // voice toggle button 
  let voice_check = document.getElementById("voice_yn");
  let is_checked = voice_check.checked
  console.log("is_checked:", is_checked)
  if (is_checked) {
    // voice = 함수(jeju_answer)
    console.log("소리O")

    jeju_answer = "안녕하우꽈" // 테스트용으로 하드코딩해둠
    voice = getVoice(jeju_answer)
  }else{
    console.log("소리X")
  }
    
  



  // 화면에 출력하기
  // 함수(answer, jeju_answer, voice)

  // 답장을 화면에 출력하기
  responseCommand(input);

}

// 답변 받아오기
function getAnswer(input){            
    $.ajax({
        type:"get",  // fetch의 method 기능
        url: "/question/"+input, 
        timeout:10000,
        // 성공
        success:function(){
            console.log("success " + input);
        },
        error:function(request,error){
            alert("fail " + input);
        }
    })
}

// 음성 만들기
function getVoice(sentence){
    $.ajax({
        type:"get",  // fetch의 method 기능
        url: "/voice/"+sentence, 
        timeout:10000,
        // 성공
        success:function(audio_src){
            console.log("success " + audio_src);
            print_voice(audio_src);
        },
        error:function(request,error){
            alert("fail " + sentence);
        }
    })
}

// 음성 소리 출력하기
function print_voice(audio_src){
  let hidden_area = document.querySelector("#hidden_area");
  voice_tag_html = `
      <audio src="../${audio_src}" autoplay></audio>`;
  hidden_area.insertAdjacentHTML("beforeend", voice_tag_html);
}


function responseCommand(unkwnCommReaction) {
  // animationCounter = 1;

  //create response bubble
  var failedResponse = document.createElement('li');

  failedResponse.classList.add('bot__output');
  failedResponse.classList.add('bot__output--failed');

  //Add text to failedResponse
  failedResponse.innerHTML = unkwnCommReaction; //adds input of textarea to chatbubble list item

  //add list item to chatlist
  chatList.appendChild(failedResponse) //adds chatBubble to chatlist

  animateBotOutput();

  // reset text area input
  textInput.value = "";

  //Sets chatlist scroll to bottom
  chatList.scrollTop = chatList.scrollHeight;

  animationCounter = 1;
}

function responseText(e) {

  var response = document.createElement('li');

  response.classList.add('bot__output');

  //Adds whatever is given to responseText() to response bubble
  response.innerHTML = e;

  chatList.appendChild(response);

  animateBotOutput();

  console.log(response.clientHeight);

  //Sets chatlist scroll to bottom
  setTimeout(function(){
    chatList.scrollTop = chatList.scrollHeight;
    console.log(response.clientHeight);
  }, 0)
}

function responseImg(e) {
  var image = new Image();

  image.classList.add('bot__output');
  //Custom class for styling
  image.classList.add('bot__outputImage');
  //Gets the image
  image.src = "/images/"+e;
  chatList.appendChild(image);

  animateBotOutput()
  if(image.completed) {
    chatList.scrollTop = chatList.scrollTop + image.scrollHeight;
  }
  else {
    image.addEventListener('load', function(){
      chatList.scrollTop = chatList.scrollTop + image.scrollHeight;
    })
  }
}

//change to SCSS loop
function animateBotOutput() {
  chatList.lastElementChild.style.animationDelay= (animationCounter * animationBubbleDelay)+"ms";
  animationCounter++;
  chatList.lastElementChild.style.animationPlayState = "running";
}

function commandReset(e){
  animationCounter = 1;
  previousInput = Object.keys(possibleInput)[e];
}


var reactionInput = {
  "best work" : function(){
    //Redirects you to a different page after 3 secs
    responseText("On this GitHub page you'll find everything about Navvy");
    responseText("<a href='https://github.com/meesrutten/chatbot'>Navvy on GitHub</a>")
    animationCounter = 1;
    return
  },
  "about" : function(){
    responseText("Things I want to learn or do:");
    responseText("Get great at CSS & JS animation");
    responseText("Create 3D browser experiences");
    responseText("Learn Three.js and WebGL");
    responseText("Combine Motion Design with Front-End");
    animationCounter = 1;
    return
    }
}



