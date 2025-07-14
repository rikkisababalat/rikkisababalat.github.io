        const caseData = {
            diagnoses: [
                { id: 'dermatitis-seboroik', name: 'Dermatitis Seboroik', matchScore: 7, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">🧴</div></div>`, description: 'Peradangan kulit yang menyebabkan skuama berminyak kekuningan, terutama di area kaya kelenjar sebasea.', analysis: 'CUKUP SESUAI. Lokasi di kulit kepala dan tengkuk cocok. Namun, skuama pada kasus ini digambarkan sebagai "putih berlapis" (khas psoriasis), bukan "berminyak kekuningan". Tidak menjelaskan adanya pitting nail atau artritis.' },
                { id: 'liken-simpleks', name: 'Liken Simpleks Kronikus', matchScore: 5, vizIconHtml: `<div class="viz-icon bg-purple-100"><div class="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center text-3xl">🧠</div></div>`, description: 'Penebalan kulit (likenifikasi) akibat siklus gatal-garuk yang dipicu stres.', analysis: 'KURANG SESUAI. Pemicu stres dan gatal hebat cocok, tetapi lesi utamanya adalah likenifikasi, bukan plak eritematosa dengan skuama tebal yang mudah dilepaskan. Fenomena Auspitz dan pitting nail tidak ada.' },
                { id: 'psoriasis-vulgaris', name: 'Psoriasis Vulgaris', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-emerald-100"><div class="w-12 h-12 bg-emerald-300 rounded-full flex items-center justify-center text-3xl">🧬</div></div>`, description: 'Penyakit autoimun dengan temuan khas hiperkeratosis, parakeratosis, dan mikroabses Munro.', analysis: 'SANGAT SESUAI. Semua temuan kunci menunjuk ke diagnosis ini: plak berskuama perak, fenomena Auspitz, pitting nail, artralgia, dan pemicu stres. Ini adalah presentasi klasik.' },
                { id: 'tinea-kapitis', name: 'Tinea Kapitis', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">🍄</div></div>`, description: 'Infeksi jamur pada kulit kepala yang didiagnosis dengan pemeriksaan KOH.', analysis: 'KURANG SESUAI. Meskipun bisa menyebabkan skuama, biasanya disertai kerontokan rambut (alopesia) dan jarang memiliki skuama tebal berlapis seperti perak. Tidak menyebabkan pitting nail atau artritis.' },
                { id: 'dermatitis-kontak', name: 'Dermatitis Kontak Alergi', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">🧪</div></div>`, description: 'Reaksi peradangan kulit akibat kontak dengan alergen, ditandai dengan spongiosis.', analysis: 'TIDAK SESUAI. Biasanya lesi berupa vesikel atau eksudatif pada fase akut, dan tidak memiliki skuama tebal yang khas. Batas lesi sering tidak setegas psoriasis. Pitting nail dan artritis tidak berhubungan.' }
            ],
            quiz: [
                { question: "Temuan bintik-bintik perdarahan setelah skuama tebal diangkat dikenal sebagai...", options: ["Fenomena Koebner", "Tanda Nikolsky", "Fenomena Auspitz", "Tanda Asboe-Hansen"], answer: "Fenomena Auspitz" },
                { question: "Keluhan nyeri pada sendi lutut pasien sangat mungkin merupakan manifestasi dari...", options: ["Osteoartritis", "Artritis Reumatoid", "Artritis Psoriatik", "Artritis Gout"], answer: "Artritis Psoriatik" },
                { question: "Manakah temuan pada kuku yang paling spesifik untuk mendukung diagnosis pada kasus ini?", options: ["Onikolisis (kuku lepas)", "Beau's lines (garis melintang)", "Koilonychia (kuku sendok)", "Pitting nail (lekukan kecil)"], answer: "Pitting nail (lekukan kecil)" },
                { question: "Faktor pemicu yang memperburuk keluhan pasien sesuai dengan riwayat adalah...", options: ["Paparan sinar matahari", "Stres psikologis", "Konsumsi obat tertentu", "Infeksi bakteri"], answer: "Stres psikologis" },
                { question: "Manakah temuan patologis berikut yang paling spesifik untuk diagnosis pada kasus ini?", options: ["Kolonisasi jamur Malassezia di sekitar folikel", "Likenifikasi akibat garukan kronis", "Hiperkeratosis dengan parakeratosis dan mikroabses Munro", "Hifa dan spora pada pemeriksaan KOH"], answer: "Hiperkeratosis dengan parakeratosis dan mikroabses Munro" }
            ]
        };

        const { diagnoses, quiz: quizData } = caseData;
        
        const navContainer = document.getElementById('diagnosis-nav');
        const detailsContainer = document.getElementById('diagnosis-details');
        let chart = null;

        function renderDetails(diagnosisId) {
            const diagnosis = diagnoses.find(d => d.id === diagnosisId);
            if (!diagnosis) return;
            detailsContainer.innerHTML = `<div class="bg-white p-6 rounded-xl shadow-lg border border-slate-200 transition-all duration-300 ease-in-out"><div class="flex flex-col md:flex-row items-center gap-6">${diagnosis.vizIconHtml}<div class="flex-1 text-center md:text-left"><h3 class="text-2xl font-bold text-emerald-800">${diagnosis.name}</h3><p class="text-slate-600 mt-1">${diagnosis.description}</p></div></div><div class="mt-4 pt-4 border-t border-slate-200"><h4 class="font-semibold text-slate-700">Analisis Kecocokan dengan Kasus:</h4><p class="text-slate-600 mt-1">${diagnosis.analysis}</p></div></div>`;
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
                        if (d.matchScore >= 9) return '#10b981'; // emerald-500
                        if (d.matchScore >= 6) return '#6ee7b7'; // emerald-300
                        if (d.matchScore >= 4) return '#fcd34d'; // amber-300
                        return '#fca5a5'; // red-300
                    }),
                    borderColor: diagnoses.map(d => {
                        if (d.matchScore >= 9) return '#059669'; // emerald-700
                        if (d.matchScore >= 6) return '#34d399'; // emerald-400
                        if (d.matchScore >= 4) return '#f59e0b'; // amber-500
                        return '#ef4444'; // red-500
                    }),
                    borderWidth: 1,
                    borderRadius: 4
                }]
            };
            if(chart) { chart.destroy(); }
            chart = new Chart(ctx, {
                type: 'bar',
                data: data,
                options: { responsive: true, maintainAspectRatio: false, indexAxis: 'y', scales: { x: { beginAtZero: true, max: 10, title: { display: true, text: 'Skor Kecocokan (0-10)', font: { size: 14 } } }, y: { ticks: { font: { size: 12 } } } }, plugins: { legend: { display: false }, tooltip: { callbacks: { label: (context) => ` Skor: ${context.parsed.x}` } } } }
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
            quizContainer.querySelector('#quiz-header').classList.remove('hidden');
            quizContainer.querySelector('#quiz-body').classList.remove('hidden');
            quizContainer.querySelector('#quiz-footer').classList.remove('hidden');
            quizContainer.querySelector('#result-container').classList.add('hidden');
            loadQuestion();
        }

        function loadQuestion() {
            selectedAnswer = null;
            const currentQuestion = quizData[currentQuestionIndex];
            const quizBody = quizContainer.querySelector('#quiz-body');
            quizBody.innerHTML = `<h2 class="text-xl font-semibold text-slate-800 mb-6">${currentQuestion.question}</h2><div id="options-container" class="space-y-3">${currentQuestion.options.map(option => `<button class="option-btn w-full text-left p-4 border-2 border-slate-200 rounded-lg text-slate-700 font-medium">${option}</button>`).join('')}</div>`;
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
            resultContainer.querySelector('#score-text').textContent = `${score}/${quizData.length}`;
            const feedbackText = resultContainer.querySelector('#feedback-text');
            const percentage = (score / quizData.length) * 100;
            if (percentage < 60) {
                feedbackText.textContent = "Sepertinya perlu meninjau kembali tanda-tanda kunci kasus ini.";
            } else if (percentage < 100) {
                feedbackText.textContent = "Pemahaman yang baik! Tinggal sedikit lagi untuk sempurna.";
            } else {
                feedbackText.textContent = "Luar biasa! Pemahaman klinis Anda sangat tajam.";
            }
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