        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'katarak', name: 'Katarak senilis matur', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-gray-200"><div class="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-3xl">👵</div></div>`, description: 'Kekeruhan pada lensa mata yang terjadi akibat proses penuaan.', analysis: 'TIDAK SESUAI. Katarak menyebabkan penurunan penglihatan secara perlahan, progresif, dan tanpa rasa nyeri. Kasus ini menunjukkan gejala akut, nyeri hebat, dan mata merah.' },
                { id: 'hipertensi-okuli', name: 'Hipertensi okuli', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">💨</div></div>`, description: 'Kondisi dimana tekanan intraokular (TIO) tinggi tanpa adanya kerusakan saraf optik.', analysis: 'KURANG SESUAI. Meskipun TIO pasien tinggi, terdapat tanda kerusakan saraf optik (CDR abnormal, bayonete sign) dan penurunan visus berat, sehingga ini lebih dari sekadar hipertensi okuli.' },
                { id: 'glaukoma-sekunder', name: 'Glaukoma sekunder', matchScore: 5, vizIconHtml: `<div class="viz-icon bg-purple-100"><div class="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center text-3xl">💥</div></div>`, description: 'Glaukoma yang disebabkan oleh kondisi medis lain, trauma, atau obat-obatan.', analysis: 'MUNGKIN, TAPI KURANG SPESIFIK. Pasien menyangkal riwayat trauma atau penyakit lain. Gambaran klinis dengan bilik mata depan dangkal lebih mengarah ke mekanisme primer (sudut tertutup).' },
                { id: 'glaukoma-terbuka', name: 'Glaukoma sudut terbuka', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-green-100"><div class="w-12 h-12 bg-green-300 rounded-full flex items-center justify-center text-3xl">⏳</div></div>`, description: 'Jenis glaukoma paling umum, bersifat kronis, progresif lambat, dan sering tanpa gejala awal.', analysis: 'TIDAK SESUAI. Gejala pada kasus ini bersifat akut, sangat nyeri, dan onsetnya mendadak, yang merupakan kebalikan dari karakteristik glaukoma sudut terbuka primer.' },
                { id: 'glaukoma-tertutup', name: 'Glaukoma sudut tertutup', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">🚨</div></div>`, description: 'Kondisi darurat akibat penutupan mendadak sudut drainase bilik mata depan.', analysis: 'SANGAT SESUAI. Semua temuan klinis: nyeri hebat, mata merah, visus turun, halo, edema kornea, bilik mata depan dangkal, dan TIO sangat tinggi adalah gambaran klasik dari serangan glaukoma sudut tertutup akut.' }
            ],
            quiz: [
                { question: "Gejala 'melihat pelangi di sekitar lampu' (halo) pada pasien ini disebabkan oleh?", options: ["Kerusakan saraf optik", "Edema kornea", "Kekeruhan lensa", "Perdarahan retina"], answer: "Edema kornea" },
                { question: "Manakah temuan pemeriksaan fisik yang menjadi dasar anatomis terjadinya kondisi ini?", options: ["Mixed injeksi", "Visus 1/300", "Bilik depan dangkal", "Bayonete sign"], answer: "Bilik depan dangkal" },
                { question: "Penilaian tekanan bola mata dengan palpasi 'N+2' mengindikasikan bahwa TIO...", options: ["Normal", "Sedikit meningkat", "Sangat tinggi", "Lebih rendah dari normal"], answer: "Sangat tinggi" },
                { question: "Mengapa diagnosis 'Glaukoma Sudut Terbuka' paling tidak mungkin pada kasus ini?", options: ["Karena tekanan darah pasien tinggi", "Karena pasien adalah perempuan", "Karena onsetnya akut dan sangat nyeri", "Karena visus mata kanan normal"], answer: "Karena onsetnya akut dan sangat nyeri" },
                { question: "Berdasarkan keseluruhan data, kondisi yang dialami pasien merupakan...", options: ["Infeksi bakteri ringan", "Reaksi alergi", "Proses penuaan normal", "Kedaruratan oftalmologi"], answer: "Kedaruratan oftalmologi" }
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
            // Urutkan diagnosis berdasarkan opsi soal (A, B, C, D, E)
            const orderedDiagnoses = [
                diagnoses.find(d => d.id === 'katarak'),
                diagnoses.find(d => d.id === 'hipertensi-okuli'),
                diagnoses.find(d => d.id === 'glaukoma-sekunder'),
                diagnoses.find(d => d.id === 'glaukoma-terbuka'),
                diagnoses.find(d => d.id === 'glaukoma-tertutup')
            ];

            orderedDiagnoses.forEach(diagnosis => {
                if (!diagnosis) return;
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
             const orderedDiagnoses = [
                diagnoses.find(d => d.id === 'katarak'),
                diagnoses.find(d => d.id === 'hipertensi-okuli'),
                diagnoses.find(d => d.id === 'glaukoma-sekunder'),
                diagnoses.find(d => d.id === 'glaukoma-terbuka'),
                diagnoses.find(d => d.id === 'glaukoma-tertutup')
            ];

            const data = {
                labels: orderedDiagnoses.map(d => d.name),
                datasets: [{
                    label: 'Tingkat Kecocokan',
                    data: orderedDiagnoses.map(d => d.matchScore),
                    backgroundColor: orderedDiagnoses.map(d => d.matchScore >= 8 ? '#d92626' : (d.matchScore >= 4 ? '#f59e0b' : '#6b7280')),
                    borderColor: orderedDiagnoses.map(d => d.matchScore >= 8 ? '#b91c1c' : (d.matchScore >= 4 ? '#d97706' : '#4b5563')),
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
            const navButtons = document.querySelectorAll('#diagnosis-nav button');
            if (navButtons.length > 0) {
                 navButtons.forEach(btn => btn.classList.add('nav-button-inactive'));
            }
            
            createChart();
            loadQuiz();
        };