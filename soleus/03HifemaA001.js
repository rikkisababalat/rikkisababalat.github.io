        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'ruptur-a-siliaris', name: 'Ruptur A. siliaris', matchScore: 9.5, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">🩸</div></div>`, description: 'Robekan pada arteri yang mendarahi badan siliar dan iris.', analysis: 'SANGAT SESUAI. Trauma tumpul menyebabkan peregangan dan robekan pembuluh darah di badan siliar, menyebabkan perdarahan masif ke bilik mata depan (hifema). Ini menjelaskan penurunan visus dan gambaran klinis.' },
                { id: 'ruptur-v-konjungtiva', name: 'Ruptur V. konjungtiva', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">表面</div></div>`, description: 'Robekan pada vena di lapisan konjungtiva (selaput bening mata).', analysis: 'KURANG SESUAI. Ruptur ini menyebabkan perdarahan subkonjungtiva (darah di bagian putih mata), bukan di dalam bilik mata depan. Tidak menjelaskan penurunan visus yang signifikan.' },
                { id: 'ruptur-a-konjungtiva', name: 'Ruptur A. konjungtiva', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">表面</div></div>`, description: 'Robekan pada arteri di lapisan konjungtiva.', analysis: 'KURANG SESUAI. Sama seperti ruptur vena konjungtiva, ini akan menyebabkan perdarahan di permukaan, bukan di dalam mata (hifema).' },
                { id: 'ruptur-a-episklera', name: 'Ruptur A. episklera', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">層</div></div>`, description: 'Robekan pada arteri di lapisan episklera, di bawah konjungtiva.', analysis: 'TIDAK SESUAI. Perdarahan episklera biasanya terlokalisir dan tidak masuk ke bilik mata depan. Tidak menjelaskan hifema.' },
                { id: 'ruptur-a-supraorbital', name: 'Ruptur A. supraorbital', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">外部</div></div>`, description: 'Robekan pada arteri di atas rongga mata (orbita).', analysis: 'SANGAT TIDAK SESUAI. Ini adalah pembuluh darah eksternal. Rupturnya menyebabkan lebam pada kelopak mata atau dahi, tidak ada hubungannya dengan perdarahan di dalam bola mata.' }
            ],
            quiz: [
                { question: "Apa temuan klinis utama yang terlihat pada gambar mata pasien?", options: ["Katarak", "Darah di bilik mata depan (Hifema)", "Infeksi kornea", "Perdarahan subkonjungtiva"], answer: "Darah di bilik mata depan (Hifema)" },
                { question: "Kondisi 'Hifema' secara spesifik merujuk pada adanya darah di...", options: ["Rongga vitreus", "Retina", "Bilik mata depan", "Bawah konjungtiva"], answer: "Bilik mata depan" },
                { question: "Mekanisme cedera yang paling mungkin menyebabkan kondisi ini adalah...", options: ["Infeksi bakteri", "Reaksi alergi", "Robekan pembuluh darah iris atau badan siliar", "Tekanan darah tinggi"], answer: "Robekan pembuluh darah iris atau badan siliar" },
                { question: "Penurunan visus pada mata kanan pasien (OD 6/20) kemungkinan besar disebabkan oleh...", options: ["Kerusakan saraf optik", "Darah yang menghalangi aksis visual", "Bengkak pada kelopak mata", "Mata yang berair"], answer: "Darah yang menghalangi aksis visual" },
                { question: "Berdasarkan patogenesisnya, sumber perdarahan yang paling mungkin pada kasus ini adalah?", options: ["Arteri konjungtiva", "Vena retina sentral", "Arteri siliaris", "Arteri supraorbital"], answer: "Arteri siliaris" }
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
            // Re-order based on prompt's A-E list
            const orderedDiagnoses = [
                diagnoses.find(d => d.id === 'ruptur-a-supraorbital'),
                diagnoses.find(d => d.id === 'ruptur-a-episklera'),
                diagnoses.find(d => d.id === 'ruptur-a-konjungtiva'),
                diagnoses.find(d => d.id === 'ruptur-a-siliaris'),
                diagnoses.find(d => d.id === 'ruptur-v-konjungtiva')
            ].filter(Boolean); // Filter out any potential undefined entries

            orderedDiagnoses.forEach(diagnosis => {
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
   