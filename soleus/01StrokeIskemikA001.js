        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'sh-aca', name: 'Stroke Hemoragik e.c pecahnya arteri serebri anterior', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 text-red-600 rounded-full flex items-center justify-center text-3xl">🩸</div></div>`, description: 'Pendarahan di otak akibat pecahnya Arteri Serebri Anterior (ACA).', analysis: 'TIDAK SESUAI. Gejala utama stroke ACA adalah kelemahan yang lebih berat pada tungkai (kaki) dibanding lengan. Pasien ini menunjukkan kelemahan lengan yang lebih berat. Jenis hemoragik juga kurang mungkin mengingat kesadaran pasien masih penuh.' },
                { id: 'sh-mca', name: 'Stroke Hemoragik e.c pecahnya arteri serebri media', matchScore: 5, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 text-red-600 rounded-full flex items-center justify-center text-3xl">🩸</div></div>`, description: 'Pendarahan di otak akibat pecahnya Arteri Serebri Media (MCA).', analysis: 'KURANG SESUAI. Lokasi lesi (MCA) cocok dengan gejala kelemahan lengan > tungkai dan afasia. Namun, stroke hemoragik biasanya disertai penurunan kesadaran yang lebih cepat dan gejala tekanan intrakranial yang berat, yang tidak ditemukan pada pasien ini.' },
                { id: 'si-aca', name: 'Stroke Iskemik e.c sumbatan arteri serebri anterior', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 text-yellow-600 rounded-full flex items-center justify-center text-3xl">🚫</div></div>`, description: 'Sumbatan pada Arteri Serebri Anterior (ACA) yang menyebabkan kurangnya aliran darah.', analysis: 'TIDAK SESUAI. Sumbatan ACA menyebabkan kelemahan yang lebih dominan pada tungkai (kaki) dan dapat disertai inkontinensia urin, bukan kelemahan dominan pada lengan seperti kasus ini.' },
                { id: 'si-mca', name: 'Stroke Iskemik e.c sumbatan arteri serebri media', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-emerald-100"><div class="w-12 h-12 text-emerald-600 rounded-full flex items-center justify-center text-3xl">🧠</div></div>`, description: 'Sumbatan pada Arteri Serebri Media (MCA) yang menyebabkan kematian jaringan otak.', analysis: 'SANGAT SESUAI. Gejala klinis pasien sangat klasik untuk sindrom MCA: 1) Hemiparesis kontralateral dengan lengan > tungkai, 2) Afasia ekspresif (Broca). Onset mendadak dan kesadaran baik mendukung etiologi iskemik.' },
                { id: 'si-pca', name: 'Stroke Iskemik e.c sumbatan arteri serebri posterior', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 text-blue-600 rounded-full flex items-center justify-center text-3xl">👁️</div></div>`, description: 'Sumbatan pada Arteri Serebri Posterior (PCA) yang mendarahi bagian belakang otak.', analysis: 'TIDAK SESUAI. Gejala utama stroke PCA adalah gangguan penglihatan (hemianopsia), bukan kelemahan motorik berat seperti yang dialami pasien.' }
            ],
            quiz: [
                { question: "Pola kelemahan motorik yang dialami pasien (lengan lebih lemah dari tungkai) disebut juga...", options: ["Paraparesis", "Monoparesis", "Hemiparesis brakhiofasial", "Tetraparesis"], answer: "Hemiparesis brakhiofasial" },
                { question: "Gangguan bicara berupa sulit memulai kata namun pemahaman baik, mengindikasikan kerusakan pada area otak yang disebut...", options: ["Area Wernicke", "Area Broca", "Lobus Oksipital", "Serebelum"], answer: "Area Broca" },
                { question: "Berdasarkan gejala kelemahan di sisi kanan tubuh dan gangguan bicara, lesi pada otak pasien kemungkinan besar berada di...", options: ["Hemisfer Kanan", "Hemisfer Kiri", "Batang Otak", "Medulla Spinalis"], answer: "Hemisfer Kiri" },
                { question: "Mengapa diagnosis stroke yang melibatkan Arteri Serebri Anterior (ACA) tidak cocok untuk kasus ini?", options: ["Karena ACA tidak menyebabkan kelemahan", "Karena stroke ACA menyebabkan kelumpuhan pada keempat anggota gerak", "Karena stroke ACA menyebabkan kelemahan dominan pada tungkai", "Karena stroke ACA hanya terjadi pada wanita"], answer: "Karena stroke ACA menyebabkan kelemahan dominan pada tungkai" },
                { question: "Manakah diagnosis yang paling tepat untuk pasien ini berdasarkan keseluruhan temuan klinis?", options: ["Stroke Hemoragik e.c pecahnya arteri serebri anterior", "Stroke Hemoragik e.c pecahnya arteri serebri media", "Stroke Iskemik e.c sumbatan arteri serebri anterior", "Stroke Iskemik e.c sumbatan arteri serebri media", "Stroke Iskemik e.c sumbatan arteri serebri posterior"], answer: "Stroke Iskemik e.c sumbatan arteri serebri media" }
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
                            <h3 class="text-xl font-bold text-emerald-800">${diagnosis.name}</h3>
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
                button.className = 'px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 nav-button-inactive';
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
                        y: { ticks: { font: { size: 11 } } }
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
                // Set default view to the most likely diagnosis
                renderDetails('si-mca');
            }
            createChart();
            loadQuiz();
        };
