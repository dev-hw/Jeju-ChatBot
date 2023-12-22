# 프로젝트명
> 제주도 사투리로 말하는 챗봇 제작 프로젝트

**느영나영은 제주도 사투리로 '너랑 나랑'이라는 뜻을 가지고 있습니다.**

<img src="https://i.imgur.com/5uUlaGF.png" width="400" height="400"/>

## 프로젝트 소개

<p align="justify">
제주도 챗봇 만들기
  <br/>
  <br/>
- 제주도 사투리를 구사하는 친근한 챗봇<br/>
  
- 오디오 on/off 버튼으로 제주도 사투리의 억양으로 출력하는 기능 추가<br/>
  
</p> 
<br></bf>

## 설치 방법

OS X & 리눅스:

```sh
npm install my-crazy-module --save
```

윈도우:

```sh
edit autoexec.bat
```

<br></br>
## 데이터 사용
### [한국어 방언 발화(제주도)](https://www.aihub.or.kr/aihubdata/data/view.do?currMenu=&topMenu=&aihubDataSe=data&dataSetSn=121)
- 제주도 번역기 데이터셋으로 활용
- 제주도 사투리 TTS 모델 학습 데이터 사용

### [중·노년층 한국어 방언 데이터 (충청도, 전라도, 제주도)](https://www.aihub.or.kr/aihubdata/data/view.do?currMenu=&topMenu=&aihubDataSe=data&dataSetSn=71558)
- 제주도 사투리 TTS 모델 학습 데이터 사용

<br></br>

## 개발 환경

**[언어]**
- Python


**[라이브러리]**
- hugging face


**[모델]**
- XTTS
- Mistral
- BART

  
**[웹 & 서버]**
- flask
- html, js, css
- ajax

<br></br>



**개발 환경**
```
- 운영체제 : Windows 10
- 버전 관리 시스템 : Git, Github
- 개발 도구 : VScode
- 개발 언어 및 프레임워크 : Python3, jupyter notebook, colab, Pytorch, Tensorflow
- GPU: NVIDIA T4
```

**XTTS 파인튜닝한 클라우드 환경**
```
- Ubuntu 20.04.6 LTS
- GPU: NVIDIA A10G 1개 (32GiB)
- CPU: AMD EPYC 7R32 8개 (24GiB)
Flask==3.0.0
torch==2.1.2
TTS==0.22.0
tensorboard==2.15.1
```

**Mistral 환경**
```
- GPU-A10G-1-AMD-24
- AMD vCPU 96개
- 384 GiB 메모리
- NVIDIA 24
torch==2.1.2
Flask==3.0.0
spacy==3.7.2
wandb==0.16.1
```


## 서비스 구현

### [서비스 플로우 Figma](https://www.figma.com/proto/F8WqhYwGj6cyRdHTCL6arQ/AI-Chatbot-UI-Kit-(Community)?page-id=0%3A1&type=design&node-id=102-487&viewport=105%2C1007%2C0.22&t=GJjLAb9scIw3y7wj-1&scaling=min-zoom&starting-point-node-id=102%3A487&mode=design)
<br></br>
#### 메인 화면
![](https://i.imgur.com/pfWP8fe.png)
#### 채팅 시작 화면
![](https://i.imgur.com/KJSZMEi.png)
#### 채팅 진행 화면
![](https://i.imgur.com/EqkxL4W.png)
### 플로우 차트
![](https://i.imgur.com/eCwAy2W.png)


<br>

## 구현 기능

### 1 챗봇과의 일상 대화
![](https://lh7-us.googleusercontent.com/fzc3Rrt0PSCJ7pslHHc8DouywAbJpnzsFnNET1myiqHCsKIk0SsMzwbAL84wVmQD7l34sA4UHxslheUaZfoghQC-HE_vqp0zUPLRwWcY_x-ALZ_NzRSjzAC-U-1myHWupD38vDCqiMWUkUrxLozAMU4xLw=s2048)
- mistral7B 모델을 통해서 챗봇과의 일상적인 대화가 가능합니다.
- 예시 문장인 프롬프트를 입력해보세요.
  
### 2 제주도 사투리로 답변
- 제주도 사투리의 output과 표준어 output 두 가지로 답변합니다.
- 사투리로만 답변하면 이해하기 어려울 수도 있기 때문에 표준어도 같이 제공합니다.

### 3 제주도 억양으로 듣기
- 제주도 억양을 학습시킨 XTTS 모델을 활용합니다.
- 전송버튼 전에 오디오 토글 버튼을 on으로 바꿔보세요. 자동으로 출력됩니다.


<br>

## 구현 기능

### [웹페이지 구현]
[![결과 영상](https://i.imgur.com/5uUlaGF.png)](https://youtu.be/CeZdtO4QFbY?si=B4kcAgkjjux2bYAe)

</br>


<br>

## 시행착오

**[오디오 시행착오]**




**[챗봇 시행착오]**


<img src="https://i.imgur.com/7efRVa4.png" width="400" height="400"/>

- 챗봇과 번역기가 제대로 합쳐지지 않아 출력이 나오지 않음
- false시 나오는 "다시 입력해주세요" 문구만 출력됨


<img src="https://i.imgur.com/4XYqpha.png" width="400" height="400"/>

- 터미널 콘솔에서는 잘 입력되지만 실제 화면에서는 구현되지 않음
- js 함수 호출의 문제

  
<img src="https://i.imgur.com/XXQokki.png" width="400" height="450"/>

- 앞 부분만 반복적으로 출력되는 오류
- app.py 부분의 호출 함수 수정 후 고쳐짐
- 챗봇 생성 모델이 제대로 구현되지 않음


<img src="https://i.imgur.com/ayDmUfa.png" width="400" height="450"/>

- 처음으로 제대로 구현된 챗봇

</br>

<br>

## 개선사항

<p align="justify">

</p>

1. 더 양질의 사투리 데이터셋 구축
2. 샘플 데이터를 통해 다양한 모델 리서치 후 연구
3. 배포 후 정확한 평가를 위한 베타테스트 시행

<br>

## 라이센스

MIT &copy; [NoHack](mailto:lbjp114@gmail.com)

<!-- Stack Icon Refernces -->

[js]: /images/stack/javascript.svg
[ts]: /images/stack/typescript.svg
[react]: /images/stack/react.svg
[node]: /images/stack/node.svg




<br>
