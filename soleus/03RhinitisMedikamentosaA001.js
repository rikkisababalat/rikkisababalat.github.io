        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'rhinitis-akut', name: 'Rhinitis Akut', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">⏱️</div></div>`, description: 'Peradangan mukosa hidung karena infeksi (biasanya virus), berlangsung singkat.', analysis: 'SANGAT TIDAK SESUAI. Gejala pasien telah berlangsung selama 4 bulan, yang merupakan kondisi kronis. Rhinitis akut biasanya sembuh dalam beberapa minggu.' },
                { id: 'rhinitis-medikamentosa', name: 'Rhinitis Medikamentosa', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">💊</div></div>`, description: 'Bentuk rhinitis non-alergi yang disebabkan oleh penggunaan berlebihan dekongestan hidung topikal.', analysis: 'SANGAT SESUAI. Riwayat penggunaan obat hidung yang kemudian memburuk adalah kunci diagnosis ini. Temuan konka hiperemis (merah padam) juga sangat mendukung.' },
                { id: 'rhinitis-alergika', name: 'Rhinitis Alergika', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">🌼</div></div>`, description: 'Peradangan hidung yang dimediasi IgE setelah paparan alergen.', analysis: 'KURANG SESUAI. Tidak ada gejala khas alergi seperti gatal dan bersin. Temuan fisik konka pada rhinitis alergi biasanya pucat atau kebiruan, bukan merah padam (hiperemis).' },
                { id: 'sinusitis-akut', name: 'Sinusitis Akut', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">🤒</div></div>`, description: 'Peradangan pada sinus paranasal yang berlangsung kurang dari 12 minggu.', analysis: 'TIDAK SESUAI. Durasi keluhan pasien (4 bulan) sudah masuk kategori kronis, bukan akut. Gejala utamanya juga lebih ke sumbatan karena obat, bukan infeksi sinus primer.' },
                { id: 'rhinosinusitis', name: 'Rhinosinusitis', matchScore: 5, vizIconHtml: `<div class="viz-icon bg-teal-100"><div class="w-12 h-12 bg-teal-300 rounded-full flex items-center justify-center text-3xl">🤧</div></div>`, description: 'Istilah umum untuk peradangan pada hidung dan sinus.', analysis: 'CUKUP SESUAI TAPI TIDAK SPESIFIK. Kondisi pasien memang termasuk rhinosinusitis. Namun, "Rhinitis Medikamentosa" adalah diagnosis etiologi yang lebih spesifik dan menjelaskan penyebab utama masalah pasien.' }
            ],
            quiz: [
                { question: "Keluhan pasien memberat setelah penggunaan obat hidung yang semakin tidak efektif. Fenomena ini disebut...", options: ["Efek samping", "Rebound phenomenon", "Resistensi obat", "Toleransi"], answer: "Rebound phenomenon" },
                { question: "Temuan fisik utama yang mendukung diagnosis pada kasus ini adalah...", options: ["Sekret kental", "Demam", "Konka hiperemis dan bengkak", "Wajah pucat"], answer: "Konka hiperemis dan bengkak" },
                { question: "Apa penyebab paling umum dari Rhinitis Medikamentosa?", options: ["Penggunaan antibiotik berlebihan", "Penggunaan dekongestan topikal (semprot hidung) jangka panjang", "Alergi debu", "Infeksi virus kronis"], answer: "Penggunaan dekongestan topikal (semprot hidung) jangka panjang" },
                { question: "Mengapa Rhinitis Alergika kurang mungkin menjadi diagnosis utama?", options: ["Durasi terlalu lama", "Tidak ada riwayat bersin atau gatal, dan konka berwarna merah (hiperemis) bukan pucat", "Pasien tidak memiliki hewan peliharaan", "Gejala hanya terjadi di malam hari"], answer: "Tidak ada riwayat bersin atau gatal, dan konka berwarna merah (hiperemis) bukan pucat" },
                { question: "Berdasarkan riwayat dan pemeriksaan, diagnosis yang paling spesifik untuk pasien ini adalah...", options: ["Rhinitis Akut", "Rhinitis Medikamentosa", "Rhinitis Alergika", "Sinusitis Kronis"], answer: "Rhinitis Medikamentosa" }
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
                        if (d.matchScore >= 8) return '#059669'; // a dark emerald
                        if (d.matchScore >= 4) return '#34d399'; // a medium emerald
                        if (d.matchScore >= 2) return '#a7f3d0'; // a light emerald
                        return '#fecaca'; // a light red for very low scores
                    }),
                    borderColor: diagnoses.map(d => {
                         if (d.matchScore >= 8) return '#065f46';
                         if (d.matchScore >= 4) return '#059669';
                         if (d.matchScore >= 2) return '#6ee7b7';
                         return '#fca5a5';
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
            if (diagnoses.length > 0) {
                // Set default view to the correct diagnosis
                renderDetails('rhinitis-medikamentosa');
            }
            createChart();
            loadQuiz();
        };