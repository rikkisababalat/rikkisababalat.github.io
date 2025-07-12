        // --- DATA KONFIGURASI KASUS ---
        const caseData = {
            diagnoses: [{
                id: 'atheroma',
                name: 'Plak Atheroma',
                matchScore: 9.5,
                vizIconHtml: `<div class="viz-icon bg-orange-200 text-3xl"><img src="https://www.svgrepo.com/show/274493/artery-stenosis.svg" alt="Penyempitan Arteri"></div>`,
                description: 'Penumpukan plak lemak dan kolesterol di dinding arteri yang menyebabkan penyempitan (stenosis).',
                analysis: 'SANGAT SESUAI. Proses ini secara langsung menjelaskan penyebab Penyakit Arteri Perifer (PAD). Faktor risiko pasien (DM, kolesterol) adalah pemicu utama pembentukan atheroma. Gejala klaudikasio dan temuan PF (pucat, nadi lemah) adalah manifestasi klinis klasik dari aliran darah yang terganggu oleh plak.'
            }, {
                id: 'myositis',
                name: 'Peradangan Otot',
                matchScore: 3,
                vizIconHtml: `<div class="viz-icon bg-red-100 text-3xl">🦵</div>`,
                description: 'Peradangan pada jaringan otot, dalam kasus ini otot betis (gastrocnemius).',
                analysis: 'KURANG SESUAI. Meskipun menyebabkan nyeri, peradangan otot tidak menjelaskan pola nyeri yang spesifik (reda dengan istirahat) dan sama sekali tidak dapat menjelaskan tanda-tanda vaskular seperti tungkai pucat dan pulsasi nadi yang lemah.'
            }, {
                id: 'dissection',
                name: 'Robekan Tunika Intima',
                matchScore: 2,
                vizIconHtml: `<div class="viz-icon bg-red-200 text-3xl">💥</div>`,
                description: 'Robekan pada lapisan dalam dinding arteri (disseksi arteri) yang menyebabkan aliran darah palsu.',
                analysis: 'TIDAK SESUAI. Disseksi arteri adalah kondisi akut yang menyebabkan nyeri hebat, mendadak, dan persisten. Ini sangat berbeda dengan riwayat keluhan pasien yang bersifat kronis (1 bulan), progresif, dan terkait aktivitas.'
            }, {
                id: 'arteritis',
                name: 'Peradangan Arteri',
                matchScore: 4,
                vizIconHtml: `<div class="viz-icon bg-purple-100 text-3xl">🧬</div>`,
                description: 'Peradangan pada dinding pembuluh darah arteri (vaskulitis).',
                analysis: 'MUNGKIN, TAPI KURANG MUNGKIN. Vaskulitis bisa menyebabkan penyempitan arteri, tetapi jauh lebih jarang dibandingkan aterosklerosis. Selain itu, tidak adanya gejala sistemik lain (seperti demam, ruam, penurunan BB) membuat diagnosis ini kurang mungkin dibandingkan PAD akibat faktor risiko yang jelas.'
            }, {
                id: 'fat-embolism',
                name: 'Emboli Lemak',
                matchScore: 1,
                vizIconHtml: `<div class="viz-icon bg-yellow-100 text-3xl">🦴</div>`,
                description: 'Penyumbatan pembuluh darah oleh gumpalan lemak, biasanya dari sumsum tulang.',
                analysis: 'SANGAT TIDAK SESUAI. Emboli lemak adalah sindrom akut yang terjadi setelah trauma berat (misal, patah tulang paha). Gejalanya muncul mendadak dalam 1-3 hari pasca trauma, meliputi sesak napas, ruam petekie, dan perubahan kesadaran, yang tidak ada pada pasien ini.'
            }],
            quiz: [{
                question: "Istilah klinis untuk nyeri tungkai yang timbul saat beraktivitas dan mereda saat istirahat adalah...",
                options: ["Nyeri Neuropatik", "Klaudikasio Intermiten", "Artralgia", "Mialgia Akut"],
                answer: "Klaudikasio Intermiten"
            }, {
                question: "Temuan fisik manakah yang paling kuat mendukung diagnosis gangguan aliran darah arteri?",
                options: ["Betis bengkak", "Kulit kemerahan", "Tungkai pucat dan nadi lemah", "Nyeri tekan pada otot"],
                answer: "Tungkai pucat dan nadi lemah"
            }, {
                question: "Faktor risiko utama yang dimiliki pasien untuk mengembangkan plak atheroma adalah...",
                options: ["Usia muda", "Aktivitas jogging", "Jenis kelamin laki-laki", "DM dan kolesterol tidak terkontrol"],
                answer: "DM dan kolesterol tidak terkontrol"
            }, {
                question: "Mengapa 'Robekan Tunika Intima' (disseksi arteri) bukan diagnosis yang tepat untuk kasus ini?",
                options: ["Karena gejalanya kronis dan terkait aktivitas, bukan akut dan mendadak", "Karena tidak pernah terjadi di tungkai", "Karena hanya terjadi pada usia tua", "Karena tidak menyebabkan nyeri"],
                answer: "Karena gejalanya kronis dan terkait aktivitas, bukan akut dan mendadak"
            }, {
                question: "Berdasarkan keseluruhan kasus, proses patofisiologi yang paling mendasari keluhan pasien adalah...",
                options: ["Infeksi bakteri pada otot", "Gangguan saraf sensorik", "Reaksi autoimun pada arteri", "Penyempitan arteri akibat aterosklerosis"],
                answer: "Penyempitan arteri akibat aterosklerosis"
            }]
        };

        document.addEventListener('DOMContentLoaded', () => {
            // --- VARIABEL GLOBAL ---
            const { diagnoses, quiz: quizData } = caseData;
            const navContainer = document.getElementById('diagnosis-nav');
            const detailsContainer = document.getElementById('diagnosis-details');
            const quizContainer = document.getElementById('quiz-container');
            let chart = null;
            let currentQuestionIndex = 0;
            let score = 0;
            let selectedAnswer = null;

            // --- FUNGSI-FUNGSI UTAMA ---

            // Render detail diagnosis yang dipilih
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
                    </div>`;

                document.querySelectorAll('#diagnosis-nav button').forEach(btn => {
                    btn.classList.toggle('nav-button-active', btn.dataset.id === diagnosisId);
                    btn.classList.toggle('nav-button-inactive', btn.dataset.id !== diagnosisId);
                });
            }

            // Buat tombol navigasi diagnosis
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

            // Buat atau update chart perbandingan
            function createChart() {
                const ctx = document.getElementById('matchChart').getContext('2d');
                const data = {
                    labels: diagnoses.map(d => d.name),
                    datasets: [{
                        label: 'Tingkat Kecocokan',
                        data: diagnoses.map(d => d.matchScore),
                        backgroundColor: diagnoses.map(d => d.matchScore >= 8 ? '#059669' : (d.matchScore >= 4 ? '#34d399' : '#fca5a5')),
                        borderColor: diagnoses.map(d => d.matchScore >= 8 ? '#065f46' : (d.matchScore >= 4 ? '#059669' : '#ef4444')),
                        borderWidth: 1,
                        borderRadius: 4
                    }]
                };

                if (chart) { chart.destroy(); }
                chart = new Chart(ctx, {
                    type: 'bar',
                    data: data,
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        indexAxis: 'y',
                        scales: {
                            x: { beginAtZero: true, max: 10, title: { display: true, text: 'Skor Kecocokan (0-10)', font: { size: 14 }}},
                            y: { ticks: { font: { size: 12 }}}
                        },
                        plugins: {
                            legend: { display: false },
                            tooltip: { callbacks: { label: (context) => ` Skor: ${context.parsed.x}` }}
                        }
                    }
                });
            }

            // --- Logika Kuis ---
            function loadQuiz() {
                currentQuestionIndex = 0;
                score = 0;
                selectedAnswer = null;

                quizContainer.querySelector('#quiz-header').classList.remove('hidden');
                quizContainer.querySelector('#quiz-body').classList.remove('hidden');
                quizContainer.querySelector('#quiz-footer').classList.remove('hidden');
                quizContainer.querySelector('#result-container').classList.add('hidden');

                loadQuestion();
            }

            function loadQuestion() {
                selectedAnswer = null;
                const currentQuestion = quizData[currentQuestionIndex];
                const quizBody = quizContainer.querySelector('#quiz-body');
                const nextBtn = quizContainer.querySelector('#next-btn');
                
                quizBody.innerHTML = `
                    <h2 class="text-xl font-semibold text-slate-800 mb-6">${currentQuestion.question}</h2>
                    <div id="options-container" class="space-y-3">
                        ${currentQuestion.options.map(option => `
                            <button class="option-btn w-full text-left p-4 border-2 border-slate-200 rounded-lg text-slate-700 font-medium">
                                ${option}
                            </button>
                        `).join('')}
                    </div>`;
                
                updateProgress();
                if (nextBtn) nextBtn.disabled = true;

                quizBody.querySelectorAll('.option-btn').forEach(button => {
                    button.addEventListener('click', () => {
                        quizBody.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
                        button.classList.add('selected');
                        selectedAnswer = button.textContent.trim();
                        if (nextBtn) nextBtn.disabled = false;
                    });
                });
            }

            function updateProgress() {
                const questionCounter = quizContainer.querySelector('#question-counter');
                const progressBar = quizContainer.querySelector('#progress-bar');
                if (questionCounter) questionCounter.textContent = `Pertanyaan ${currentQuestionIndex + 1} dari ${quizData.length}`;
                if (progressBar) {
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
                quizContainer.querySelector('#result-container').classList.remove('hidden');

                const scoreText = quizContainer.querySelector('#score-text');
                const feedbackText = quizContainer.querySelector('#feedback-text');
                
                scoreText.textContent = `${score}/${quizData.length}`;

                const percentage = (score / quizData.length) * 100;
                let feedback = "Pemahaman yang luar biasa!";
                if (percentage < 50) {
                    feedback = "Mungkin perlu meninjau kembali materinya.";
                } else if (percentage < 80) {
                    feedback = "Pemahaman yang baik!";
                }
                feedbackText.textContent = feedback;
            }

            // Event listener untuk tombol di dalam kontainer kuis
            quizContainer.addEventListener('click', (e) => {
                if (e.target.id === 'next-btn') {
                    if (selectedAnswer === null) return;
                    if (selectedAnswer === quizData[currentQuestionIndex].answer) {
                        score++;
                    }
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

            // --- INISIALISASI HALAMAN ---
            function init() {
                createNav();
                if (diagnoses.length > 0) {
                    const bestMatch = diagnoses.reduce((prev, current) => (prev.matchScore > current.matchScore) ? prev : current);
                    renderDetails(bestMatch.id);
                }
                createChart();
                loadQuiz();
            }

            init();
        });
