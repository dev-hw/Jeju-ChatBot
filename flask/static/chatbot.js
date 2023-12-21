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

let printVoice = false;

let bar = document.getElementById("loadding_bar")


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

//   checkInput(input);
    checkInput(input)
}



// 프로미스를 사용한 비동기 함수
function asyncGetAnswer(input) {
    return new Promise((resolve, reject) => {
        let state = getAnswer(input)
        resolve(state)
    });
}

// 프로미스를 사용한 비동기 함수
function asyncGetVoice(input) {
    return new Promise((resolve, reject) => {
        let audio_src = getVoice(input)
        resolve(audio_src)
    });
}


// 실행 함수 정의
async function executeGetAnswer(input) {
    
    if (!input){
        return false
    }
    
    console.log("asyncGetAnswer 동기 함수 실행 시작");

    // 동기 함수 실행
    await asyncGetAnswer(input);

    console.log("asyncGetAnswer 동기 함수 실행 종료");
    
}


// 실행 함수 정의
async function executeGetVoice(input) {
   
    if (!input){
        return false
    }
    
    console.log("asyncGetVoice 동기 함수 실행 시작");

    // 동기 함수 실행
    await asyncGetVoice(input);

    console.log("asyncGetVoice 동기 함수 실행 종료");
    
}



// 텍스트 입력 후 전송 시 호출됨
async function checkInput(input) {
    
  isDone = false
  
  if(!isDone){
      bar.style.visibility="visible";
  }
  

  isReaction = true;
  
  await executeGetAnswer(input)        
  
    
  console.log("answer: ", answer);
  console.log("jeju_answer: ", jeju_answer);
    

  // 음성 출력 여부 확인
  // voice toggle button 
  let voice_check = document.getElementById("voice_yn");
  let is_checked = voice_check.checked
  console.log("is_checked:", is_checked)
  if (is_checked) {
    console.log("소리O")
    
    await executeGetVoice(jeju_answer) 
     
    
      
  }else{
    console.log("소리X")
  }
    
   if (answer == ""){
   
      responseCommand("다시 입력해주세요.", "다시 입력해주세요."); 
   
   }else{
       // 화면에 출력하기
      responseCommand(answer, jeju_answer);

      if(isDone){
          bar.style.visibility="hidden" 
      }
      
    }

}








// 답변 받아오기
function getAnswer(input){            
    $.ajax({
        type:"get",  // fetch의 method 기능
        url: "/process_input/"+input, 
        timeout:100000,
        async:false,
        // 성공
        success:function(result){
            console.log("success getAnswer() 함수 성공" + input);
            answer = result.answer
            jeju_answer = result.jeju_answer
            console.log("answer " + answer);
            console.log("jeju_answer " + jeju_answer);
        },
        error:function(request,error){
            alert("fail getAnswer() 함수 실패 " + input);
            
        }
    
    })
    
   
}

// 음성 만들기
function getVoice(sentence){
    $.ajax({
        type:"get",  // fetch의 method 기능
        url: "/voice/"+sentence, 
        timeout:100000,
        async:false,
        // 성공
        success:function(audio_src){
            console.log("success " + audio_src);
            print_voice(audio_src)
            
            return audio_src
        },
        error:function(request,error){
            alert("fail " + sentence);
            
            return "error"
        }
    })
}

// 음성 소리 출력하기
function print_voice(audio_src){
  let hidden_area = document.querySelector("#hidden_area");
  voice_tag_html = `
      <audio src="../${audio_src}" autoplay></audio>`;
  hidden_area.insertAdjacentHTML("beforeend", voice_tag_html);
  printVoice = true;
}


function responseCommand(comm, jeju_comm) {
  // animationCounter = 1;

  //create response bubble
  var successResponse = document.createElement('li');

  successResponse.classList.add('bot__output');
  successResponse.classList.add('bot__output--failed');

  
  response_html = `<p>${comm}</p>
  <p style="font-size:11px;color:lightslategray">${jeju_comm}</p>`


  //Add text to successResponse
  successResponse.innerHTML = response_html; //adds input of textarea to chatbubble list item

  //add list item to chatlist
  chatList.appendChild(successResponse) //adds chatBubble to chatlist

  animateBotOutput();

  // reset text area input
  textInput.value = "";

  //Sets chatlist scroll to bottom
  chatList.scrollTop = chatList.scrollHeight;

  animationCounter = 1;
    
  isDone = true;
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



