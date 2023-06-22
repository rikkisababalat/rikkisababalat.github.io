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
  var time=60;myApp=[{     question:'&female; 4 thn, Perdarahan gusi sejak 3 bln. Pasien pucat & lemas. Pemeriksaan: TTV DBN, konjungtiva anemis & terdapat pembesaran gusi. Lab: Hb 4 g/dl, Hct 17%, leukosit 100.000 /uL, trombosit 16.000/uL, limfoblast 25%. Diagnosis?',     options:['Leukemia leukositik akut','Leukemia myeloblastik akut','Leukemia limfositik akut',' Leukemia limfositik kronik','Myelodisplasia'],     answer:2 },
  {     question:'&male; 8 thn, lutut bengkak & kemerahan. Tidak ada riwayat trauma. Pasien sebelumnya pernah mengalami perdarahan masif saat dilakukan sirkumsisi. Riwayat kakak laki-laki pasien telah meninggal juga sering mengalami keluhan serupa. Pemeriksaan: hemarthrosis genue dextra & sinistra. Lab: Hb 12 g/dL, Hct 38%, Leukosit 4.500 mm3, Trombosit 357.000 mm3 (normal). Kelainan yang dialami pasien?',     options:['Kuantitatif trombosit','Kualitatif trombosit','Koagulasi','Trombosis','Pembuluh darah'],     answer:2 },
  {     question:'&male; 4 thn, Mimisan & timbul bercak-bercak merah pada kulitnya sejak 10 hari. Awalnya demam 1 minggu, lalu batuk pilek namun sudah sembuh. Pemeriksaan:  TD 100/70, nadi 94x/menit, nafas 20x/menit, suhu afebris. Lab: Hb 11,4 gr/dl, leukosit 6.300/mm<sup>3</sup>, trombosit 18.000/mm<sup>3</sup>. PT dan aPTT normal. Diagnosis?',     options:['Hemofilia','DIC','ITP','Defisiensi vitamin K','Von Willebrand Disease'],     answer:2 },
  {     question:'Bayi &male; 5 hari, perdarahan sukar berhenti pada bekas suntikan hepatitis B. Pemeriksaan: darah merembes dari bekas suntikan paha kanan, anemis (+), ikterus(-), hepatomegali(-), splenomegali (-). Riwayat bayi sejak lahir mendapat susu formula karena ASI tidak keluar. Lab: Hb 11, Leukosit 8.500, trombrosit 170.000, BT normal, CT memanjang, PT & aPTT memanjang. Diagnosis?',     options:['ITP','Hemofilia A','Hemofilia B','Defisiensi vitamin K','DIC'],     answer:3 },
  {     question:'&male; 10 thn, Muncul bintik-bintik kemerahan di kedua kaki sejak 3 hari disertai dengan nyeri sendi, mual, muntah, & BAB hitam. Sebelumnya pasien batuk & pilek. 6 bulan yang lalu pernah mengalami hal serupa, tapi keluhan saat ini lebih berat. Pemeriksaan: didapatkan palpable purpura & makula eritematosus kedua ekstremitas bawah. Lab Hb. 12 g/dl, Hct 36%, Leukosit 4.700, Trombosit 412.000, dan peningkatan laju endap darah. Diagnosis?',     options:['Idiopathic thrombocytopenic purpura','Thrombotic thrombocytopenic purpura','Henoch schenloin purpura','Iritable bowel disease','Diseminate Intravascular Coagulation'],     answer:2 },
  {     question:'&male; 7 thn, Demam sejak 3 hari. Sebelumnya  mimisan. Pemeriksaan: TD 90/70mmHg, Nadi 138x/m, RR 28x/m, Tax 38<sup>O</sup>C. Lab Hb 14,9, Hct 48%, trombosit 38.000, Leukosit 2.100. Pasien tampak lemas & tidak mau minum. Terapi?',     options:['Cairan koloid 10 mg/kgBB','Cairan dextose 5%','Cairan kristaloid rumatan','Cairan kristaloid 20cc/kg BB','Pembemberian antibiotik'],     answer:3 },
  {     question:'&female; 5 thn, mimisan sejak 3 jam SMRS. Sebelumnya demam 3 hari. Pemeriksaan: Kesadaran compos mentis, TTV TD 110/80 mmHg, HR 120 kali/menit, RR 22 kali/menit, suhu 38,2<sup>O</sup>C. Lab: Trombosit 45.000, Hb 13 g/dl, hematokrit 46%, leukosit 3.200. Diagnosis?',     options:['Demam dengue','Demam berdarah dengue derajat I','Demam berdarah dengue derajat II','Demam berdarah dengue derajat III','Demam berdarah dengue derajat IV'],     answer:2 },
  {     question:'&female; 7 thn, Penurunan kesadaran. Riwayat demam tinggi 4 hari disertai nyeri sendi. 2 hari lalu pasien mimisan. Pemeriksaan: TD 80/palpasi, HR 110x/m , RR 20x/m. Lab : Hb 15 g/dl, Hct 49%, trombosit 90.000. Diagnosis?',     options:['Demam Dengue','Demam Berdarah Dengue grade I','Demam Berdarah Dengue grade II','Demam Berdarah Dengue grade III ','Demam Berdarah Dengue grade IV'],     answer:3 },
  {     question:'&female; 9 thn, Demam sejak 4 hari. Pasien mengeluh pusing dan mual. Pada pemeriksaan fisik TTV DBN, tes Rumple Leede (+). Lab: Hb 13 g/dl, Hct 47%, Leukosit 6500, Trombosit 98.000. Diagnosis?',     options:['Demam dengue','Dengue hemorrhagic fever grade I','Dengue hemorrhagic fever grade II','Dengue hemorrhagic fever grade III','Dengue hemorrhagic fever grade IV'],     answer:1 },
  {     question:'Anak 4 thn, Demam tinggi sejak 3 hari disertai nyeri sendi & sakit kepala sejak 1 hari lalu. Pemeriksaan: Kesadaran komposmentis, TD 95/60mmHg, nadi 110x/m, rr 30x/m, Tax 38,5<sup>O</sup>C, didapatkan ptekie kedua lengan, tidak ada hepatosplenomegali, akral hangat. Lab: Hb 11 g/dl, Hct 39% (normal), leukosit 4.000, trombosit 80.000. Diagnosis?',     options:['DHF grade I','DHF grade II','DHF grade III','DHF grade IV','Demam dengue'],     answer:4 }]
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
