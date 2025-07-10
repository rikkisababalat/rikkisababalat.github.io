        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'candida', name: 'Candida albicans', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-green-200"><div class="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-3xl">🍄</div></div>`, description: 'Spesies jamur ragi yang paling umum menyebabkan infeksi oportunistik pada manusia, termasuk kandidiasis oral (thrush).', analysis: 'SANGAT SESUAI. Ini adalah penyebab klasik kandidiasis oral, terutama pada pasien immunocompromised seperti penderita HIV. Gambaran klinis lesi putih yang dapat dikerok dan meninggalkan dasar eritematosa adalah tanda patognomonik untuk kandidiasis pseudomembran.' },
                { id: 'hsv', name: 'Virus herpes simpleks', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">🦠</div></div>`, description: 'Virus yang menyebabkan herpes oral (vesikel/luka lepuh di sekitar mulut) dan herpes genital.', analysis: 'KURANG SESUAI. Infeksi HSV di mulut biasanya muncul sebagai vesikel (lepuhan) yang menyakitkan atau ulkus, bukan plak putih. Meskipun bisa menjadi parah pada pasien HIV, presentasinya berbeda.' },
                { id: 'staphylococcus', name: 'Stafilokokus sp.', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl"> B </div></div>`, description: 'Genus bakteri yang dapat menyebabkan berbagai infeksi, mulai dari infeksi kulit hingga kondisi yang mengancam jiwa.', analysis: 'KURANG SESUAI. Infeksi bakteri di mulut oleh Stafilokokus biasanya bermanifestasi sebagai abses atau selulitis, bukan plak putih yang dapat dikerok seperti pada kasus ini.' },
                { id: 'malassezia', name: 'Malassezia furfur', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">🖐️</div></div>`, description: 'Jamur yang merupakan flora normal kulit dan biasanya menyebabkan infeksi superfisial seperti panu (tinea versicolor).', analysis: 'TIDAK SESUAI. Patogen ini jarang sekali menyebabkan infeksi oral. Manifestasi klinisnya terbatas pada kulit dan folikel rambut, bukan mukosa mulut.' },
                { id: 'hiv', name: 'HIV', matchScore: 0, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">🎗️</div></div>`, description: 'Human Immunodeficiency Virus adalah virus yang menyerang sistem kekebalan tubuh, menyebabkan AIDS.', analysis: 'BUKAN PATOGEN PENYEBAB LANGSUNG. HIV adalah virus yang mendasari kondisi imunodefisiensi pasien, yang menciptakan peluang bagi infeksi oportunistik. Namun, HIV itu sendiri tidak menyebabkan lesi putih tersebut. Lesi tersebut disebabkan oleh patogen lain yang mengambil keuntungan dari lemahnya sistem imun.' }
            ],
            quiz: [
                { question: "Berdasarkan riwayat dan temuan fisik, diagnosis klinis yang paling mungkin untuk lesi putih di mulut pasien adalah...", options: ["Oral Hairy Leukoplakia", "Kandidiasis Oral", "Lichen Planus", "Herpes Oral"], answer: "Kandidiasis Oral" },
                { question: "Manakah pilihan jawaban yang merupakan patogen penyebab yang paling mungkin pada kasus ini?", options: ["Malassezia furfur", "Candida albicans", "Stafilokokus sp.", "Virus herpes simpleks", "HIV"], answer: "Candida albicans" },
                { question: "Tanda fisik 'lesi putih yang dapat diangkat/dikerok dan meninggalkan dasar kemerahan (eritema)' sangat khas untuk infeksi oleh...", options: ["Stafilokokus sp.", "Virus herpes simpleks", "Malassezia furfur", "Candida albicans"], answer: "Candida albicans" },
                { question: "Mengapa HIV dianggap sebagai faktor risiko utama dalam kasus ini, meskipun bukan penyebab langsung lesi tersebut?", options: ["Karena HIV secara langsung membentuk plak putih", "Karena terapi ART menyebabkan efek samping berupa sariawan", "Karena HIV melemahkan sistem imun (imunodefisiensi)", "Karena HIV menular melalui kontak oral"], answer: "Karena HIV melemahkan sistem imun (imunodefisiensi)" },
                { question: "Kondisi di mana sistem kekebalan tubuh pasien lemah, yang memungkinkan infeksi oleh mikroorganisme yang biasanya tidak berbahaya, disebut...", options: ["Infeksi nosokomial", "Infeksi iatrogenik", "Infeksi oportunistik", "Infeksi kronis"], answer: "Infeksi oportunistik" }
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
                        if (d.matchScore >= 3) return '#6ee7b7'; // emerald-300
                        if (d.matchScore >= 1) return '#fca5a5'; // red-300
                        return '#ef4444'; // red-500
                    }),
                    borderColor: diagnoses.map(d => {
                        if (d.matchScore >= 8) return '#059669'; // emerald-700
                        if (d.matchScore >= 3) return '#10b981'; // emerald-500
                        if (d.matchScore >= 1) return '#f87171'; // red-400
                        return '#b91c1c'; // red-700
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
                // Sort diagnoses by matchScore descending before rendering
                diagnoses.sort((a, b) => b.matchScore - a.matchScore);
                renderDetails(diagnoses[0].id);
            }
            createChart();
            loadQuiz();
        };