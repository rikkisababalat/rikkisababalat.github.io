        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'sodium-chromoglycate', name: 'Sodium Chromoglycate', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">🌼</div></div>`, description: 'Obat tetes mata golongan penstabil sel mast untuk terapi konjungtivitis alergi.', analysis: 'KURANG SESUAI. Obat ini untuk alergi. Meskipun pasien mengeluh gatal, adanya sekret mukopurulen (kental & kuning) adalah tanda kuat infeksi bakteri, bukan alergi.' },
                { id: 'chloramphenicol', name: 'Chloramphenicol', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-green-200"><div class="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-3xl">🦠</div></div>`, description: 'Obat tetes mata antibiotik spektrum luas.', analysis: 'SANGAT SESUAI. Ini adalah terapi yang tepat untuk konjungtivitis bakterialis. Gejala sekret mukopurulen dan mata lengket di pagi hari adalah indikasi klasik untuk infeksi bakteri, sehingga memerlukan antibiotik.' },
                { id: 'acyclovir', name: 'Acyclovir', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">🧬</div></div>`, description: 'Obat salep mata antivirus, spesifik untuk virus herpes.', analysis: 'TIDAK SESUAI. Tidak ada tanda-tanda infeksi herpes, seperti lesi vesikular pada kelopak mata atau keterlibatan kornea (dendrit). Gambaran klinis menunjuk ke infeksi bakteri.' },
                { id: 'artificial-tears', name: 'Artificial Tears', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-sky-100"><div class="w-12 h-12 bg-sky-300 rounded-full flex items-center justify-center text-3xl">💧</div></div>`, description: 'Tetes mata pelumas untuk mengatasi mata kering atau iritasi ringan.', analysis: 'TIDAK MEMADAI. Air mata buatan dapat memberikan sedikit kelegaan simtomatik tetapi tidak memiliki komponen antimikroba untuk mengobati infeksi bakteri yang sedang terjadi.' },
                { id: 'bethametasone', name: 'Bethametasone', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">🔥</div></div>`, description: 'Tetes mata kortikosteroid kuat untuk menekan peradangan.', analysis: 'BERBAHAYA & TIDAK SESUAI. Penggunaan steroid tunggal pada infeksi bakteri aktif dapat menekan sistem imun lokal dan memperparah infeksi, berisiko menyebabkan komplikasi serius.' }
            ],
            quiz: [
                { question: "Temuan klinis manakah yang paling kuat menunjuk ke arah konjungtivitis bakterialis pada kasus ini?", options: ["Mata merah", "Rasa gatal", "Sekret mukopurulen", "Visus 6/6"], answer: "Sekret mukopurulen" },
                { question: "Mengapa Bethametasone (kortikosteroid) bukan merupakan terapi awal yang tepat untuk pasien ini?", options: ["Harganya mahal", "Dapat memperburuk infeksi", "Menyebabkan mata kering", "Tidak efektif untuk mata merah"], answer: "Dapat memperburuk infeksi" },
                { question: "Apakah fungsi utama dari terapi Chloramphenicol tetes mata?", options: ["Mengurangi gatal", "Melumasi mata", "Membunuh bakteri", "Menghambat replikasi virus"], answer: "Membunuh bakteri" },
                { question: "Visus pasien yang normal (6/6) membantu menyingkirkan diagnosis banding yang lebih serius, seperti...", options: ["Konjungtivitis virus", "Blefaritis", "Keratitis (infeksi kornea)", "Mata kering"], answer: "Keratitis (infeksi kornea)" },
                { question: "Berdasarkan semua temuan, diagnosis apakah yang paling tepat untuk kasus ini?", options: ["Konjungtivitis Alergi", "Konjungtivitis Bakterialis", "Keratitis Herpes", "Uveitis Anterior"], answer: "Konjungtivitis Bakterialis" }
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
                    backgroundColor: diagnoses.map(d => d.matchScore >= 8 ? '#059669' : (d.matchScore >= 3 ? '#a7f3d0' : '#fca5a5')),
                    borderColor: diagnoses.map(d => d.matchScore >= 8 ? '#065f46' : (d.matchScore >= 3 ? '#6ee7b7' : '#f87171')),
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
                        x: { beginAtZero: true, max: 10, title: { display: true, text: 'Skor Kecocokan Terapi (0-10)', font: { size: 14 } } },
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