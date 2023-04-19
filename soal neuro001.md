Kembali ke list quiz Neuro [tekan aku](Neuro.md)
<div>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/fluardi/cobA@f0d25fe0571c5bd3035dbe981d8acdb700822b61/css%20kuis/first.css">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <head>o
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
  var time=60;myApp=[{     question:'&male; 40 thn,Penurunan kesadaran. sebelumnya mengeluh nyeri kepala & muntah. Pasien memiliki riwayat Hipertensi &Diabetes. Pemeriksaan: GCS 234 TD 230/130mm Hg, Nadi 98x/m RR 24x/m Tax 37C. Reflek Babinski (+), Reflek Biceps meningkat. Motorik didapatkan lateralisasi dextra, parese nervus VII dextra UMN. Diagnosis?',     options:['Epidural hematom','Stroke Perdarahan Subarakhnoid','Stroke Perdarahan intracranial','Stroke Infark Trombosis','Subdural hematoma'],     answer:2 },
  {     question:'&male; 40 thn,Penurunan kesadaran. sebelumnya mengeluh nyeri kepala & muntah. Pasien memiliki riwayat Hipertensi &Diabetes. Pemeriksaan: GCS 234 TD 230/130mm Hg, Nadi 98x/m RR 24x/m Tax 37C. Reflek Babinski (+), Reflek Biceps meningkat. Motorik didapatkan lateralisasi dextra, parese nervus VII dextra UMN. Berapa Siriraj dari pasien? ',     options:['-7','-1','0','1','7'],     answer:4 },
  {     question:'&male; 40 thn, Nyeri pada pelipis terutama bagian mata kanan disertai hidung tersumbat dan mata berair.  Pasien pernah mengalami keluhan serupa. Diagnosis?',     options:['Cluster Headache','TTH','Migraine','Neuralgia Trigeminal','Tumor Otak'],     answer:0 },
  {     question:'&female; 25 thn. Mulut mencong ke arah kiri disertai kelopak mata kanan sulit terbuka di pagi hari. Kelemahan n.VII perifer (+). Pemfis DBN. Saraf cranial lainny DBN. Terapi?',     options:['Antibiotik','Vitamin C','Prednison','Anti virus ','Vitamin B Complex'],     answer:2 },
  {     question:'&male; 35 thn, nyeri kepala 3 hari,  tidak berdenyut, dibelakang Mata, keluar air Mata & keluar air dari hidung. Terapi?',     options:['Ergotamin','Ergotamin dan Oksigen','Paracetamol','Natrium Diclofenac','Pijat Refleksi'],     answer:1 },
  {     question:'&male; 45 thn, Tidak dapat menggerakkan lengan & tungkai bawah sisi kanan sejak beberapa jam SMRS. Tidak ada trauma sebelumnya. Pemeriksaan: TD 110/70mmHg N: 98x/menit R: 18x/menit T: 37,00C. Kekuatan otot lengan dan tungkai tidak dapat bergerak, tetapi terdapat tonus otot. Berapakah kekuatan otot pasien?',     options:['0','1','2','3','4'],     answer:1},
  {     question:'&male; 35 thn, Sakit kepala satu sisi (kanan), berdenyut yang diawai nyeri ulu hati disertai dengan mual dan mata berkunang-kunang. Keluhan pernah dirasakan sejak kurang lebih 10 tahun lalu, namun beberapa bulan terakhir terjadi hampir setiap hari. Pemeriksaan: TD:100/70, HR: 80x/m, Tax: 36,5, RR: 20. Status neurologis  DBN. Tatalaksanan?',     options:['Ibuprofen','Asam mefenamat','Asam tranexamat','Parasetamol','Triptan'],     answer:4 },
  {     question:'&male; 28 thn , KLL 1 jam lalu. TF 90/70mmHg. HR: 108x/m. GCS: mata respon bila mendengar suara, motorik dekortikasi & suara berbicara tidak jelas dengan dirangsang nyeri. Pemeriksaan neurologi, hemipharesis kanan (+). GCS  Pasien?',     options:['E3V2M3','E2V3M2','E4V3M4','E3V1M5','E2V2M5'],     answer:0 },
  {     question:'&female; 30 thn, Penurunan kesadaran sejak 30 mnt lalu. 1 jam sebelumnya nyeri kepala hebat & muntah proyektil. Pemeriksaan: TD 130/90, Nadi, RR dan suhu DBN. Defisit neurologi (-). Kaku kuduk (+), hemiparesis (-). Diagnosis yang tepat?',     options:['Perdarahan sub araknoid','Perdarahan intraserebral','Meningitis','Tumor otak','Stroke iskemik'],     answer:0 },
  {     question:'&female; 45 thn, Sering pusing berputar, memberat sejak 3 bulan terakhir, durasi 1-2 jam. Keluhan disertai penurunan pendengaran telinga kanan & kadang berdenging. Pemeriksaan: TD 130/70mmHg; N 80x/mnt; RR 16x/mnt; Suhu 36,5. Pemeriksaan neurologis DBN. Diagnosis yang tepat?',     options:['Tumor otak',' Meniere Disease','Stroke vestibuloserebelar','BPPV','Labirinitis'],     answer:1 }]
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
