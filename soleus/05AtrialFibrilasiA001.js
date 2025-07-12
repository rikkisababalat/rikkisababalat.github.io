        // Data kasus, diagnosis banding (5 pilihan), dan kuis
        const caseData = {
            diagnoses: [
                { id: 'af-rvr', name: 'Atrial Fibrilasi (RVR)', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">❤️‍🔥</div></div>`, description: 'Aritmia supraventrikular dengan aktivasi atrium yang tidak terkoordinasi dan respon ventrikel yang ireguler dan cepat.', analysis: 'SANGAT SESUAI. EKG menunjukkan irama irregularly irregular, tidak ada gelombang P yang jelas, dan laju ventrikel >100x/menit. Ini adalah tanda patognomonik dari AF dengan RVR.' },
                { id: 'atrial-flutter', name: 'Atrial Flutter (Blok Variabel)', matchScore: 6, vizIconHtml: `<div class="viz-icon bg-purple-100"><div class="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center text-3xl">〰️</div></div>`, description: 'Aritmia atrial terorganisir dengan sirkuit re-entry, menghasilkan laju atrial cepat dan blok AV yang bervariasi.', analysis: 'CUKUP SESUAI. Kondisi ini dapat menyebabkan irama ventrikel yang ireguler. Namun, pada EKG kasus ini, tidak terlihat gelombang "sawtooth" (gigi gergaji) yang khas untuk flutter, melainkan baseline yang benar-benar khaotik, membuat AF jauh lebih mungkin.'},
                { id: 'mat', name: 'Multifocal Atrial Tachycardia', matchScore: 5, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">🔀</div></div>`, description: 'Takikardia ireguler yang disebabkan oleh setidaknya 3 fokus atrial yang berbeda.', analysis: 'KURANG SESUAI. Meskipun MAT juga ireguler, EKG-nya harus menunjukkan setidaknya 3 morfologi gelombang P yang berbeda. Pada kasus ini, tidak ada gelombang P yang dapat diidentifikasi sama sekali, yang membuatnya tidak cocok.' },
                { id: 'svt', name: 'Supraventricular Tachycardia', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">⚡️</div></div>`, description: 'Takikardia kompleks sempit yang berasal dari atas ventrikel.', analysis: 'TIDAK SESUAI. SVT klasik (seperti AVNRT) memiliki irama yang sangat reguler (jarak R-R sama). Pasien ini memiliki irama yang jelas-jelas ireguler.' },
                { id: 'sinus-tachy', name: 'Takikardi Sinus', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">🏃‍♂️</div></div>`, description: 'Laju sinus yang lebih cepat dari normal (>100x/menit), biasanya karena respons fisiologis.', analysis: 'TIDAK SESUAI. Takikardi sinus memiliki irama yang reguler dan setiap kompleks QRS didahului oleh satu gelombang P yang normal. Pasien ini tidak memiliki keduanya.' }
            ],
            quiz: [
                { question: "Berikut ini yang merupakan komplikasi neurologik dari kasus ini adalah…", options: ["Stroke hemoragik", "Meningioma", "Stroke non hemoragik", "Bell’s palsy", "Perdarahan subarachnoid"], answer: "Stroke non hemoragik" },
                { question: "Apa interpretasi EKG yang paling akurat untuk pasien ini?", options: ["Takikardi Sinus", "Ventrikel Takikardi", "Atrial Fibrilasi dengan RVR", "Normal Sinus Rhythm"], answer: "Atrial Fibrilasi dengan RVR" },
                { question: "Manakah ciri EKG yang PALING khas untuk Atrial Fibrilasi?", options: ["Gelombang P tinggi", "Kompleks QRS lebar", "Irama irregularly irregular & tidak ada gelombang P", "Interval PR memendek"], answer: "Irama irregularly irregular & tidak ada gelombang P" },
                { question: "Mengapa Takikardi Sinus (Sinus Tachycardia) bukan diagnosis yang tepat?", options: ["Karena lajunya terlalu lambat", "Karena iramanya reguler dan memiliki gelombang P", "Karena QRS-nya lebar", "Karena pasien tidak demam"], answer: "Karena iramanya reguler dan memiliki gelombang P" },
                { question: "Apa mekanisme utama terjadinya stroke pada pasien dengan Atrial Fibrilasi?", options: ["Pecahnya plak aterosklerosis di karotis", "Emboli dari trombus yang terbentuk di atrium", "Hipertensi yang menyebabkan perdarahan", "Infeksi pada katup jantung"], answer: "Emboli dari trombus yang terbentuk di atrium" }
            ]
        };

        const { diagnoses, quiz: quizData } = caseData;
        
        const navContainer = document.getElementById('diagnosis-nav');
        const detailsContainer = document.getElementById('diagnosis-details');
        let chart = null;

        function renderDetails(diagnosisId) {
            const diagnosis = diagnoses.find(d => d.id === diagnosisId);
            if (!diagnosis) return;
            detailsContainer.innerHTML = `
                <div class="bg-white p-6 rounded-xl shadow-lg border border-slate-200 transition-all duration-300 ease-in-out">
                    <div class="flex flex-col md:flex-row items-center gap-6">
                        ${diagnosis.vizIconHtml}
                        <div class="flex-1 text-center md:text-left">
                            <h3 class="text-2xl font-bold text-emerald-800">${diagnosis.name}</h3>
                            <p class="text-slate-600 mt-1">${diagnosis.description}</p>
                        </div>
                    </div>
                    <div class="mt-4 pt-4 border-t border-slate-200">
                        <h4 class="font-semibold text-slate-700">Analisis Kecocokan dengan Kasus:</h4>
                        <p class="text-slate-600 mt-1">${diagnosis.analysis}</p>
                    </div>
                </div>
            `;
            document.querySelectorAll('#diagnosis-nav button').forEach(btn => {
                btn.classList.toggle('nav-button-active', btn.dataset.id === diagnosisId);
                btn.classList.toggle('nav-button-inactive', btn.dataset.id !== diagnosisId);
            });
        }

        function createNav() {
            diagnoses.forEach(diagnosis => {
                const button = document.createElement('button');
                button.textContent = diagnosis.name;
                button.dataset.id = diagnosis.id;
                button.className = 'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 nav-button-inactive';
                button.onclick = () => renderDetails(diagnosis.id);
                navContainer.appendChild(button);
            });
        }

        function createChart() {
            const ctx = document.getElementById('matchChart').getContext('2d');
            const data = {
                labels: diagnoses.map(d => d.name),
                datasets: [{
                    label: 'Tingkat Kecocokan',
                    data: diagnoses.map(d => d.matchScore),
                    backgroundColor: diagnoses.map(d => d.matchScore >= 8 ? '#059669' : (d.matchScore >= 5 ? '#34d399' : '#a7f3d0')),
                    borderColor: diagnoses.map(d => d.matchScore >= 8 ? '#065f46' : (d.matchScore >= 5 ? '#059669' : '#6ee7b7')),
                    borderWidth: 1,
                    borderRadius: 4
                }]
            };
            if(chart) { chart.destroy(); }
            chart = new Chart(ctx, {
                type: 'bar',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y',
                    scales: {
                        x: { beginAtZero: true, max: 10, title: { display: true, text: 'Skor Kecocokan (0-10)', font: { size: 14 } } },
                        y: { ticks: { font: { size: 12 } } }
                    },
                    plugins: {
                        legend: { display: false },
                        tooltip: { callbacks: { label: (context) => ` Skor: ${context.parsed.x}` } }
                    }
                }
            });
        }
        
        const quizContainer = document.getElementById('quiz-container');
        let currentQuestionIndex = 0;
        let score = 0;
        let selectedAnswer = null;

        function loadQuiz() {
            currentQuestionIndex = 0;
            score = 0;
            selectedAnswer = null;
            
            const quizHeader = quizContainer.querySelector('#quiz-header');
            const quizBody = quizContainer.querySelector('#quiz-body');
            const quizFooter = quizContainer.querySelector('#quiz-footer');
            const resultContainer = quizContainer.querySelector('#result-container');
            
            if (quizHeader) quizHeader.classList.remove('hidden');
            if (quizBody) quizBody.classList.remove('hidden');
            if (quizFooter) quizFooter.classList.remove('hidden');
            if (resultContainer) resultContainer.classList.add('hidden');
            
            loadQuestion();
        }

        function loadQuestion() {
            selectedAnswer = null;
            const currentQuestion = quizData[currentQuestionIndex];
            const quizBody = quizContainer.querySelector('#quiz-body');
            quizBody.innerHTML = `
                <h2 class="text-xl font-semibold text-slate-800 mb-6">${currentQuestion.question}</h2>
                <div id="options-container" class="space-y-3">
                    ${currentQuestion.options.map(option => `
                        <button class="option-btn w-full text-left p-4 border-2 border-slate-200 rounded-lg text-slate-700 font-medium">
                            ${option}
                        </button>
                    `).join('')}
                </div>
            `;
            updateProgress();
            
            const nextBtn = quizContainer.querySelector('#next-btn');
            if(nextBtn) nextBtn.disabled = true;

            const optionButtons = quizBody.querySelectorAll('.option-btn');
            optionButtons.forEach(button => {
                button.addEventListener('click', () => {
                    optionButtons.forEach(btn => btn.classList.remove('selected'));
                    button.classList.add('selected');
                    selectedAnswer = button.textContent.trim();
                    if(nextBtn) nextBtn.disabled = false;
                });
            });
        }
        
        function updateProgress() {
            const questionCounter = quizContainer.querySelector('#question-counter');
            const progressBar = quizContainer.querySelector('#progress-bar');
            if(questionCounter) questionCounter.textContent = `Pertanyaan ${currentQuestionIndex + 1} dari ${quizData.length}`;
            if(progressBar) {
                const progressPercentage = ((currentQuestionIndex) / quizData.length) * 100;
                progressBar.style.width = `${progressPercentage}%`;
            }
        }

        function showResults() {
            const progressBar = quizContainer.querySelector('#progress-bar');
            if (progressBar) progressBar.style.width = '100%';

            quizContainer.querySelector('#quiz-header').classList.add('hidden');
            quizContainer.querySelector('#quiz-body').classList.add('hidden');
            quizContainer.querySelector('#quiz-footer').classList.add('hidden');
            
            const resultContainer = quizContainer.querySelector('#result-container');
            resultContainer.classList.remove('hidden');

            const scoreText = resultContainer.querySelector('#score-text');
            scoreText.textContent = `${score}/${quizData.length}`;

            const feedbackText = resultContainer.querySelector('#feedback-text');
            let feedback = "Kerja bagus!";
            const percentage = (score / quizData.length) * 100;
            if (percentage < 50) {
                feedback = "Mungkin perlu meninjau kembali materinya.";
            } else if (percentage < 80) {
                feedback = "Pemahaman yang baik!";
            } else {
                feedback = "Pemahaman yang luar biasa!";
            }
            feedbackText.textContent = feedback;
        }

        quizContainer.addEventListener('click', (e) => {
            if (e.target.id === 'next-btn') {
                if (selectedAnswer === null) return;
                const isCorrect = selectedAnswer === quizData[currentQuestionIndex].answer;
                if (isCorrect) { score++; }
                currentQuestionIndex++;
                if (currentQuestionIndex < quizData.length) {
                    loadQuestion();
                } else {
                    showResults();
                }
            } else if (e.target.id === 'restart-btn') {
                loadQuiz();
            }
        });
        
        window.onload = () => {
            createNav();
            if (diagnoses.length > 0) {
                // Set default view to the most likely diagnosis
                const mostLikely = diagnoses.reduce((prev, current) => (prev.matchScore > current.matchScore) ? prev : current);
                renderDetails(mostLikely.id);
            }
            createChart();
            loadQuiz();
        };