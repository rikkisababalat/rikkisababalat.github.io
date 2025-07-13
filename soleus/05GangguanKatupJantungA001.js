        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'tri-regurg', name: 'Murmur sistolik pada ICS IV parasternal kiri', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">💔</div></div>`, description: 'Bising jantung yang terjadi saat ventrikel berkontraksi (sistol).', analysis: 'KURANG SESUAI. Lokasinya (ICS IV kiri) benar untuk katup trikuspid, tetapi waktunya (sistolik) salah. Murmur sistolik di area ini menandakan darah bocor kembali ke atrium saat ventrikel berkontraksi, yang merupakan ciri khas Insufisiensi/Regurgitasi Trikuspid, bukan stenosis.' },
                { id: 'mit-regurg', name: 'Murmur sistolik pada apex jantung', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">💔</div></div>`, description: 'Bising jantung saat sistol di puncak jantung.', analysis: 'TIDAK SESUAI. Lokasi (apex) dan kelainan (regurgitasi) tidak cocok. Area apex adalah lokasi utama untuk auskultasi katup mitral. Murmur sistolik di apex menunjukkan Regurgitasi Mitral.' },
                { id: 'pda', name: 'Murmur kontinyu pada ICS II sternalis kiri', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-purple-100"><div class="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center text-3xl">⚙️</div></div>`, description: 'Bising jantung yang terdengar terus-menerus sepanjang siklus jantung.', analysis: 'TIDAK SESUAI. Lokasi, jenis, dan kelainan tidak cocok. Murmur kontinyu ("machinery murmur") adalah ciri khas dari Patent Ductus Arteriosus (PDA), bukan kelainan katup trikuspid.' },
                { id: 'tri-sten', name: 'Murmur diastolik pada ICS IV parasternal kiri', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-emerald-200"><div class="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center text-3xl">🫀</div></div>`, description: 'Bising jantung yang terjadi saat ventrikel relaksasi (diastol).', analysis: 'SANGAT SESUAI. Stenosis trikuspid menyebabkan turbulensi aliran darah saat darah mengisi ventrikel kanan dari atrium kanan. Proses pengisian ini terjadi selama fase diastolik. Lokasi ICS IV parasternal kiri adalah titik auskultasi terbaik untuk katup trikuspid.' },
                { id: 'mit-sten', name: 'Murmur diastolik pada apex jantung', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">🫀</div></div>`, description: 'Bising jantung saat diastol di puncak jantung.', analysis: 'KURANG SESUAI. Waktunya (diastolik) benar untuk kelainan stenosis atrioventrikular, tetapi lokasinya (apex) salah. Murmur diastolik di apex adalah ciri khas Stenosis Mitral, bukan trikuspid.' }
            ],
            quiz: [
                { question: "Hasil auskultasi yang paling tepat untuk diagnosis stenosis katup trikuspid adalah...", options: ["Murmur sistolik di apex", "Murmur diastolik di ICS IV parasternal kiri", "Murmur sistolik di ICS II parasternal kanan", "Murmur kontinyu"], answer: "Murmur diastolik di ICS IV parasternal kiri" },
                { question: "Fase siklus jantung dimana murmur stenosis trikuspid terdengar adalah...", options: ["Sistol", "Diastol", "Sistol dan Diastol", "Hanya di awal sistol"], answer: "Diastol" },
                { question: "Seorang pasien dengan temuan murmur sistolik di ICS IV parasternal kiri kemungkinan besar menderita...", options: ["Stenosis Trikuspid", "Stenosis Mitral", "Regurgitasi Trikuspid", "Regurgitasi Aorta"], answer: "Regurgitasi Trikuspid" },
                { question: "Gejala klinis utama yang membawa pasien ini ke IGD adalah...", options: ["Nyeri dada", "Sesak napas", "Pusing", "Dada berdebar-debar"], answer: "Dada berdebar-debar" },
                { question: "Area auskultasi terbaik untuk mendengarkan bunyi dari katup trikuspid terletak di...", options: ["Apex jantung", "ICS II parasternal kanan", "ICS IV parasternal kiri", "Area subklavikula"], answer: "ICS IV parasternal kiri" }
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
                    backgroundColor: diagnoses.map(d => d.matchScore >= 8 ? '#059669' : (d.matchScore >= 4 ? '#34d399' : '#a7f3d0')),
                    borderColor: diagnoses.map(d => d.matchScore >= 8 ? '#065f46' : (d.matchScore >= 4 ? '#059669' : '#6ee7b7')),
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
                // Set default view to the correct diagnosis
                renderDetails('tri-sten');
            }
            createChart();
            loadQuiz();
        };