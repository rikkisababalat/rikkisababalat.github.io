        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'option-c', name: 'Pilih Ceftriaxone, karena (p=0,010)', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-emerald-200"><div class="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center text-3xl">🏆</div></div>`, description: 'Ceftriaxone dipilih karena nilai p = 0,010.', analysis: 'SANGAT TEPAT. Nilai p < 0.05 menunjukkan bahwa hasil penelitian signifikan secara statistik. Ini adalah dasar pengambilan keputusan klinis yang paling kuat dalam skenario ini, karena membuktikan efektivitas obat bukan karena faktor kebetulan.' },
                { id: 'option-b', name: 'Pilih Cefoperazone, karena penurunan koloni 10²-10³ CFU/mL', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">🤔</div></div>`, description: 'Cefoperazone dipilih karena menurunkan koloni lebih baik (10²-10³ CFU/mL).', analysis: 'KURANG TEPAT. Meskipun rentang penurunannya terlihat lebih tinggi, hasil ini tidak signifikan secara statistik (p = 0,075). Mengandalkan data yang tidak signifikan dapat mengarah pada keputusan klinis yang tidak valid.' },
                { id: 'option-d', name: 'Pilih Cefoperazone (p=0,075)', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">❌</div></div>`, description: 'Cefoperazone dipilih karena nilai p = 0,075.', analysis: 'TIDAK TEPAT. Nilai p = 0,075 berada di atas ambang batas signifikansi (0,05). Ini menunjukkan hasil tersebut tidak dapat diandalkan, sehingga menjadikan nilai p ini sebagai alasan pemilihan adalah sebuah kesalahan interpretasi statistik.' },
                { id: 'option-a', name: 'Pilih Ceftriaxone, karena penurunan koloni 10²-10³ CFU/mL', matchScore: 0, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">❓</div></div>`, description: 'Ceftriaxone dipilih karena menurunkan koloni sebesar 10²-10³ CFU/mL.', analysis: 'SALAH. Pilihan ini menyajikan data yang salah. Menurut artikel, Ceftriaxone menurunkan koloni sebesar 10¹-10² CFU/mL, bukan 10²-10³ CFU/mL.' },
                { id: 'option-e', name: 'Tidak keduanya (tidak efektif)', matchScore: 0, vizIconHtml: `<div class="viz-icon bg-gray-200"><div class="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-3xl">🤷</div></div>`, description: 'Tidak ada yang dipilih karena keduanya tidak efektif.', analysis: 'SALAH. Ceftriaxone terbukti efektif secara statistik. Menyimpulkan bahwa keduanya tidak efektif mengabaikan bukti signifikansi yang jelas dari Ceftriaxone.' }
            ],
            quiz: [
                { question: "Apa metrik utama yang digunakan untuk menentukan apakah hasil penelitian dapat diandalkan dalam kasus ini?", options: ["Jumlah penurunan koloni", "Nama obat", "Nilai p (p-value)", "Jenis bakteri"], answer: "Nilai p (p-value)" },
                { question: "Mengapa nilai p = 0,010 untuk Ceftriaxone dianggap signifikan?", options: ["Karena angkanya kecil", "Karena lebih kecil dari 0,05", "Karena lebih besar dari 0,01", "Karena ini adalah antibiotik yang kuat"], answer: "Karena lebih kecil dari 0,05" },
                { question: "Apa kelemahan utama dari data Cefoperazone meskipun rentang penurunannya tampak lebih tinggi?", options: ["Obatnya lebih mahal", "Efek sampingnya lebih banyak", "Hasilnya tidak signifikan secara statistik (p > 0.05)", "Dosisnya lebih tinggi"], answer: "Hasilnya tidak signifikan secara statistik (p > 0.05)" },
                { question: "Jika sebuah obat memiliki p-value 0.50, apa artinya?", options: ["Sangat efektif", "Efektivitasnya 50%", "Hasilnya kemungkinan besar karena kebetulan", "Hanya bekerja pada 50% pasien"], answer: "Hasilnya kemungkinan besar karena kebetulan" },
                { question: "Berdasarkan analisis statistik yang benar, obat mana yang harus dipilih oleh dokter?", options: ["Cefoperazone, karena lebih kuat", "Ceftriaxone, karena p-value-nya signifikan", "Keduanya sama baiknya", "Tidak ada yang boleh dipilih"], answer: "Ceftriaxone, karena p-value-nya signifikan" }
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
                        <h4 class="font-semibold text-slate-700">Analisis Validitas:</h4>
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
                    label: 'Tingkat Validitas',
                    data: diagnoses.map(d => d.matchScore),
                    backgroundColor: diagnoses.map(d => d.matchScore >= 9 ? '#059669' : (d.matchScore >= 4 ? '#f59e0b' : '#ef4444')),
                    borderColor: diagnoses.map(d => d.matchScore >= 9 ? '#065f46' : (d.matchScore >= 4 ? '#b45309' : '#b91c1c')),
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
                        x: { beginAtZero: true, max: 10, title: { display: true, text: 'Skor Validitas (0-10)', font: { size: 14 } } },
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