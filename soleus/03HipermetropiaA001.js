        // Data kasus yang sudah direvisi sesuai prinsip klinis yang benar
        const caseData = {
            diagnoses: [
                { id: 's125', name: 'S +1.25', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-xl font-bold">6/9</div></div>`, description: 'Koreksi Sferis +1.25 Dioptri.', analysis: 'TIDAK TEPAT. Ukuran ini belum memberikan tajam penglihatan (visus) yang maksimal (hanya 6/9). Ini adalah kondisi under-correction.' },
                { id: 's150', name: 'S +1.50', matchScore: 7, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-xl font-bold">6/6</div></div>`, description: 'Koreksi Sferis +1.50 Dioptri.', analysis: 'KURANG OPTIMAL. Meskipun memberikan visus 6/6, ini bukan pilihan terbaik. Masih ada lensa plus yang lebih tinggi (+1.75 dan +2.00) yang juga memberikan visus 6/6. Ukuran ini belum merelaksasi akomodasi secara maksimal.' },
                { id: 's175', name: 'S +1.75', matchScore: 8, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-xl font-bold">6/6</div></div>`, description: 'Koreksi Sferis +1.75 Dioptri.', analysis: 'HAMPIR OPTIMAL. Memberikan visus 6/6, namun masih ada satu tingkatan lensa lagi (+2.00) yang juga memberikan visus yang sama baiknya. Prinsipnya adalah "push the plus" hingga maksimal.' },
                { id: 's200', name: 'S +2.00', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-emerald-100"><div class="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center text-xl font-bold text-white">6/6</div></div>`, description: 'Koreksi Sferis +2.00 Dioptri.', analysis: 'PALING TEPAT. Ini adalah kekuatan lensa plus tertinggi yang masih memberikan tajam penglihatan terbaik (visus 6/6). Ukuran ini merelaksasi akomodasi secara maksimal tanpa menyebabkan over-correction, sehingga paling efektif menghilangkan keluhan.' },
                { id: 's225', name: 'S +2.25', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-xl font-bold">6/9</div></div>`, description: 'Koreksi Sferis +2.25 Dioptri.', analysis: 'TIDAK TEPAT. Visus pasien menurun kembali menjadi 6/9. Ini adalah tanda jelas dari over-correction, di mana kacamata terlalu kuat dan malah membuat penglihatan menjadi kabur.' },
            ],
            quiz: [
                { question: "Apa kelainan refraksi yang paling mungkin dialami pasien berdasarkan data pemeriksaan?", options: ["Miopia (rabun jauh)", "Astigmatisma (silinder)", "Hipermetropia (rabun dekat)", "Presbiopia (mata tua)"], answer: "Hipermetropia (rabun dekat)" },
                { question: "Prinsip utama dalam menentukan resep kacamata untuk kasus hipermetropia manifest (tanpa obat tetes) adalah...", options: ["Kekuatan plus terendah yang memberi visus terbaik", "Kekuatan plus tertinggi yang memberi visus terbaik", "Rata-rata dari semua ukuran yang memberi visus 6/6", "Kekuatan plus terendah yang tidak membuat pusing"], answer: "Kekuatan plus tertinggi yang memberi visus terbaik" },
                { question: "Rentang ukuran lensa manakah yang memberikan pasien tajam penglihatan terbaik (6/6)?", options: ["+1.25 hingga +1.75", "+1.50 hingga +2.25", "+1.50 hingga +2.00", "+1.75 hingga +2.25"], answer: "+1.50 hingga +2.00" },
                { question: "Mengapa ukuran S +2.25 tidak dipilih untuk pasien ini?", options: ["Karena terlalu mahal", "Karena menyebabkan visus menurun (over-correction)", "Karena tidak tersedia di optik", "Karena hanya untuk orang dewasa"], answer: "Karena menyebabkan visus menurun (over-correction)" },
                { question: "Berdasarkan seluruh analisis dan prinsip klinis yang tepat, berapakah ukuran kacamata yang seharusnya diresepkan?", options: ["+1.50", "+1.75", "+2.00", "+2.25"], answer: "+2.00" }
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
                        <h4 class="font-semibold text-slate-700">Analisis Ketepatan:</h4>
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
                    label: 'Tingkat Ketepatan',
                    data: diagnoses.map(d => d.matchScore),
                    backgroundColor: diagnoses.map(d => {
                        if (d.matchScore >= 9) return '#059669'; // Paling Tepat
                        if (d.matchScore >= 7) return '#34d399'; // Cukup Tepat/Hampir
                        if (d.matchScore >= 4) return '#fcd34d'; // Kurang Tepat
                        return '#f87171'; // Tidak Tepat
                    }),
                    borderColor: diagnoses.map(d => {
                        if (d.matchScore >= 9) return '#065f46';
                        if (d.matchScore >= 7) return '#059669';
                        if (d.matchScore >= 4) return '#f59e0b';
                        return '#ef4444';
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
                        x: { beginAtZero: true, max: 10, title: { display: true, text: 'Skor Ketepatan (0-10)', font: { size: 14 } } },
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