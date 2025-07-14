        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'physical-barrier', name: 'Physical Barrier', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-blue-200"><div class="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-3xl">🔊</div></div>`, description: 'Hambatan yang disebabkan oleh faktor lingkungan atau fisik eksternal.', analysis: 'SANGAT SESUAI. Kebisingan dari pasien lain adalah gangguan lingkungan fisik yang secara langsung menghalangi transmisi pesan. Ini adalah contoh buku teks dari hambatan fisik.' },
                { id: 'psychological-barrier', name: 'Psychological Barrier', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">🧠</div></div>`, description: 'Hambatan yang berasal dari keadaan mental atau emosional seseorang.', analysis: 'KURANG SESUAI. Masalah utamanya bukan keadaan emosional dokter atau pasien yang bertanya, melainkan gangguan suara dari pihak ketiga. Gangguan ini bersifat eksternal, bukan internal.' },
                { id: 'interpersonal-barrier', name: 'Interpersonal Barrier', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-purple-100"><div class="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center text-3xl">↔️</div></div>`, description: 'Hambatan yang timbul dari hubungan antar individu.', analysis: 'TIDAK SESUAI. Tidak ada informasi yang menunjukkan adanya masalah dalam hubungan antara dokter dan pasien, seperti ketidakpercayaan atau konflik personal.' },
                { id: 'perceptual-barrier', name: 'Perceptual Barrier', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">🤔</div></div>`, description: 'Hambatan yang terjadi karena perbedaan dalam cara memandang atau menginterpretasi sesuatu.', analysis: 'TIDAK SESUAI. Masalahnya bukan karena dokter salah mengartikan pesan, tetapi karena dokter tidak dapat mendengar pesan itu sendiri dengan jelas.' },
                { id: 'gender-barrier', name: 'Gender Barrier', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-green-100"><div class="w-12 h-12 bg-green-300 rounded-full flex items-center justify-center text-3xl">🚻</div></div>`, description: 'Hambatan yang disebabkan oleh stereotip atau perbedaan komunikasi antar gender.', analysis: 'SANGAT TIDAK SESUAI. Skenario sama sekali tidak memberikan indikasi bahwa jenis kelamin para pihak memainkan peran dalam kesulitan komunikasi.' }
            ],
            quiz: [
                { question: "Apa sumber utama gangguan dalam skenario komunikasi ini?", options: ["Keterbatasan pendengaran dokter", "Pertanyaan pasien yang rumit", "Suara berisik dari pasien lain", "Perbedaan gender"], answer: "Suara berisik dari pasien lain" },
                { question: "Hambatan fisik (Physical Barrier) dalam komunikasi merujuk pada...", options: ["Perbedaan pendapat", "Keadaan emosional pembicara", "Status sosial yang berbeda", "Gangguan eksternal di lingkungan sekitar"], answer: "Gangguan eksternal di lingkungan sekitar" },
                { question: "Mengapa 'Hambatan Psikologis' kurang tepat untuk kasus ini?", options: ["Karena dokternya tidak stres", "Karena gangguan datang dari luar, bukan dari kondisi internal komunikator", "Karena pasiennya perempuan", "Karena terjadi di rumah sakit"], answer: "Karena gangguan datang dari luar, bukan dari kondisi internal komunikator" },
                { question: "Manakah contoh lain dari hambatan fisik dalam komunikasi?", options: ["Pasien merasa cemas", "Menggunakan jargon medis yang sulit", "Jarak yang terlalu jauh antara pembicara", "Tidak percaya pada dokter"], answer: "Jarak yang terlalu jauh antara pembicara" },
                { question: "Berdasarkan analisis, jenis hambatan komunikasi yang paling dominan dalam kasus ini adalah...", options: ["Psychological Barrier", "Interpersonal Barrier", "Gender Barrier", "Physical Barrier"], answer: "Physical Barrier" }
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
                    backgroundColor: ['#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444', '#22c55e' ],
                    borderColor: ['#2563eb', '#d97706', '#7c3aed', '#dc2626', '#16a34a' ],
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
