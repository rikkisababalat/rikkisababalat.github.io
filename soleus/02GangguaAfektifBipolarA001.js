        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'haloperidol-fluoxetine', name: 'Haloperidol + Fluoksetin', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">🚫</div></div>`, description: 'Kombinasi antipsikotik tipikal dan antidepresan.', analysis: 'TIDAK SESUAI. Haloperidol digunakan untuk mania akut atau psikosis, yang tidak ditemukan pada pasien saat ini. Penggunaan antidepresan (Fluoksetin) tanpa mood stabilizer pada pasien bipolar sangat berisiko memicu episode manik.' },
                { id: 'fluoxetine-lithium', name: 'Fluoksetin + Litium', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-green-200"><div class="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-3xl">🎯</div></div>`, description: 'Kombinasi antidepresan (SSRI) dan mood stabilizer.', analysis: 'SANGAT SESUAI. Pasien mengalami episode depresi dalam kerangka gangguan bipolar. Litium adalah mood stabilizer lini pertama untuk mencegah kekambuhan dan episode manik. Fluoksetin (antidepresan) ditambahkan untuk mengatasi gejala depresi saat ini. Kombinasi ini efektif dan mengatasi kedua aspek penyakit.' },
                { id: 'sertraline-low-lithium', name: 'Sertralin + Litium (Dosis Rendah)', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">📉</div></div>`, description: 'Kombinasi antidepresan dan mood stabilizer dosis sangat rendah.', analysis: 'TIDAK SESUAI. Dosis Litium (total 180 mg/hari) terlalu rendah untuk memberikan efek terapeutik sebagai mood stabilizer. Dosis efektif biasanya dimulai dari 900 mg/hari. Tanpa mood stabilizer yang adekuat, penambahan Sertralin tetap berisiko.' },
                { id: 'lithium-only', name: 'Litium (Monoterapi)', matchScore: 7, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">🛡️</div></div>`, description: 'Terapi dengan mood stabilizer saja.', analysis: 'CUKUP SESUAI. Litium adalah terapi inti untuk gangguan bipolar. Memulai dengan monoterapi mood stabilizer adalah strategi yang valid dan aman untuk menghindari risiko switch ke mania yang bisa dipicu antidepresan. Namun, mungkin kurang cepat mengatasi episode depresi yang sedang berlangsung dibandingkan terapi kombinasi.' },
                { id: 'haloperidol-lithium', name: 'Haloperidol + Litium', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">🤔</div></div>`, description: 'Kombinasi antipsikotik tipikal dan mood stabilizer.', analysis: 'KURANG SESUAI. Pasien sedang dalam episode depresi, bukan mania atau psikosis. Tidak ada indikasi untuk Haloperidol. Meskipun Litium sudah tepat sebagai mood stabilizer, kombinasi dengan Haloperidol tidak beralasan untuk kondisi pasien saat ini.' }
            ],
            quiz: [
                { question: "Apa diagnosis yang paling mungkin untuk pasien ini berdasarkan riwayat penyakitnya?", options: ["Gangguan Depresi Mayor", "Skizofrenia", "Gangguan Bipolar", "Gangguan Cemas Menyeluruh"], answer: "Gangguan Bipolar" },
                { question: "Perilaku membeli 5 kalung emas dan membagi-bagikan sembako kemungkinan merupakan manifestasi dari episode apa?", options: ["Depresif", "Manik / Hipomanik", "Psikotik", "Panik"], answer: "Manik / Hipomanik" },
                { question: "Mengapa pemberian antidepresan saja (tanpa mood stabilizer) berbahaya pada pasien ini?", options: ["Tidak akan efektif untuk depresi", "Akan menyebabkan ketergantungan", "Dapat memicu atau mempercepat episode manik", "Menyebabkan efek samping hipertensi"], answer: "Dapat memicu atau mempercepat episode manik" },
                { question: "Apa fungsi utama pemberian Litium Karbonat pada kasus ini?", options: ["Sebagai obat tidur", "Untuk mengatasi halusinasi", "Menstabilkan mood dan mencegah kekambuhan episode manik/depresi", "Meningkatkan semangat secara langsung"], answer: "Menstabilkan mood dan mencegah kekambuhan episode manik/depresi" },
                { question: "Berdasarkan analisis klinis, tatalaksana mana yang paling komprehensif untuk kondisi pasien saat ini?", options: ["Haloperidol 2 x 5 mg PO dan Fluoksetin 1 x 40 mg PO", "Fluoksetin 1 x 20 mg PO dan Litium karbonat 2 x 600 mg PO", "Sertralin 1 x 50 mg PO dan Litium karbonat 2 x 90 mg PO", "Haloperidol 2 x 5 mg PO dan Litium karbonat 2 x 500 mg PO"], answer: "Fluoksetin 1 x 20 mg PO dan Litium karbonat 2 x 600 mg PO" }
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
                        if (d.matchScore >= 8) return '#10b981'; // emerald-500
                        if (d.matchScore >= 5) return '#60a5fa'; // blue-400
                        if (d.matchScore >= 3) return '#f97316'; // orange-500
                        return '#ef4444'; // red-500
                    }),
                    borderColor: diagnoses.map(d => {
                        if (d.matchScore >= 8) return '#059669'; // emerald-700
                        if (d.matchScore >= 5) return '#3b82f6'; // blue-500
                        if (d.matchScore >= 3) return '#ea580c'; // orange-600
                        return '#dc2626'; // red-600
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
            
            // Re-map options for the last question to be simpler text
            let optionsHtml = '';
            if (currentQuestionIndex === quizData.length - 1) {
                 optionsHtml = currentQuestion.options.map(option => `
                    <button class="option-btn w-full text-left p-4 border-2 border-slate-200 rounded-lg text-slate-700 font-medium">
                        ${option.split(' dan ')[0]} + ${option.split(' dan ')[1].split(' PO')[0]}
                    </button>
                `).join('');
            } else {
                 optionsHtml = currentQuestion.options.map(option => `
                    <button class="option-btn w-full text-left p-4 border-2 border-slate-200 rounded-lg text-slate-700 font-medium">
                        ${option}
                    </button>
                `).join('');
            }

            quizBody.innerHTML = `
                <h2 class="text-xl font-semibold text-slate-800 mb-6">${currentQuestion.question}</h2>
                <div id="options-container" class="space-y-3">
                    ${optionsHtml}
                </div>
            `;
            updateProgress();
            
            const nextBtn = quizContainer.querySelector('#next-btn');
            if(nextBtn) nextBtn.disabled = true;

            const optionButtons = quizBody.querySelectorAll('.option-btn');
            optionButtons.forEach((button, index) => {
                button.addEventListener('click', () => {
                    optionButtons.forEach(btn => btn.classList.remove('selected'));
                    button.classList.add('selected');
                    // Store the full original answer text
                    selectedAnswer = quizData[currentQuestionIndex].options[index];
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
                // Set the initial view to the correct answer
                renderDetails('fluoxetine-lithium');
            }
            createChart();
            loadQuiz();
        };