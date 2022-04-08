
const questions=[
    {
        a:"images/a1.jpg",
        b:"images/b1.jpg",
        correct:"a"
    },
    {
        a:"images/a.jpg",
        b:"images/b.jpg",
        correct:"b"
    },
   
]
/*spinner*/
window.onload=function(){
    let spinner=document.getElementById('spinner');
    document.body.style.overflow='hidden';
    setTimeout(function(){
        spinner.style.display="none"
        document.body.style.overflow='auto'; 
    },3000)

}
/*scaleable function*/
let content = document.getElementById('content'),
        wrapper = document.getElementById('wrap'),
        maxWidth  = content.clientWidth,
        maxHeight = content.clientHeight;
window.addEventListener("resize", resize);
resize();
function resize(){let scale,
    width = window.innerWidth,
  height = window.innerHeight,
  isMax = width >= maxWidth && height >= maxHeight;

    scale = Math.min(width/maxWidth, height/maxHeight);
    content.style.transform = isMax?'':'scale(' + scale + ')';
    wrapper.style.width = isMax?'':maxWidth * scale;
    wrapper.style.height = isMax?'':maxHeight * scale;
}
/*content*/
/*elements decleration*/
 const a=document.getElementById('a')
const b=document.getElementById('b')
 const question=document.getElementById('content-question')
const answers=document.querySelectorAll('.answer')
const img=document.getElementById('correct-a')
const option=document.getElementById('status')
const optionB=document.getElementById('statusB')
const main=document.getElementById('content-text')
const control=document.getElementById('controls')
const child=document.getElementById('parent')
const sucess= document.getElementById("myAudioS");
const fail= document.getElementById("myAudioF"); 

const divC= document.getElementById("divCorrect"); 
const divw= document.getElementById("divwrong"); 

const firstBtn=document.getElementById('reloadFirst')
const currentBtn=document.getElementById('reloadCurrent')
const showBtn=document.getElementById('show')
const preBtn=document.getElementById('previous')
const nextBtn=document.getElementById('next')
const q=document.getElementById('numberQ')
const sliderN=document.getElementById('slide')




a.addEventListener('click',changeA)
b.addEventListener('click',changeB)

/* global vaiables*/
let sliderIndex=0;
let index=1;
let score=0;
let storeData=[]
 let valueAnswer;
localStorage.setItem("answerQuestions",JSON.stringify(storeData));

