        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'luka-iris', name: 'Luka Iris', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-green-200"><div class="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-3xl">🔪</div></div>`, description: 'Luka akibat benda tajam yang digesekkan pada kulit, menghasilkan luka dengan tepi rata.', analysis: 'SANGAT SESUAI. Gambaran klinis luka dengan tepi yang rata, lurus, dan sudut lancip adalah ciri klasik dari luka iris (vulnus incisum).' },
                { id: 'luka-robek', name: 'Luka Robek', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">🧱</div></div>`, description: 'Luka akibat trauma tumpul yang menyebabkan kulit pecah atau robek.', analysis: 'TIDAK SESUAI. Luka robek (vulnus laceratum) memiliki tepi yang tidak beraturan, compang-camping, dan sering disertai jembatan jaringan. Ini sangat berbeda dengan temuan pada kasus.' },
                { id: 'luka-tusuk', name: 'Luka Tusuk', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-gray-200"><div class="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-3xl">📌</div></div>`, description: 'Luka akibat benda runcing yang menembus kulit, kedalaman lebih besar dari lebar.', analysis: 'TIDAK SESUAI. Luka pada pasien bersifat linear dan memanjang di permukaan, bukan luka yang dalam dengan lubang kecil seperti pada luka tusuk (vulnus punctum).' },
                { id: 'luka-lecet', name: 'Luka Lecet', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">擦</div></div>`, description: 'Luka superfisial akibat gesekan dengan permukaan kasar.', analysis: 'TIDAK SESUAI. Luka pada kasus ini menembus lapisan kulit hingga ke subkutan, bukan sekadar pengikisan epidermis seperti pada luka lecet (vulnus excoriatum).' },
                { id: 'luka-memar', name: 'Luka Memar', matchScore: 0, vizIconHtml: `<div class="viz-icon bg-purple-100"><div class="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center text-3xl">🤕</div></div>`, description: 'Cedera jaringan bawah kulit akibat trauma tumpul, kulit intak (tidak robek).', analysis: 'SANGAT TIDAK SESUAI. Luka pada pasien adalah luka terbuka di mana kontinuitas kulit terputus. Luka memar adalah cedera tertutup.' },
            ],
            quiz: [
                { question: "Berdasarkan gambaran klinis, jenis luka yang paling sesuai pada pasien ini adalah...", options: ["Memar", "Lecet", "Tusuk", "Iris", "Robek"], answer: "Iris" },
                { question: "Apa ciri khas utama yang membedakan luka iris dari luka robek?", options: ["Adanya perdarahan", "Menimbulkan rasa nyeri", "Tepi luka yang rata dan tajam", "Lokasi pada paha", "Disebabkan oleh perkelahian"], answer: "Tepi luka yang rata dan tajam" },
                { question: "Dokumen legal yang mendeskripsikan temuan medis pada kasus kekerasan untuk kepentingan peradilan disebut...", options: ["Resep Dokter", "Surat Rujukan", "Medical Record", "Surat Keterangan Sakit", "Visum et Repertum"], answer: "Visum et Repertum" },
                { question: "Jenis benda yang paling mungkin menyebabkan luka seperti pada gambar adalah...", options: ["Pukulan tangan kosong", "Benturan dengan dinding", "Pisau atau silet", "Suntikan jarum", "Jatuh di jalan aspal"], answer: "Pisau atau silet" },
                { question: "Ketiadaan 'jembatan jaringan' pada dasar luka merupakan ciri khas dari...", options: ["Luka robek dan luka memar", "Luka iris dan luka tusuk", "Hanya luka lecet", "Semua jenis luka", "Hanya luka bakar"], answer: "Luka iris dan luka tusuk" }
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
                    backgroundColor: diagnoses.map(d => d.matchScore >= 8 ? '#059669' : (d.matchScore >= 4 ? '#34d399' : '#fca5a5')),
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
            if (diagnoses.length > 0) {
                // Set default view to 'Luka Iris'
                const defaultDiagnosis = diagnoses.find(d => d.id === 'luka-iris') || diagnoses[0];
                renderDetails(defaultDiagnosis.id);
            }
            createChart();
            loadQuiz();
        };