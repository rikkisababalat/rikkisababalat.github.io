Kembali ke list quiz Obgyn [tekan aku](Obgyn.md)
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
  var time=60;myApp=[{     question:'&female; Bercak perdarahan di jalan lahir. Tidak menstruasi selama 3 minggu. Pasien dinyatakan hamil setelah cek urin dibidan. Tidak ada nyeri & ostium tertutup. Diagnosis?',     options:['Abortus Insipien','Abortus Iminens','KET','Abortus komplit','Missed abortus'],     answer:1 },
  {     question:'&female; 25 thn hamil 18 minggu, Keluar darah dari kemaluan, darah keluar sedikit. Pemeriksaan: DJJ +, OUE tertutup. Diagnosis?',     options:['Abortus insipien','Abortus inkomplit','Abortus imminens','Abortus komplit','Missed abortion'],     answer:2 },
  {     question:'&female; 20 thn, Perdarahan pervaginam. Pasien tidak haid  1.5 bln. Pemeriksaan: KU sakit berat, somnolen, TD 90/60 mmHg, HR 140x/m, nafas 24x/m, suhu 36.7, konjungtiva anemis. Pemeriksaan fundus: 3 jari di atas simpisis pubis. Pemeriksaan genitalia, OUE terbuka, ada jaringan. Diagnosis ?',     options:['Abortus imminens','Abortus komplit','Abortus inkomplit','Abortus habitualis','Abortus provokatus'],     answer:2 },
  {     question:'&female; Perdarahan pervaginam dipicu hubungan seksual. Perdarahan keluar bergumpal-gumpal. Pasien terlambat mens 3 bulan. Pemeriksaan dalam, teraba portio tertutup. hCG (+). Pemeriksaan USG, tidak tampak gestational sac. Diagnosis?',     options:['Missed abortion','KE','Abortus inkompletus','Mola hidatidosa','Abortus kompletus'],     answer:4 },
  {     question:'&female; 23 thn, Perdarahan dari jalan lahir. Telat haid 2 minggu. Pemeriksaan: TD 100/70 mmHg, HR 90x/m, suhu 39. Pada inspekulo, OUE tertutup. Diagnosis ? ',     options:['Abortus komplit','Abostus inkomplit','Missed abortion','Abortus septik','Tidak abortus'],     answer:3 },
  {     question:'&female; hamil 12 minggu tidak merasakan gerakan janin. Pemeriksaan USG embrionik usia 10 minggu, tidak ada denyut jantung janin. Diagnosis?',     options:['Abortus insipien','A.imminens','Missed abortion','Abortus inkomplit','Abortus komplit'],     answer:2 },
  {     question:'&female; G5P4A0 UK 32 minggu, Bercak merah pada jalan lahir, Pemeriksaan: TD 122/80, HR 88 x/m, RR 20x/m, TFU di tengah simfisis & pusat, Pemeriksaan penunjang yang tepat?',     options:['USG abdomen','Beta hCG','Foto polos','CT-scan ','MRI'],     answer:0 },
  {     question:'&female; 23 thn, Keluar darah banyak dari jalan lahir, sebelumnya keluar flek-flek dari jalan lahir 1 hari yang lalu. Pasien hamil 3 bulan. Pemeriksaan sekarang TFU sesuai dengan kehamilan. VT : V/V fluxus (+), ostium terbuka 2 cm. Diagnosis?',     options:['Mola hidatidosa','Abortus imminens','Abortus inkomplit','Abortus komplit','Abortus insipien'],     answer:4 },
  {     question:'&female; 24 thn, Sakit perut tiba-tiba disertai bercak perdarahan dari jalan lahir 2 jam lalu. Pasien terlambat haid 4 minggu. Pemeriksaan: Konjunctiva anemis, TD 80 palpasi, HR 140 x/m, nyeri tekan perut sebelah kanan. VT:  nyeri goyang portio (+), Inspekulo: cavum douglas menonjol, darah di sarung tangan (+). Hb : 7 gr/dl, leukosit 15.000. Diagnosis?',     options:['Kehamilan ektopik','Kehamilan ektopik terganggu','Solutio placenta','Ruptur uteri','Perotonitis e.c kehamilan'],     answer:1 },
  {     question:'&female; G2P0A1 29 thn merasa hamil 2 bulan karena 2 hari ini mengalami perdarahan pervaginam & nyeri perut hebat. Pemeriksaan: Pasien tampak pucat. TD 80/60, HR 104x, RR 18x, suhu 37.6 C. Dimanakah letak tersering kejadian tersebut?',     options:['Ampula tuba','Fimbria','Pars istmi tuba','Pars intersisial tuba','Uterus'],     answer:0 }]
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
