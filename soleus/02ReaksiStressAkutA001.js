        // Data disesuaikan untuk setiap halaman kasus
        const caseData = {
            diagnoses: [
                { id: 'ptsd', name: 'Gangguan Stres Pasca Trauma', matchScore: 5, vizIconHtml: `<div class="viz-icon bg-orange-200"><div class="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center text-3xl">🗓️</div></div>`, description: 'Gangguan yang berkembang setelah mengalami atau menyaksikan peristiwa menakutkan, gejalanya menetap lebih dari sebulan.', analysis: 'KURANG SESUAI. Gejala pasien memang akibat trauma, tetapi diagnosis PTSD memerlukan durasi gejala > 1 bulan. Kasus ini baru saja terjadi, sehingga diagnosis ini bersifat prematur.' },
                { id: 'skizofrenia-hebefrenik', name: 'Skizofrenia Hebefrenik', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-purple-200"><div class="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center text-3xl">🤔</div></div>`, description: 'Subtipe skizofrenia dengan ciri utama afek yang tidak sesuai (inappropriate), perilaku aneh, dan gangguan pikiran.', analysis: 'TIDAK SESUAI. Gejala pasien (reaksi histeris) adalah respons langsung terhadap trauma ekstrem, bukan manifestasi dari gangguan pikiran primer atau afek datar/tidak sesuai yang tidak memiliki pemicu jelas.' },
                { id: 'sindrom-hiperkinetik', name: 'Sindrom Hiperkinetik', matchScore: 0, vizIconHtml: `<div class="viz-icon bg-cyan-200"><div class="w-12 h-12 bg-cyan-400 rounded-full flex items-center justify-center text-3xl">🏃</div></div>`, description: 'Gangguan neurodevelopmental yang ditandai oleh pola inatensi dan/atau hiperaktivitas-impulsivitas yang persisten.', analysis: 'SANGAT TIDAK SESUAI. Kondisi pasien adalah reaksi akut, bukan gangguan perilaku kronis yang dimulai sejak masa kanak-kanak. Presentasi klinisnya sama sekali tidak cocok.' },
                { id: 'reaksi-stres-akut', name: 'Reaksi Stres Akut', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">🤯</div></div>`, description: 'Reaksi psikologis hebat yang terjadi segera setelah peristiwa traumatik, berlangsung dari 3 hari hingga 1 bulan.', analysis: 'SANGAT SESUAI. Pasien menunjukkan respons emosional dan disosiatif (menangis, histeris, tidak dapat diajak bicara) yang timbul segera setelah menyaksikan stresor traumatik yang jelas. Ini adalah gambaran klasik dari Reaksi Stres Akut.' },
                { id: 'gangguan-penyesuaian', name: 'Gangguan Penyesuaian', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-yellow-200"><div class="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-3xl">😥</div></div>`, description: 'Respons emosional atau perilaku terhadap stresor yang dapat diidentifikasi, namun stresornya tidak seberat trauma pada ASD/PTSD.', analysis: 'KURANG TEPAT. Walaupun ini adalah reaksi terhadap stres, beratnya stresor (menyaksikan penusukan) dan intensitas gejala lebih cocok diklasifikasikan sebagai Reaksi Stres Akut, yang merupakan kategori diagnostik yang lebih spesifik untuk trauma berat.' }
            ],
            quiz: [
                { question: "Apa pemicu utama dari kondisi akut yang dialami pasien?", options: ["Kelelahan di festival musik", "Menolak memberikan uang", "Menyaksikan temannya ditusuk", "Suara musik yang terlalu keras"], answer: "Menyaksikan temannya ditusuk" },
                { question: "Manakah yang merupakan pembeda utama antara Reaksi Stres Akut dan Gangguan Stres Pasca Trauma (PTSD)?", options: ["Jenis trauma", "Usia pasien", "Durasi gejala", "Jenis kelamin pasien"], answer: "Durasi gejala" },
                { question: "Gejala 'tidak dapat diajak bicara' yang ditunjukkan pasien dapat dikategorikan sebagai...", options: ["Gejala afektif", "Gejala psikotik", "Gejala disosiatif", "Gejala manik"], answer: "Gejala disosiatif" },
                { question: "Mengapa Skizofrenia Hebefrenik bukan diagnosis yang tepat untuk kasus ini?", options: ["Karena pasien seorang perempuan", "Karena gejalanya terkait langsung dengan peristiwa traumatik yang jelas", "Karena usianya sudah 28 tahun", "Karena pasien tidak mau makan"], answer: "Karena gejalanya terkait langsung dengan peristiwa traumatik yang jelas" },
                { question: "Berdasarkan onset dan gejala klinis, diagnosis manakah yang paling akurat?", options: ["Gangguan Penyesuaian", "Gangguan Stres Pasca Trauma", "Fobia Spesifik", "Reaksi Stres Akut"], answer: "Reaksi Stres Akut" }
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
            // Urutan navigasi sesuai dengan urutan di prompt (dan caseData)
            const navOrder = ['ptsd', 'skizofrenia-hebefrenik', 'sindrom-hiperkinetik', 'reaksi-stres-akut', 'gangguan-penyesuaian'];
            navOrder.forEach(id => {
                const diagnosis = diagnoses.find(d => d.id === id);
                if (diagnosis) {
                    const button = document.createElement('button');
                    button.textContent = diagnosis.name;
                    button.dataset.id = diagnosis.id;
                    button.className = 'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 nav-button-inactive';
                    button.onclick = () => renderDetails(diagnosis.id);
                    navContainer.appendChild(button);
                }
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
            const navButtons = document.querySelectorAll('#diagnosis-nav button');
            if (navButtons.length > 0) {
                 navButtons.forEach(btn => btn.classList.add('nav-button-inactive'));
            }
            
            createChart();
            loadQuiz();
        };