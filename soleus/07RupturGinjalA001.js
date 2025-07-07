        // Data kasus untuk halaman ini (dengan 5 opsi diagnosis)
        const caseData = {
            diagnoses: [
                { id: 'grade-1', name: 'Ruptur Ginjal Derajat 1', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 text-3xl flex items-center justify-center">🤕</div></div>`, description: 'Kontusio (memar) ginjal atau hematoma subkapsular tanpa adanya robekan (laserasi).', analysis: 'KURANG SESUAI. Diagnosis ini dikesampingkan karena pada pemeriksaan radiologis ditemukan adanya "laserasi" atau robekan, yang merupakan kriteria untuk cedera derajat yang lebih tinggi.' },
                { id: 'grade-2', name: 'Ruptur Ginjal Derajat 2', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-emerald-200"><div class="w-12 h-12 text-3xl flex items-center justify-center">🩹</div></div>`, description: 'Laserasi pada korteks ginjal dengan kedalaman kurang dari 1 cm.', analysis: 'SANGAT SESUAI. Temuan radiologis "laserasi korteks ginjal sebesar 0,5 cm" secara spesifik cocok dengan definisi ruptur ginjal derajat 2 menurut klasifikasi AAST.' },
                { id: 'grade-3', name: 'Ruptur Ginjal Derajat 3', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-orange-200"><div class="w-12 h-12 text-3xl flex items-center justify-center">🩸</div></div>`, description: 'Laserasi pada korteks ginjal dengan kedalaman lebih dari 1 cm.', analysis: 'TIDAK SESUAI. Kedalaman laserasi pada pasien (0,5 cm) tidak memenuhi kriteria untuk cedera derajat 3, yang mensyaratkan kedalaman > 1 cm.' },
                { id: 'grade-4', name: 'Ruptur Ginjal Derajat 4', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 text-3xl flex items-center justify-center">‼️</div></div>`, description: 'Laserasi yang meluas ke sistem kolektivus (pengumpul urin) atau cedera pembuluh darah utama.', analysis: 'TIDAK SESUAI. Tidak ada laporan keterlibatan sistem kolektivus atau cedera vaskular mayor dalam kasus ini. Ini adalah cedera yang jauh lebih parah.' },
                { id: 'grade-5', name: 'Ruptur Ginjal Derajat 5', matchScore: 0, vizIconHtml: `<div class="viz-icon bg-slate-800"><div class="w-12 h-12 text-3xl flex items-center justify-center text-white">💥</div></div>`, description: 'Ginjal hancur (shattered kidney) atau avulsi hilum ginjal (terlepas dari suplai darah utama).', analysis: 'SANGAT TIDAK SESUAI. Ini adalah cedera ginjal paling parah. Kasus ini hanya menunjukkan laserasi kecil dan tidak ada tanda-tanda kerusakan masif seperti ginjal yang hancur atau terlepas dari pembuluh darahnya.' }
            ],
            quiz: [
                { question: "Apa temuan kunci pada pemeriksaan radiologis pasien?", options: ["Kontusio ginjal", "Laserasi korteks 0,5 cm", "Laserasi korteks 1,5 cm", "Ginjal hancur"], answer: "Laserasi korteks 0,5 cm" },
                { question: "Menurut klasifikasi AAST, cedera ginjal dengan laserasi korteks < 1 cm digolongkan sebagai...", options: ["Derajat 1", "Derajat 2", "Derajat 3", "Derajat 4"], answer: "Derajat 2" },
                { question: "Tanda pemeriksaan fisik manakah yang paling spesifik untuk cedera ginjal pada kasus ini?", options: ["Jejas pada pinggang", "Nyeri ketok CVA", "Penurunan kesadaran", "Patah tulang rusuk"], answer: "Nyeri ketok CVA" },
                { question: "Mengapa diagnosis 'Ruptur Ginjal Derajat 3' tidak tepat untuk kasus ini?", options: ["Karena laserasi > 1 cm", "Karena laserasi < 1 cm", "Karena tidak ada jejas", "Karena pasien perempuan"], answer: "Karena laserasi < 1 cm" },
                { question: "Berdasarkan semua temuan, diagnosis apakah yang paling akurat?", options: ["Kontusio Ginjal", "Ruptur Ginjal Derajat 2", "Ruptur Ginjal Derajat 3", "Cedera Vaskular Ginjal"], answer: "Ruptur Ginjal Derajat 2" }
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
                        if (d.id === 'grade-2') return '#059669'; // Highlight correct diagnosis
                        if (d.matchScore > 2) return '#34d399';
                        if (d.matchScore > 0) return '#a7f3d0';
                        return '#cbd5e1'; // Color for score 0
                    }),
                    borderColor: diagnoses.map(d => {
                         if (d.id === 'grade-2') return '#065f46';
                        if (d.matchScore > 2) return '#059669';
                        if (d.matchScore > 0) return '#6ee7b7';
                        return '#94a3b8';
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
            // Default to showing the correct diagnosis first
            const correctDiagnosis = diagnoses.find(d => d.matchScore === 10) || diagnoses[0];
            if (correctDiagnosis) {
                renderDetails(correctDiagnosis.id);
            }
            createChart();
            loadQuiz();
        };
