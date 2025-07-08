
        // Data disesuaikan untuk kasus Neuralgia Trigeminal
        const caseData = {
            diagnoses: [
                { id: 'trigger-zone', name: 'Berawal dari stimulus pada trigger zone', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-green-200"><div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-3xl">🎯</div></div>`, description: 'Nyeri dipicu oleh stimulus non-nyeri (sentuhan ringan, angin, getaran) pada area wajah tertentu.', analysis: 'SANGAT SESUAI. Ini adalah ciri khas (pathognomonic) dari Neuralgia Trigeminal. Kasus ini jelas menyebutkan nyeri dipicu oleh sentuhan kapas, mengunyah, dan membuka mulut, yang semuanya adalah stimulus pada trigger zone.' },
                { id: 'paroksismal-menit', name: 'Serangan paroksismal > 1 menit', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-3xl">⏱️</div></div>`, description: 'Serangan nyeri yang datang tiba-tiba dan berlangsung selama beberapa menit.', analysis: 'KURANG SESUAI. Walaupun nyeri bersifat paroksismal (tiba-tiba), durasi serangan pada Neuralgia Trigeminal klasik biasanya sangat singkat, hanya beberapa detik hingga maksimal 2 menit. "Beberapa menit" bisa jadi terlalu lama.' },
                { id: 'nyeri-sedang', name: 'Nyeri intensitas sedang', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">😐</div></div>`, description: 'Tingkat keparahan nyeri yang dirasakan pasien berada di level menengah.', analysis: 'TIDAK SESUAI. Nyeri Neuralgia Trigeminal digambarkan sebagai salah satu nyeri terhebat yang bisa dialami manusia, sering disebut "nyeri bunuh diri". Deskripsi pasien "nyeri hebat" dan "seperti tertusuk-tusuk" menyingkirkan intensitas sedang.' },
                { id: 'pola-berubah', name: 'Pola serangan berubah-ubah', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-purple-100"><div class="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center text-3xl">🔄</div></div>`, description: 'Karakteristik, lokasi, dan pemicu nyeri berbeda-beda di setiap serangan.', analysis: 'KURANG SESUAI. Pola serangan pada pasien Neuralgia Trigeminal cenderung stereotipikal, artinya pemicu, lokasi, dan jenis nyerinya cenderung sama pada setiap episode serangan.' },
                { id: 'defisit-lain', name: 'Ditemukan defisit neurologis lain', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">⚠️</div></div>`, description: 'Selain nyeri, ditemukan kelainan lain pada pemeriksaan saraf seperti kelemahan otot atau mati rasa persisten.', analysis: 'TIDAK SESUAI. Pada kasus ini, pemeriksaan motorik normal. Adanya defisit neurologis lain akan mengarahkan diagnosis ke Neuralgia Trigeminal Sekunder (misal karena tumor), bukan bentuk klasik yang digambarkan.' }
            ],
            quiz: [
                { question: "Saraf kranial manakah yang paling mungkin terlibat dalam kasus ini?", options: ["Nervus Fasialis (VII)", "Nervus Vagus (X)", "Nervus Trigeminus (V)", "Nervus Optikus (II)"], answer: "Nervus Trigeminus (V)" },
                { question: "Fenomena di mana sentuhan ringan dari kapas menyebabkan nyeri hebat disebut...", options: ["Hiperalgesia", "Allodynia", "Anestesia", "Parestesia"], answer: "Allodynia" },
                { question: "Manakah tindakan di bawah ini yang paling mungkin memicu nyeri pada pasien ini?", options: ["Mendengarkan musik keras", "Melihat cahaya terang", "Mencuci muka atau bercukur", "Mengangkat benda berat"], answer: "Mencuci muka atau bercukur" },
                { question: "Mengapa diagnosis masalah gigi (misal, abses) kurang mungkin menjadi penyebab utama?", options: ["Karena pasien tidak demam", "Karena nyeri dipicu sentuhan kulit, bukan hanya tekanan pada gigi", "Karena usianya baru 30 tahun", "Karena nyerinya hanya di satu sisi"], answer: "Karena nyeri dipicu sentuhan kulit, bukan hanya tekanan pada gigi" },
                { question: "Berdasarkan deskripsi 'nyeri seperti tertusuk-tusuk' dan 'paroksismal', karakteristik nyeri yang paling tepat adalah...", options: ["Nyeri Kronis Tumpul", "Nyeri Neuropatik", "Nyeri Nosiseptif", "Nyeri Psikosomatik"], answer: "Nyeri Neuropatik" }
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
            if (diagnoses.length > 0) {
                renderDetails(diagnoses[0].id);
            }
            createChart();
            loadQuiz();
        };