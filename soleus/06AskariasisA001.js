        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'shigellosis', name: 'Shigellosis', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">🦠</div></div>`, description: 'Infeksi bakteri pada usus yang menyebabkan disentri.', analysis: 'KURANG SESUAI. Meskipun ada diare, disentri basiler (Shigellosis) biasanya menyebabkan diare berdarah dan berlendir, bukan hanya cair. Penurunan berat badan drastis lebih jarang, dan temuan mikroskopis tidak menunjukkan bakteri melainkan telur cacing.' },
                { id: 'ascariasis', name: 'Ascariasis', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-orange-200"><div class="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center text-3xl">🪱</div></div>`, description: 'Infeksi cacing gelang Ascaris lumbricoides.', analysis: 'SANGAT SESUAI. Gejala malnutrisi (tidak nafsu makan, turun BB), diare, dan riwayat bermain tanah sangat mendukung. Diagnosis dikonfirmasi oleh temuan telur Ascaris yang khas pada pemeriksaan feses.' },
                { id: 'amebiasis', name: 'Amebiasis', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-purple-200"><div class="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center text-3xl">💧</div></div>`, description: 'Infeksi usus oleh parasit Entamoeba histolytica.', analysis: 'KURANG SESUAI. Amebiasis bisa menyebabkan diare (seringkali berdarah) tetapi penurunan berat badan yang drastis kurang khas. Temuan mikroskopis menunjukkan telur cacing, bukan kista atau trofozoit ameba.' },
                { id: 'bilharziasis', name: 'Bilharziasis', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-blue-200"><div class="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-3xl">🐌</div></div>`, description: 'Infeksi cacing Schistosoma, ditularkan melalui air tawar.', analysis: 'TIDAK SESUAI. Faktor risiko utama adalah kontak dengan air tawar yang terkontaminasi, bukan tanah. Gejala dan morfologi telur pada feses sangat berbeda dengan Schistosoma.' },
                { id: 'strongiloidiasis', name: 'Strongiloidiasis', matchScore: 6, vizIconHtml: `<div class="viz-icon bg-yellow-200"><div class="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-3xl">🐛</div></div>`, description: 'Infeksi cacing benang Strongyloides stercoralis.', analysis: 'CUKUP SESUAI. Strongyloides juga ditularkan melalui tanah dan dapat menyebabkan gejala gastrointestinal serta malnutrisi. Namun, diagnosisnya ditegakkan dengan menemukan larva (bukan telur) di feses, dan gambaran telur pada kasus ini jelas milik Ascaris.' },
            ],
            quiz: [
                { question: "Apa faktor risiko utama yang mengarah pada kemungkinan infeksi cacing tanah pada pasien ini?", options: ["Minum air tidak matang", "Sering bermain tanah", "Jajan sembarangan", "Tidak mencuci buah"], answer: "Sering bermain tanah" },
                { question: "Temuan manakah yang paling konklusif untuk menegakkan diagnosis pada kasus ini?", options: ["Penurunan berat badan", "Rewel dan tidak nafsu makan", "BAB cair", "Gambaran telur pada mikroskopi feses"], answer: "Gambaran telur pada mikroskopi feses" },
                { question: "Berdasarkan gejala dan temuan laboratorium, parasit penyebab penyakit ini adalah...", options: ["Bakteri Shigella", "Cacing Ascaris lumbricoides", "Protozoa Entamoeba histolytica", "Cacing Strongyloides stercoralis"], answer: "Cacing Ascaris lumbricoides" },
                { question: "Mengapa Strongiloidiasis bukan diagnosis yang paling tepat meskipun penularannya juga melalui tanah?", options: ["Karena Strongiloidiasis tidak menyebabkan diare", "Karena pada feses ditemukan telur, bukan larva", "Karena Strongiloidiasis hanya menyerang orang dewasa", "Karena Strongiloidiasis tidak menyebabkan penurunan berat badan"], answer: "Karena pada feses ditemukan telur, bukan larva" },
                { question: "Diagnosis definitif untuk kasus ini adalah...", options: ["Shigellosis", "Ascariasis", "Amebiasis", "Bilharziasis", "Strongiloidiasis"], answer: "Ascariasis" }
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
                    backgroundColor: diagnoses.map(d => d.matchScore >= 8 ? '#059669' : (d.matchScore >= 5 ? '#34d399' : '#f87171')),
                    borderColor: diagnoses.map(d => d.matchScore >= 8 ? '#065f46' : (d.matchScore >= 5 ? '#059669' : '#ef4444')),
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