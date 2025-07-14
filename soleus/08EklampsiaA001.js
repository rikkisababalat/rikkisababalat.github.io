        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'mgso4-nifedipine', name: 'Nifedipine dan magnesium sulfat', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-emerald-200"><div class="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center text-3xl">💊</div></div>`, description: 'Kombinasi antikonvulsan lini pertama (MgSO4) dan antihipertensi lini pertama (Nifedipine) untuk kehamilan.', analysis: 'SANGAT SESUAI. Ini adalah tatalaksana standar emas untuk eklampsia. Magnesium sulfat ($MgSO_4$) efektif mencegah kejang berulang, sementara Nifedipine aman dan cepat menurunkan tekanan darah berat, mencegah komplikasi maternal seperti stroke.' },
                { id: 'mgso4-valium', name: 'Magnesium sulfat dan valium', matchScore: 5, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">⚠️</div></div>`, description: 'Kombinasi dua jenis obat antikonvulsan.', analysis: 'KURANG SESUAI. $MgSO_4$ sudah merupakan pilihan utama. Menambahkan Valium (diazepam) tidak diperlukan sebagai lini pertama dan meningkatkan risiko depresi pernapasan pada ibu dan janin. Valium hanya menjadi alternatif jika $MgSO_4$ tidak tersedia/efektif.' },
                { id: 'mgso4-captopril', name: 'Captopril dan magnesium sulfat', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">🚫</div></div>`, description: 'Kombinasi antikonvulsan dan antihipertensi golongan ACE-inhibitor.', analysis: 'TIDAK TEPAT & BERBAHAYA. Meskipun $MgSO_4$ benar, Captopril (ACE inhibitor) merupakan kontraindikasi absolut pada kehamilan trimester 2 dan 3 karena dapat menyebabkan kerusakan ginjal dan kematian janin.' },
                { id: 'nifedipine-furosemide', name: 'Nifedipine dan furosemide', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">💧</div></div>`, description: 'Kombinasi antihipertensi dan diuretik.', analysis: 'TIDAK LENGKAP. Kombinasi ini hanya menangani hipertensi tetapi tidak mengatasi masalah utama yaitu kejang. Selain itu, Furosemide tidak rutin diberikan pada eklampsia karena dapat memperburuk deplesi volume intravaskular dan mengurangi perfusi plasenta.' },
                { id: 'mgso4-digoxin', name: 'Magnesium sulfat dan digoxin', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-slate-200"><div class="w-12 h-12 bg-slate-400 rounded-full flex items-center justify-center text-3xl">❓</div></div>`, description: 'Kombinasi antikonvulsan dan obat jantung.', analysis: 'TIDAK RELEVAN. $MgSO_4$ tepat untuk kejang, namun Digoxin digunakan untuk gagal jantung atau aritmia. Tidak ada indikasi penggunaan Digoxin pada kasus ini. Terapi hipertensi beratnya terlewatkan.' }
            ],
            quiz: [
                { question: "Berdasarkan gejala kejang dan hipertensi berat pada kehamilan 29 minggu, diagnosis yang paling tepat adalah?", options: ["Hipertensi Gestasional", "Preeklampsia Berat", "Eklampsia", "Stroke"], answer: "Eklampsia" },
                { question: "Apa tujuan utama pemberian Magnesium Sulfat (MgSO<sub>4</sub>) pada pasien ini?", options: ["Menurunkan tekanan darah", "Mencegah kejang berulang", "Memperbaiki fungsi ginjal", "Mematangkan paru janin"], answer: "Mencegah kejang berulang" },
                { question: "Mengapa Captopril merupakan pilihan yang sangat buruk untuk pasien ini?", options: ["Karena tidak efektif menurunkan tekanan darah", "Karena menyebabkan sakit kepala", "Karena merupakan kontraindikasi pada kehamilan trimester 2 & 3", "Karena harganya sangat mahal"], answer: "Karena merupakan kontraindikasi pada kehamilan trimester 2 & 3" },
                { question: "Manakah dari keluhan pasien berikut yang merupakan gejala prodromal (peringatan) klasik dari preeklampsia berat?", options: ["Kaki bengkak", "Sering buang air kecil", "Kepala terasa berat dan panas di dada", "Gerakan janin berkurang"], answer: "Kepala terasa berat dan panas di dada" },
                { question: "Manakah kombinasi terapi yang paling tepat untuk mengatasi kejang sekaligus hipertensi berat pada kasus ini?", options: ["Nifedipine dan furosemide", "Magnesium sulfat dan valium", "Nifedipine dan magnesium sulfat", "Captopril dan magnesium sulfat"], answer: "Nifedipine dan magnesium sulfat" }
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
            // Sort diagnoses to show the best option first
            const sortedDiagnoses = [...diagnoses].sort((a, b) => b.matchScore - a.matchScore);
            sortedDiagnoses.forEach(diagnosis => {
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
                    label: 'Tingkat Kesesuaian',
                    data: diagnoses.map(d => d.matchScore),
                    backgroundColor: diagnoses.map(d => d.matchScore >= 8 ? '#059669' : (d.matchScore >= 4 ? '#34d399' : '#f87171')),
                    borderColor: diagnoses.map(d => d.matchScore >= 8 ? '#065f46' : (d.matchScore >= 4 ? '#059669' : '#ef4444')),
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
                        x: { beginAtZero: true, max: 10, title: { display: true, text: 'Skor Kesesuaian (0-10)', font: { size: 14 } } },
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
            const navButtons = document.querySelectorAll('#diagnosis-nav button');
            if (navButtons.length > 0) {
                 navButtons.forEach(btn => btn.classList.add('nav-button-inactive'));
            }
            
            createChart();
            loadQuiz();
        };