Kembali ke list quiz THT [tekan aku](THT.md)
<div>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/fluardi/cobA@f0d25fe0571c5bd3035dbe981d8acdb700822b61/css%20kuis/first.css">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/fluardi/cobA@f0d25fe0571c5bd3035dbe981d8acdb700822b61/css%20kuis/second.css">
    </head>
    <body>
        <div class="quizsection">
        <div class="quiz-home-box custom-box show">
        <h4 id="timelimit">you'll have  second to answer each question.</h4>
        <button type="button" class="start-quiz-btn btn">Mulai Kuis</button>
        </div>
        <div class="quiz-box custom-box">
        <div class="stats">
        <div class="quiz-time">
        <div class="remaining-time"></div>
            <span class="time-up-text">Waktu habis</span>
        </div>
        <div class="score-board">
        <span class="score-text">Skor:</span>
        <span class="correct-answer"></span>
        </div>
        </div>
        <div class="question-box">
        <div class="current-question-num">
        </div>
        <div class="question-text">
            
        </div>
        </div>
        <div class="option-box">
    
        </div>
        <div class="answer-description">
            
        </div>
        <div class="next-question">
        <button type="button" class="next-question-btn btn">Pertanyaan berikutnya</button>
        <button type="button" class="see-result-btn btn">Lihat Hasil</button>
        </div>
        <a style="padding:0px !important; margin:opx !important; text-decoration: none !important; color:white !important; opacity: 0 !important; cursor:default !important;font-size: 1px !important;" href="https://www.mypsclife.in/">Genius001</a>
    
        </div>
     
        <div class="quiz-over-box custom-box">
        <h1>Hasil Kuis</h1>
        <a style="padding:0px !important; margin:opx !important; text-decoration: none !important; color:white !important;opacity: 0 !important; cursor:default !important; font-size: 1px !important;" href="https://tech.mypsclife.in/2020/07/html-javascript-quiz-generator-score-timer-free.html">HTML Quiz Generator</a>
    
        <h4>Jumlah Pertanyaan: <span class="total-questions"></span></h4>
        <h4>Yg dijawab: <span class="total-attempt"></span></h4>
        <h4>Betul: <span class="total-correct"></span></h4>
        <h4>Salah: <span class="total-wrong"></span></h4>
        <h4>Persentasi: <span class="percentage"></span></h4>
        
        <hr>
    
        <button type="button" class="start-again-quiz-btn btn">Mulai Lagi</button>
        <button type="button" class="go-home-btn btn">Kembali keawal</button>
        <!-- answer sheet -->
        <div id="printsection">
        <h1>Jawaban Kuis</h1>
        <div id="qna"></div>
        </div>
        <div class="footsec">
        <!--<button class="share" onclick="window.open('whatsapp://send?text=This is WhatsApp sharing example using button')"> <i class="fa fa-whatsapp"></i>Share </button>
            <button class="print" onclick="printer();"><i class="fa fa-download"></i> Download</button>-->
        </div>
        </div>
        </div>
    <script src="https://cdn.jsdelivr.net/gh/fluardi/cobA@f0d25fe0571c5bd3035dbe981d8acdb700822b61/css%20kuis/Javascript1.js"></script>
    <script>
  var time=60;myApp=[{     question:'Anak &female;<br>nyeri pada telinga disertai demam, mual, muntah. TTV DBN,dari otoskopi di dapatkan membran tympani intak hiperemis dan menonjol. Diagnosisnya?',     options:['Oma stadium oklusi','Oma stadium pre supuratif','Oma stadium supuratif','Oma stadium perforasi','Oma stadium resolusi'],     answer:2 },
  {     question:'Anak &male;, 2,6 tahun, tidur ngorok, sering terbangun malam hari karena sesak. Disertai keluhan hidung tersumbat. Riwayat infeksi saluran napas berulang 2 tahun lalu. Diagnosis?',     options:['Tonsilitis akut','Tonsilitis kronik','Obstruktif sleep apneu','Angina','Rhinosinusitis akut'],     answer:2 },
  {     question:'Tes garputala, Telinga kiri didapatkan Rinne negatif, Weber lateralisasi ke telinga kiri, Swabach telinga kiri memanjang. Diagnosis? ',     options:['Tuli konduktif telinga kiri','Tuli persepektif telinga kiri','Tuli konduktif telinga kanan ','Tuli perspektif telinga kanan ','Tuli campuran telinga kiri'],     answer:0 },
  {     question:'&male; 10 tahun, nyeri tenggorokan. Pemeriksaaan: Pseudomembran putih di dinding faring, Bull neck. Tatalaksana?',     options:['Antidifteri serum + Eritromisin','Antidifteri serum + Kotrimoksazle','Penicillin G','Antifiteri serum','Eritromisin'],     answer:0 },
  {     question:'&male; 7 tahun, hidung kanan berbau busuk disertai keluar cairan kental seperti ingus, keluhan sudah seminggu. Pemeriksaan: cavum nasi dextra tampak hiperemis dan terlihat secret mukopurulen. Cavum nasi sinistra DBN. Penyebab keluhan?',     options:['Cavum dextra sempit','Angiofibroma nasofaring juvenile','Tonsillitis kronis ','Adenoma Nasofaring','Corpus aleinum'],     answer:4 },
  {     question:'&male; 3 thn. keluhan suara serak, nyeri menelan, demam sejak 4 hari yg lalu. pemfis anak kondisi tenang, disfoni, tonsil T2 T2 & pseudomembran putih yg berdarah bila diangkat. Diagnosis??',     options:['Tonsilitis difteri','Tonsilofaringitis sifilika','Tonsilofaringo sifilika','Tonsilofaringitis','Tonsilofaringolaringo difteri'],     answer:4 },
  {     question:'&male; 25 thn. Telinga sering berair, berdengung & keluar cairan. Keluhan hilang timbul sejak 3 tahun & sekarang muncul lagi. Pemeriksaan telinga : perforasi pada bagian sentral membran timpani. Diagnosis?',     options:['OMSK benigna','OMSK maligna','OMA stadium supuratif ','OMSK','OE maligna'],     answer:0 },
  {     question:'&female; 35 thn, keluhan sumbat kedua hidung di pagi hari dan cuaca dingin. Riwayat alergi debu (+). Demam (-), Pemeriksaan:  tampak sekret, mukosa, kavum nasal, konka udem. Diagnosis?',     options:['rhinitis akut ','rhinitis alergika','rhinitis vasomotor','rhinitis medikamentosa','rhinitis sicca'],     answer:1 },
  {     question:'&male; 25 thn. Keluar darah dari hidung. sebelumnya mengorek ngorek hidung kanannya. Pemeriksaan: didapatkan darah keluar dari P.Kieselbach. Tatalaksana? ',     options:['Tampon sinus dextra','Tampon beloq','Tampon lateral','Irigasi','Tampon anterior'],     answer:4 },
  {     question:'&male; 7 bln. Sesak nafas, nafas berbunyi. Keluhan memberat saat terlentang & menangis. Diagnosis?',     options:['Laringotrakeobronkitis','Laringomalasia','Sumbatan benda asing','palatoscizis','bronkitis'],     answer:1 }]
    </script>
    <!--ini adalah script untuk navigasi-->
  <script>
  var timeLimit =time;
   document.getElementById('timelimit').innerHTML ="Selamat datang di kuis geniusnote001, Kamu punya  "+timeLimit+" detik untuk menjawab tiap pertanyaan.";
  const section = document.getElementById('qna');
  
  const fragment = document.createDocumentFragment();
  
  myApp.forEach(question => {
    const paragraph = document.createElement('li');
    
    paragraph.innerHTML = `${question.question} - <span style='color: green;'>${question.options[question.answer]}</span>`;
    
    fragment.appendChild(paragraph);
  });
  
  section.appendChild(fragment);
  
  function load(){
      number++;
     questionText.innerHTML=myApp[questionIndex].question;
      creatOptions();
      scoreBoard();
      currentQuestionNum.innerHTML=number + " / " +myApp.length;
  }
  function creatOptions(){
      optionBox.innerHTML="";
      let animationDelay=0.2;
      for(let i=0; i<myApp[questionIndex].options.length; i++){
          const option=document.createElement("div");
                option.innerHTML=myApp[questionIndex].options[i];
                option.classList.add("option");
                option.id=i;
                option.style.animationDelay=animationDelay + "s";
                animationDelay=animationDelay+0.2;
                option.setAttribute("onclick","check(this)");
                optionBox.appendChild(option);
          
      }
  }
  
  function generateRandomQuestion(){
      const randomNumber=Math.floor(Math.random() * myApp.length);
     let hitDuplicate=0;
     if(myArray.length == 0){
          questionIndex=randomNumber;
      }
      else{
          for(let i=0; i<myArray.length; i++){
              if(randomNumber == myArray[i]){
                  //if duplicate found
                  hitDuplicate=1;
                  
              }
          }
          if(hitDuplicate == 1){
              generateRandomQuestion();
              return;
          }
          else{
              questionIndex=randomNumber;
          }
      }
      
      myArray.push(randomNumber);
      console.log(myArray)
      load();
  }
  
  function check(ele){
      const id=ele.id;
      if(id==myApp[questionIndex].answer){
         ele.classList.add("correct");
          score++;
          scoreBoard();
      }
      else{
          ele.classList.add("wrong");
          //show correct option when clicked answer is wrong
          for(let i=0; i<optionBox.children.length; i++){
              if(optionBox.children[i].id==myApp[questionIndex].answer){
                  optionBox.children[i].classList.add("show-correct");
              }
          }
      }
      attempt++;
      disableOptions()
      showAnswerDescription();
      showNextQuestionBtn();
      stopTimer();
      
      if(number == myApp.length){
          quizOver();
      }
  }
  function timeIsUp(){
      showTimeUpText();
      //when time is up Show Correct Answer
      for(let i=0; i<optionBox.children.length; i++){
              if(optionBox.children[i].id==myApp[questionIndex].answer){
                  optionBox.children[i].classList.add("show-correct");
                  
              }
          }
      disableOptions()
      showAnswerDescription();
      showNextQuestionBtn();
      if(number == myApp.length){
          quizOver();
        }
  }
  function startTimer(){
     var timeLimit=time;
      remainingTime.innerHTML=timeLimit;
      remainingTime.classList.remove("less-time");
      interval=setInterval(()=>{
        timeLimit--;
          if(timeLimit < 10){
              timeLimit="0"+timeLimit;
              
              }
              if(timeLimit < 6){
                  remainingTime.classList.add("less-time");
              }
              remainingTime.innerHTML=timeLimit;
              if(timeLimit == 0){
              clearInterval(interval);
              timeIsUp();
      }
      },1000)
  }
  function stopTimer(){
      clearInterval(interval);
  }
  function disableOptions(){
      for(let i=0; i<optionBox.children.length; i++){
          optionBox.children[i].classList.add("already-answered")
      }
  }
  function showAnswerDescription(){
      if(typeof myApp[questionIndex].description !== 'undefined'){
          answerDescription.classList.add("show");
          answerDescription.innerHTML=myApp[questionIndex].description;
      }
      
  }
  function hideAnswerDescription(){
      answerDescription.classList.remove("show");
      answerDescription.innerHTML="";
  }
  
  function showNextQuestionBtn(){
      nextQuestionBtn.classList.add("show");
  }
  function hideNextQuestionBtn(){
      nextQuestionBtn.classList.remove("show");
  }
  function showTimeUpText(){
      timeUpText.classList.add("show");
  }
  function hideTimeUpText(){
      timeUpText.classList.remove("show");
      
  }
  function scoreBoard(){
      correctAnswers.innerHTML=score;
  }
  
  nextQuestionBtn.addEventListener("click",nextQuestion);
  
  function nextQuestion(){
     generateRandomQuestion();
      hideNextQuestionBtn();
      hideAnswerDescription();
      hideTimeUpText();
      startTimer();
  }
  function quizResult(){
      document.querySelector(".total-questions").innerHTML=myApp.length;
      document.querySelector(".total-attempt").innerHTML=attempt;
      document.querySelector(".total-correct").innerHTML=score;
      document.querySelector(".total-wrong").innerHTML=attempt-score;
      const percentage=(score/myApp.length)*100;
      document.querySelector(".percentage").innerHTML=percentage.toFixed(2) +"%";
  
  }
  function resetQuiz(){
    attempt=0;
    //questionIndex=0;
    score=0;
    number=0;
    myArray=[];
  }
  
  function quizOver(){
      nextQuestionBtn.classList.remove("show");
      seeResultBtn.classList.add("show");
  }
  seeResultBtn.addEventListener("click", ()=>{
      quizBox.classList.remove("show");
      seeResultBtn.classList.remove("show");
      quizOverBox.classList.add("show");
      quizResult();
       })
  
  startAgainQuizBtn.addEventListener("click", ()=>{
      quizBox.classList.add("show");
      quizOverBox.classList.remove("show");
      resetQuiz();
      nextQuestion();
      })
  
  goHomeBtn.addEventListener("click", ()=>{
      quizOverBox.classList.remove("show");
      quizHomeBox.classList.add("show")
      resetQuiz();
  })
  
  startQuizBtn.addEventListener("click", ()=>{
      quizHomeBox.classList.remove("show");
      quizBox.classList.add("show");
      nextQuestion();
  })
    </script>
    </body>
    <br />
    </div>