/* function used*/
load();
function load(){
if(index==1){
  preBtn.disabled = true
  preBtn.nextElementSibling.style.opacity="0.5" 
}
if(index!=1){
  preBtn.disabled = false
  preBtn.nextElementSibling.style.opacity="1" 
}
sliderN.value=`Q:${index}`
a.nextElementSibling.src=questions[sliderIndex].a;
b.nextElementSibling.src=questions[sliderIndex].b;
q.innerText=`${index}`
 firstBtn.addEventListener('click',reloadFirst);
 currentBtn.addEventListener('click',redo);
 showBtn.addEventListener('click',show);
  preBtn.addEventListener('click',previosPage);
nextBtn.addEventListener('click',nextPage);

}
function storeAnswer(){
  valueAnswer= answer();
  console.log(valueAnswer)
  storeData =JSON.parse(localStorage.getItem("answerQuestions")) ;
  storeData.push(valueAnswer)
  console.log(storeData)
  localStorage.setItem("answerQuestions",JSON.stringify(storeData));

}
function changeA(){
  b.disabled = true
  b.nextElementSibling.style.opacity="0.5"
  b.nextElementSibling.style.transform = "perspective(600px) translateZ(-60px)";
  a.nextElementSibling.style.transform = "perspective(600px) translateZ(60px)";
 valueAnswer= answer();
 storeAnswer()
if(valueAnswer===questions[sliderIndex].correct){
 

     option.innerHTML="<i class='fa-solid fa-check ' id='true'></i>"
     showBtn.disabled = true
     showBtn.nextElementSibling.style.opacity="0.5"
     sucess.play();
     divC.style.display="inline-block"
     setTimeout(function() {
       sucess.pause(); 
       sucess.currentTime = 0
   },2000);
   
}
else{
   option.innerHTML= "<i class='fa-solid fa-xmark' id='wrong'></i>"
   fail.play();
   divw.style.display="inline-block"
  setTimeout(function() {
    divw.style.display="none"
    fail.pause();
    fail.currentTime = 0
    unCheckAnswer()
},500);
 
  
}

 }
 function changeB(){
   a.disabled = true
   a.nextElementSibling.style.opacity="0.5"
  a.nextElementSibling.style.transform = "perspective(600px) translateZ(-60px)";
  b.nextElementSibling.style.transform = "perspective(600px) translateZ(60px)";
  valueAnswer= answer();
  storeAnswer()
  if(valueAnswer===questions[sliderIndex].correct){
  
    optionB.innerHTML="<i class='fa-solid fa-check' id='true'></i>"
    showBtn.disabled = true
    showBtn.nextElementSibling.style.opacity="0.5"
    sucess.play();
    divC.style.display="inline-block"
    setTimeout(function() {
      sucess.pause(); 
      sucess.currentTime = 0
  },2000);
  }
 else{
 
  optionB.innerHTML= "<i class='fa-solid fa-xmark' id='wrong'></i>"
  fail.play();
  divw.style.display="inline-block"
setTimeout(function() {
  divw.style.display="none"
  fail.pause();
  fail.currentTime = 0
  unCheckAnswer()
},500);
 }

 }




 
 function nextPage(){
  stopAudio()
    showBtn.disabled = false
  showBtn.nextElementSibling.style.opacity="1"
  console.log('click')
  valueAnswer= answer();
 if(valueAnswer===questions[sliderIndex].correct){
   score++;
 }
 sliderIndex++;
 (index==questions.length)?'':index++;
 if(sliderIndex< questions.length){
   unCheckAnswer()
   load();
 }
 else{
  
   
   if(score===questions.length){
   
    window.location.href = "win.html";
  
   }
   else{
    window.location.href = "tryAgain.html";
   
   }
  
 }
}
function answer(){
   let value;
answers.forEach((answer)=>{
    if(answer.checked==true){
   
      value=answer.id;
    }  
})
  return value;
}
function unCheckAnswer() {
  
 answers.forEach((answer) => {
    answer.checked = false;
   answer.disabled=false
   answer.nextElementSibling.style.opacity="1"
   optionB.innerHTML=""
   option.innerHTML=""
   answer.nextElementSibling.style.transform = "perspective(600px) translateZ(0)";

  
 });
}
function checkAnswer(id) {

 if(id==='a')
 {
   changeA()
 }
 else{
 
   changeB();
 }

}

function previosPage(){
  stopAudio()
  sliderIndex--;
  index--;
  unCheckAnswer() 
  storeData =JSON.parse(localStorage.getItem("answerQuestions")) ;
  answers.forEach((answer)=>{
   
    if(answer.id===questions[sliderIndex].correct)
    {  
      answer.checked=true
    checkAnswer(questions[sliderIndex].correct)
     
    
      load();

    }
   
  
  })
 
  


}
function reloadFirst(){
  stopAudio()
  showBtn.disabled = false
  showBtn.nextElementSibling.style.opacity="1"
  index=1
  sliderIndex=0
  unCheckAnswer()
  load()
}
function redo(){
  stopAudio()
  showBtn.disabled = false
  showBtn.nextElementSibling.style.opacity="1"
  unCheckAnswer()
  load()
}

function show(){
  stopAudio()
  answers.forEach((answer)=>{
   
    if(answer.id===questions[sliderIndex].correct)
    {  
      answer.checked=true
    checkAnswer(questions[sliderIndex].correct)
     
    
      load();

    }
   
  
  })
  showBtn.disabled = true
  showBtn.nextElementSibling.style.opacity="0.5"
}
function stopAudio(){
  sucess.pause(); 
  sucess.currentTime = 0
  fail.pause();
  fail.currentTime = 0
  divC.style.display="none"
  divw.style.display="none"
}

 