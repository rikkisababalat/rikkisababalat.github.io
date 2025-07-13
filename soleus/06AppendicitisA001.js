        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'rovsing-sign', name: 'Rovsing sign', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-2xl font-bold">L→R</div></div>`, description: 'Nyeri di kuadran kanan bawah saat palpasi (penekanan) dilakukan pada kuadran kiri bawah.', analysis: 'TIDAK SESUAI. Manuver ini melibatkan penekanan pada sisi kiri perut, bukan meminta pasien batuk. Meskipun ini adalah tanda untuk apendisitis, ini bukan manuver yang dijelaskan dalam kasus.' },
                { id: 'obturator-sign', name: 'Obturator sign', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-purple-100"><div class="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center text-3xl">🦵</div></div>`, description: 'Nyeri di hipogastrium saat paha kanan difleksikan dan dirotasi secara internal.', analysis: 'TIDAK SESUAI. Manuver ini melibatkan gerakan pada kaki pasien untuk meregangkan otot obturator internus, bukan meminta pasien batuk.' },
                { id: 'psoas-sign', name: 'Psoas sign', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">🚶</div></div>`, description: 'Nyeri saat paha kanan diekstensikan (pasif) atau difleksikan melawan tahanan (aktif).', analysis: 'TIDAK SESUAI. Manuver ini melibatkan gerakan pada paha untuk meregangkan otot psoas, yang sering positif pada apendiks retrocecal. Ini bukan manuver batuk.' },
                { id: 'dunphy-sign', name: 'Dunphy’s sign', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-green-200"><div class="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-3xl">🗣️</div></div>`, description: 'Meningkatnya rasa nyeri di kuadran kanan bawah saat pasien diminta untuk batuk.', analysis: 'SANGAT SESUAI. Deskripsi ini secara presisi cocok dengan tindakan yang dilakukan oleh dokter dalam skenario kasus untuk mengidentifikasi peritonitis lokal.' },
                { id: 'mcburney-sign', name: 'McBurney sign', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">📍</div></div>`, description: 'Nyeri tekan pada titik McBurney (sepertiga jarak dari spina iliaka anterior superior ke umbilikus).', analysis: 'KURANG SESUAI. McBurney sign merujuk pada *temuan* nyeri tekan di lokasi spesifik, bukan *tindakan* meminta pasien batuk. Meskipun ditemukan pada pasien ini, itu bukan nama manuver yang ditanyakan.' },
            ],
            quiz: [
                { question: "Berdasarkan keseluruhan gejala dan tanda, diagnosis yang paling mungkin pada pasien ini adalah...", options: ["Gastroenteritis", "Infeksi Saluran Kemih", "Batu Ginjal", "Apendisitis Akut"], answer: "Apendisitis Akut" },
                { question: "Fenomena berpindahnya nyeri dari area pusar ke perut kanan bawah disebut...", options: ["Nyeri Alih (Referred Pain)", "Migrasi Nyeri", "Rebound Tenderness", "Nyeri Proyeksi"], answer: "Migrasi Nyeri" },
                { question: "Pemeriksaan khusus dengan meminta pasien batuk, seperti dalam kasus ini, disebut...", options: ["Rovsing Sign", "Obturator Sign", "Dunphy's Sign", "Psoas Sign"], answer: "Dunphy's Sign" },
                { question: "Adanya 'rebound tenderness' atau nyeri lepas pada pemeriksaan fisik menandakan adanya...", options: ["Peristaltik usus yang meningkat", "Iritasi pada peritoneum", "Pembesaran hati", "Gas berlebih di usus"], answer: "Iritasi pada peritoneum" },
                { question: "Tanda pemeriksaan fisik mana yang melibatkan penekanan pada perut kiri bawah untuk memprovokasi nyeri di kanan bawah?", options: ["McBurney Sign", "Dunphy's Sign", "Rovsing Sign", "Obturator Sign"], answer: "Rovsing Sign" }
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
                        <h4 class="font-semibold text-slate-700">Analisis Kecocokan dengan Manuver Kasus:</h4>
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
                    backgroundColor: diagnoses.map(d => d.matchScore >= 8 ? '#059669' : (d.matchScore >= 3 ? '#a7f3d0' : '#fecaca')),
                    borderColor: diagnoses.map(d => d.matchScore >= 8 ? '#065f46' : (d.matchScore >= 3 ? '#6ee7b7' : '#f87171')),
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
                        x: { beginAtZero: true, max: 10, title: { display: true, text: 'Skor Kecocokan Manuver (0-10)', font: { size: 14 } } },
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
                // Set default view to the correct answer
                renderDetails('dunphy-sign');
            }
            createChart();
            loadQuiz();
        };