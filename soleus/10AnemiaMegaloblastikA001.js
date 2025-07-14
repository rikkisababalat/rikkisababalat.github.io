        const caseData = {
            diagnoses: [
                { id: 'b12-folat', name: 'Suplemen Vit. B12 & Asam Folat', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-emerald-200"><div class="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center text-3xl">💊</div></div>`, description: 'Pemberian vitamin B12 (kobalamin) dan asam folat untuk memperbaiki sintesis DNA dan pematangan sel darah.', analysis: 'SANGAT SESUAI. Tatalaksana ini secara langsung menargetkan akar penyebab anemia megaloblastik yang ditunjukkan oleh temuan lab (MCV tinggi) dan apusan darah tepi (hipersegmentasi neutrofil).' },
                { id: 'prc', name: 'Transfusi PRC', matchScore: 5, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">🩸</div></div>`, description: 'Transfusi Packed Red Cells untuk meningkatkan kadar hemoglobin secara cepat.', analysis: 'MUNGKIN DIPERLUKAN, TAPI BUKAN UTAMA. Transfusi hanya bersifat suportif dan diindikasikan untuk pasien dengan gejala berat atau instabilitas hemodinamik. Ini tidak mengatasi penyebab utama masalahnya.' },
                { id: 'besi', name: 'Pemberian Tablet Besi', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">🚫</div></div>`, description: 'Suplementasi zat besi untuk mengobati anemia.', analysis: 'TIDAK SESUAI. Terapi besi digunakan untuk anemia defisiensi besi yang bersifat mikrositik (MCV rendah). Memberikannya pada kasus ini tidak akan efektif dan salah sasaran.' },
                { id: 'prednison', name: 'Pemberian Prednison', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">🚫</div></div>`, description: 'Kortikosteroid untuk menekan sistem imun.', analysis: 'TIDAK SESUAI. Prednison digunakan untuk kondisi autoimun, seperti anemia hemolitik autoimun. Tidak ada bukti adanya proses autoimun pada kasus ini.' },
                { id: 'epo', name: 'Pemberian Eritropoietin', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">🚫</div></div>`, description: 'Hormon yang merangsang produksi sel darah merah oleh sumsum tulang.', analysis: 'TIDAK SESUAI. Eritropoietin digunakan pada anemia karena penyakit ginjal kronis atau kelainan sumsum tulang primer. Pada kasus ini, masalahnya adalah pematangan sel, bukan produksi.' }
            ],
            quiz: [
                { question: "Berdasarkan nilai MCV 110 fL, jenis anemia yang dialami pasien adalah...", options: ["Anemia Mikrositik", "Anemia Normositik", "Anemia Makrositik", "Anemia Hemolitik"], answer: "Anemia Makrositik" },
                { question: "Temuan manakah pada apusan darah tepi yang paling khas untuk anemia megaloblastik?", options: ["Sel target", "Sel sabit", "Sferosit", "Hipersegmentasi neutrofil"], answer: "Hipersegmentasi neutrofil" },
                { question: "Apa penyebab paling umum dari anemia megaloblastik?", options: ["Defisiensi zat besi", "Penyakit ginjal kronis", "Defisiensi Vitamin B12 dan/atau Asam Folat", "Perdarahan akut"], answer: "Defisiensi Vitamin B12 dan/atau Asam Folat" },
                { question: "Mengapa pemberian tablet besi tidak tepat untuk pasien ini?", options: ["Karena Hb terlalu rendah", "Karena ini adalah anemia makrositik, bukan mikrositik", "Karena pasien mual", "Karena usia pasien masih muda"], answer: "Karena ini adalah anemia makrositik, bukan mikrositik" },
                { question: "Tatalaksana definitif (mengatasi penyebab) yang paling tepat untuk kasus ini adalah...", options: ["Transfusi PRC", "Pemberian Prednison", "Pemberian Eritropoietin", "Pemberian suplemen Vitamin B12 dan Asam Folat"], answer: "Pemberian suplemen Vitamin B12 dan Asam Folat" }
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
            // Urutkan data dari skor terendah ke tertinggi untuk visualisasi yang lebih baik
            const sortedDiagnoses = [...diagnoses].sort((a, b) => a.matchScore - b.matchScore);
            const data = {
                labels: sortedDiagnoses.map(d => d.name),
                datasets: [{
                    label: 'Tingkat Kecocokan',
                    data: sortedDiagnoses.map(d => d.matchScore),
                    backgroundColor: sortedDiagnoses.map(d => d.matchScore >= 8 ? '#059669' : (d.matchScore >= 4 ? '#f97316' : '#ef4444')),
                    borderColor: sortedDiagnoses.map(d => d.matchScore >= 8 ? '#065f46' : (d.matchScore >= 4 ? '#c2410c' : '#b91c1c')),
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