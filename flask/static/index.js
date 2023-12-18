// 페이지가 렌더링 될때까지 기다렸다가 시작
window.addEventListener('DOMContentLoaded', function()
{
    let voiceForm = document.getElementById("voiceForm");

    // 폼 전송시 실행
    voiceForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let sentence = document.getElementById("sentence");

        if (sentence == "") {
            alert("문장을 입력해주세요!");
        } else {
            // perform operation with form input
            alert(sentence.value + " 문장이 입력되었습니다!");
            console.log("getPost() 함수 호출")
            getVoice(sentence.value)
            // location.href='/voice/'+sentence.value;
        //      `This form has a username of ${username.value} and password of ${password.value}`

        }
    });
    
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
    
    
    // 음성파일을 화면에 출력
    // 음성 출력 여부 버튼에 따라 audio 태그 속성 autoplay 가 변경되야 함
    function print_voice(audio_src){
        let voice_tag = document.querySelector("#voice");
        voice_tag_html = `<h1>문장이 있습니다~ ${sentence.value} </h1><br>
                <audio src="../${audio_src}" controls autoplay></audio>`;
        voice_tag.insertAdjacentHTML("beforeend", voice_tag_html);
    }
    
    
    
    
});