Kembali ke list quiz Anak [tekan aku](Anak.md)
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
  var time=60;myApp=[{     question:'Anak 2 thn, 1 bulan terakhir tampak lemas & tidak mau makan. Riwayat minum ASI ekslusif 6 bulan. Usia 7 bulan pasien diberi MPASI bubur susu 1/2 mangkuk tidak habis, sering dimuntahkan tiap makan. Pasien tidak suka makan daging dan sayuran. Pemeriksaan: Konjungtiva anemis. Pemeriksaan lab: Hb 9 g/dL, Leukosit 4.900, Trombosit 250.000, Hct 32%, MCV 60%, MCH 27%, MCHC 18%. Tatalaksana yang tepat? ',     options:['Pemberian suplemen Fe selama 3 bulan ','Pemberian suplemen Fe selama 6 bulan ','Pemberian susu formula dengan Fe dosis tinggi ','Pemberian makanan padat dengan porsi sedikit tapi sering ','Pemberian makanan tambahan yang mengandung Fe'],     answer:0 },
  {     question:'Anak 7 thn, Pucat & lemas sejak 1 bulan lalu. Pemeriksaan: HR:92x/m, RR:26x/m, Tax:36, konjungtiva anemis, hepar teraba 2 jari di bawah arcus costae, lien Schuffner II. Pemeriksaan lab: Hb 8 g/dL, Hct 32%, Leukosit 4.600, Trombosit 378.000. Hapusan darah tepi: sel pensil dan sel target. Proses yang mendasari anemia pasien?',     options:['Defisiensi besi','Hemoglobinopati','Defisiensi asam folat','Defisiensi B12','Autoimun'],     answer:1 },
  {     question:'&female; 10 thn sering merasa lelah sejak 1 bulan. Riwayat tidak suka minum susu, sayur dan daging. KU tampak lesu dengan wajah pucat & TTV DBN. Pemeriksaan: konjungtiva anemis & telapak tangan tampak pucat. Pemeriksaan lab Hb 8,6, leukosit 7.000, Hct 25%, trombo 276.000, MCV 75, MCH 25, MCHC 31, retikulosit 1,1. Pemeriksaan penunjang yang diperlukan?',     options:['SI/TIBC','RDW','Hapusan darah tepi','Hb elektroforesis','Tes Coomb’s'],     answer:0 },
  {     question:'&female; 5 thn, Pucat sejak 1 bulan terakhir disertai kulit dan tungkai sering memar. Pemeriksaan: TTV DBN, konjungtiva anemis, echimosis tungkai atas & bawah, hepar & lien tidak teraba besar. Pemeriksaan lab: Hb 7 g/dl, Hct 29%, leukosit 2000/uL, trombosit 40.000/uL, MCV 92 fL, MCH 38 fL, MCHC 40 fL. Diagnosis?',     options:['Anemia aplastik','Anemia hemolitk','Anemia defsiensi besi','Anemia penyakit kronik','Anemia pernisiosa'],     answer:0 },
  {     question:'Anak 3 thn, Pucat sejak 5 bulan disertai lemas dan tidak nafsu makan. Pemeriksaan: hepar teraba satu jari di bawah costae & lien schuffner 3. Pemeriksaan lab: Hb 9, Hct 26, Leu 4.200 Trombosit 368.000, MCV 65%, MCH 28%, MCHC 22%. Pemeriksaan yang tepat?',     options:['Apusan darah tepi','Bone marrow puncture','Elektroforesis Hb ','Sediaan besi','Pungsi sumsum tulang belakang'],     answer:2 },
  {     question:'&male; 15 thn, Pucat, badan kurus, tubuh pendek tidak sesuai usianya. Pemeriksaan: facies colley, anemis dan splenomegali. Lab: Hb 7, Leukosit 4.300, Trombosit 320.000, MCV 75, MCH25, MCHC 26, SI normal, TIBC normal. Hb elektroforesa didapatkan HbF 60%. Diagnosis?',     options:['Thalasemia','Anemia megaloblastik','Anemia defisiensi Fe','Anemia aplastik','Anemia Fanconi'],     answer:0 },
  {     question:'&male; 1.5 thn, Pucat & malas bermain sejak 1 bulan yang lalu. Pemeriksaan: konjungtiva anemis, hepatosplenomegali & sklera ikterik. lab: Hb 9, Leukosit 4.500, Trombosit 254.000. Apusan darah tepi: sel target dan sel pencil. Klasifikasi anemia pasien?',     options:['Anemia normokrom normositik','Anemia hipokrom normositik','Anemia hiperkrom makrositik','Anemia normokrom mikrositik','Anemia hipokrom mikrositik'],     answer:4 },
  {     question:'bayi &male; 0 hari, dilahirkan beberapa jam yang lalu pervaginan, usia kehamilan cukup bulan, AS 7-9. Pemeriksaan: Ikterus kramer III. Pemeriksaan lanjut: golongan darah bayi A+ dan ibu B+. Pemeriksaan penunjang untuk diagnosis?',     options:['Pemeriksaan hemaglobinuria','Pemeriksaan fungsi hati ','Pemeriksaan fungsi ginjal','Direct coomb test','Apusan darah tepi'],     answer:3 },
  {     question:'Bayi baru lahir, Tampak pucat dan ikterik. Riwayat persalinan normal pervaginam, usia kehamilan cukup bulan, BBL 2.900 gram, AS 8-9. Pemeriksaan: TTV DBN, anemis & ikterus kramer IV. Lab: Hb 6 g/dL, Hct 28%, RBC: 2.400.000, WBC: 9.200, Trombosit 160.000. Golongan darah ibu O rhesus positif dan bayi AB rhesus negatif. Diagnosa pasien?',     options:['Anemia hemolitik','Asfiksia neonatorum','Sepsis neonatorum','Inkompatibilitas Rhesus','Inkompatibilitas ABO'],     answer:4 },
  {     question:'&female; 6 thn, Pucat sejak 2 bulan lalu disertai mudah sakit, sering demam, tubuh mudah lebam dan sering mimisan. Pemeriksan: tampak pucat & hepatomegali. Lab: Hb 9, leukosit 67.000, trombosit 130.000, sel blast 26% dan ditemukan gambaran Auer rod. Diagnosis?',     options:['Leukimia limfositik kronik','Leukimia limfositik akut','Leukimia myeloblastik akut','Leukimia myeloblastik kronik','Anemia aplastik'],     answer:2 }]
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
