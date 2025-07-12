        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'motion-sickness', name: 'Motion Sickness', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-blue-200"><div class="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-3xl">🤢</div></div>`, description: 'Kondisi yang disebabkan oleh konflik antara sinyal sensorik dari mata dan telinga bagian dalam (sistem vestibular).', analysis: 'SANGAT SESUAI. Gejala mual dan muntah muncul spesifik saat pasien berada dalam kendaraan yang bergerak. Tidak ada gejala lain dan pemeriksaan fisik normal, ini adalah presentasi klasik dari mabuk perjalanan.' },
                { id: 'primary-headache', name: 'Primary Headache', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-purple-100"><div class="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center text-3xl">🤕</div></div>`, description: 'Nyeri kepala yang bukan disebabkan oleh kondisi medis lain, contohnya migrain atau tension headache.', analysis: 'TIDAK SESUAI. Meskipun beberapa jenis sakit kepala (seperti migrain) dapat disertai mual, keluhan utama pasien bukanlah nyeri kepala. Pemicunya juga sangat spesifik yaitu gerakan.' },
                { id: 'cluster-headache', name: 'Cluster Headache', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">😖</div></div>`, description: 'Serangan nyeri kepala yang sangat hebat, biasanya terpusat di sekitar satu mata.', analysis: 'SANGAT TIDAK SESUAI. Pasien tidak melaporkan nyeri kepala sama sekali, apalagi nyeri hebat di sekitar mata yang menjadi ciri khas diagnosis ini.' },
                { id: 'bppv', name: 'BPPV', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">💫</div></div>`, description: 'Gangguan keseimbangan yang menyebabkan vertigo singkat akibat perubahan posisi kepala.', analysis: 'KURANG SESUAI. Gejala utama BPPV adalah vertigo (sensasi berputar), yang tidak dilaporkan oleh pasien. Pemicunya adalah perubahan posisi kepala, bukan perjalanan yang monoton.' },
                { id: 'meniere-disease', name: 'Meniere’s Disease', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-teal-100"><div class="w-12 h-12 bg-teal-300 rounded-full flex items-center justify-center text-3xl">👂</div></div>`, description: 'Gangguan telinga dalam yang menyebabkan vertigo, tinnitus, dan gangguan pendengaran.', analysis: 'TIDAK SESUAI. Pasien tidak menunjukkan trias gejala klasik Meniere (vertigo, tinnitus, gangguan dengar). Gejalanya hanya mual dan muntah.' }
            ],
            quiz: [
                { question: "Apa faktor pemicu utama yang menyebabkan keluhan pada pasien?", options: ["Makanan pedas", "Kurang tidur", "Perjalanan dengan mobil", "Stres emosional"], answer: "Perjalanan dengan mobil" },
                { question: "Manakah dari gejala berikut yang TIDAK dilaporkan oleh pasien dalam kasus ini?", options: ["Mual", "Muntah", "Pusing berputar (Vertigo)", "Merasa tidak nyaman"], answer: "Pusing berputar (Vertigo)" },
                { question: "Berdasarkan analisis, temuan pada pemeriksaan fisik pasien adalah...", options: ["Tekanan darah tinggi", "Demam", "Dalam batas normal", "Telinga tampak merah"], answer: "Dalam batas normal" },
                { question: "Mengapa diagnosis Penyakit Meniere kurang tepat untuk kasus ini?", options: ["Karena usia pasien terlalu muda", "Karena tidak ada riwayat pusing berputar, telinga berdenging, atau gangguan dengar", "Karena gejalanya hanya berlangsung 1 jam", "Karena pasien berjenis kelamin perempuan"], answer: "Karena tidak ada riwayat pusing berputar, telinga berdenging, atau gangguan dengar" },
                { question: "Diagnosis apakah yang paling akurat untuk pasien ini?", options: ["Gastritis Akut", "Migrain", "Vertigo", "Motion Sickness"], answer: "Motion Sickness" }
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
                        if (d.matchScore >= 8) return '#059669'; // Emerald 700
                        if (d.matchScore >= 4) return '#34d399'; // Emerald 400
                        return '#fca5a5'; // Red 300
                    }),
                    borderColor: diagnoses.map(d => {
                        if (d.matchScore >= 8) return '#065f46'; // Emerald 900
                        if (d.matchScore >= 4) return '#059669'; // Emerald 700
                        return '#ef4444'; // Red 500
                    }),
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
                renderDetails(diagnoses[0].id);
            }
            createChart();
            loadQuiz();
        };