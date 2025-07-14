        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'dutasteride', name: 'Dutasteride (5-ARI)', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-green-200"><div class="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-3xl">🎯</div></div>`, description: 'Golongan 5-alpha reductase inhibitor (5-ARI).', analysis: 'SANGAT SESUAI. Obat ini secara langsung menargetkan mekanisme hormonal yang menyebabkan pembesaran prostat (komponen statik). Dutasteride menghambat enzim 5-alpha reductase, mencegah konversi testosteron menjadi Dihydrotestosterone (DHT). Penurunan DHT menyebabkan penyusutan volume prostat seiring waktu.' },
                { id: 'tamsulosin', name: 'Tamsulosin (Alpha-Blocker)', matchScore: 5, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">🌊</div></div>`, description: 'Golongan alpha-adrenergic blocker.', analysis: 'TIDAK SESUAI DENGAN TUJUAN. Tamsulosin bekerja merelaksasi otot polos di leher kandung kemih dan prostat untuk memperbaiki aliran urin (komponen dinamik). Obat ini sangat berguna untuk meredakan gejala dengan cepat, tetapi TIDAK mengurangi volume prostat.' },
                { id: 'prazosin', name: 'Prazosin (Alpha-Blocker)', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">💧</div></div>`, description: 'Golongan alpha-adrenergic blocker (non-selektif).', analysis: 'TIDAK SESUAI DENGAN TUJUAN. Sama seperti Tamsulosin, Prazosin bekerja pada komponen dinamik untuk meredakan gejala, bukan mengurangi volume prostat. Obat ini lebih jarang digunakan karena efek samping hipotensi yang lebih besar.' },
                { id: 'ibuprofen', name: 'Ibuprofen (NSAID)', matchScore: 0, vizIconHtml: `<div class="viz-icon bg-slate-200"><div class="w-12 h-12 bg-slate-400 rounded-full flex items-center justify-center text-3xl">❌</div></div>`, description: 'Obat Anti-Inflamasi Non-Steroid.', analysis: 'TIDAK RELEVAN. Ibuprofen adalah pereda nyeri dan anti-peradangan yang tidak memiliki peran dalam tatalaksana BPH atau pengurangan volume prostat.' },
                { id: 'prednison', name: 'Prednison (Kortikosteroid)', matchScore: 0, vizIconHtml: `<div class="viz-icon bg-slate-200"><div class="w-12 h-12 bg-slate-400 rounded-full flex items-center justify-center text-3xl">❌</div></div>`, description: 'Obat Kortikosteroid.', analysis: 'TIDAK RELEVAN. Prednison adalah obat anti-peradangan kuat dan imunosupresan yang tidak digunakan untuk terapi BPH.' }
            ],
            quiz: [
                { question: "Keluhan utama pasien seperti sulit memulai BAK, pancaran lemah, dan rasa tidak lampias secara kolektif dikenal sebagai...", options: ["Inkontinensia Urin", "Infeksi Saluran Kemih (ISK)", "Lower Urinary Tract Symptoms (LUTS)", "Gagal Ginjal Akut"], answer: "Lower Urinary Tract Symptoms (LUTS)" },
                { question: "Pada colok dubur, temuan 'pole atas tidak teraba' mengindikasikan...", options: ["Adanya nodul kanker", "Prostatitis akut", "Ukuran prostat yang normal", "Pembesaran prostat yang signifikan"], answer: "Pembesaran prostat yang signifikan" },
                { question: "Manakah mekanisme kerja utama dari Tamsulosin dalam menangani gejala BPH?", options: ["Mengurangi ukuran prostat", "Merelaksasi otot polos di leher kandung kemih", "Membunuh bakteri di saluran kemih", "Menghambat produksi hormon testosteron"], answer: "Merelaksasi otot polos di leher kandung kemih" },
                { question: "Hormon yang dihambat produksinya oleh Dutasteride untuk mengecilkan prostat adalah...", options: ["Testosteron", "Estrogen", "Prolaktin", "Dihydrotestosterone (DHT)"], answer: "Dihydrotestosterone (DHT)" },
                { question: "Berdasarkan pertanyaan utama pada kasus untuk mengurangi volume prostat, manakah terapi yang paling tepat?", options: ["Tamsulosin", "Ibuprofen", "Prednison", "Dutasteride"], answer: "Dutasteride" }
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
                        <h4 class="font-semibold text-slate-700">Analisis Kecocokan dengan Tujuan Terapi:</h4>
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
                        x: { beginAtZero: true, max: 10, title: { display: true, text: 'Skor Kecocokan Tujuan (0-10)', font: { size: 14 } } },
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