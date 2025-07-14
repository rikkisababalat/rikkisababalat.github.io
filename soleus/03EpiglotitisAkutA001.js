        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'epiglotitis-akut', name: 'Epiglotitis Akut', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-3xl">🚨</div></div>`, description: 'Peradangan akut pada epiglotis & struktur supraglotis, mengancam jiwa.', analysis: 'SANGAT SESUAI. Presentasi klasik dengan onset akut, demam tinggi, kesulitan bernapas, dan temuan patognomonik "thumbprint sign" pada rontgen leher lateral.' },
                { id: 'abses-retrofaring', name: 'Abses Retrofaringeal', matchScore: 7, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center text-3xl">🤢</div></div>`, description: 'Kumpulan nanah di ruang belakang faring, menekan jalan napas.', analysis: 'CUKUP SESUAI. Dapat menyebabkan demam dan kesulitan bernapas/menelan. Namun, rontgen akan menunjukkan pelebaran jaringan lunak prevertebral, bukan pembengkakan epiglotis yang khas.' },
                { id: 'krup', name: 'Krup (Laringotrakeitis)', matchScore: 5, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-3xl">🗣️</div></div>`, description: 'Infeksi virus pada laring dan trakea, khas dengan batuk menggonggong.', analysis: 'KURANG SESUAI. Meskipun sama-sama menyebabkan sesak, krup khas dengan batuk menggonggong dan stridor. Rontgen pada krup menunjukkan "steeple sign", bukan "thumbprint sign" seperti pada kasus ini.' },
                { id: 'benda-asing', name: 'Aspirasi Benda Asing', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-3xl">🚫</div></div>`, description: 'Penyumbatan jalan napas akibat objek yang terhirup.', analysis: 'TIDAK SESUAI. Onset aspirasi benda asing sangat mendadak (riwayat tersedak) dan tidak disertai demam tinggi sejak awal. Gejala infeksi pada pasien menyingkirkan diagnosis ini.' }
            ],
            quiz: [
                { question: "Apa temuan radiologis khas yang menjadi kunci diagnosis pada kasus ini?", options: ["Steeple sign", "Water bottle sign", "Thumbprint sign", "Revolver sign"], answer: "Thumbprint sign" },
                { question: "Kondisi ini merupakan kegawatdaruratan medis karena risiko utama dari...", options: ["Sepsis berat", "Gagal jantung", "Obstruksi jalan napas total", "Dehidrasi parah"], answer: "Obstruksi jalan napas total" },
                { question: "Manakah dari agen penyebab berikut yang secara historis paling sering dikaitkan dengan epiglotitis akut pada anak sebelum adanya vaksinasi?", options: ["Streptococcus pneumoniae", "Virus parainfluenza", "Staphylococcus aureus", "Haemophilus influenzae tipe b (Hib)"], answer: "Haemophilus influenzae tipe b (Hib)" },
                { question: "Mengapa Krup (Laringotrakeitis) menjadi diagnosis banding yang kurang tepat?", options: ["Karena Krup tidak menyebabkan demam", "Karena gambaran rontgennya adalah 'steeple sign'", "Karena Krup hanya terjadi pada bayi", "Karena Krup tidak menular"], answer: "Karena gambaran rontgennya adalah 'steeple sign'" },
                { question: "Berdasarkan tanda vital, pasien mengalami takipnea (napas cepat). Berapakah frekuensi napas (RR) yang tercatat?", options: ["106x/menit", "38,7°C", "30x/menit", "6x/menit"], answer: "30x/menit" }
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
                    backgroundColor: diagnoses.map(d => {
                        if (d.matchScore >= 9) return '#059669'; // a dark emerald for high match
                        if (d.matchScore >= 6) return '#f97316'; // orange for medium match
                        if (d.matchScore >= 4) return '#3b82f6'; // blue for low-medium
                        return '#f59e0b'; // yellow for low match
                    }),
                    borderColor: '#ffffff',
                    borderWidth: 2,
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
            const navButtons = document.querySelectorAll('#diagnosis-nav button');
            if (navButtons.length > 0) {
                 navButtons.forEach(btn => btn.classList.add('nav-button-inactive'));
            }
            
            createChart();
            loadQuiz();
        };