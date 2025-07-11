        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'pityriasis-versicolor', name: 'Pityriasis Versicolor', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-yellow-200"><div class="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-3xl">🍄</div></div>`, description: 'Infeksi jamur superfisial (panu) yang disebabkan oleh Malassezia spp., sering terjadi di area lembab tubuh.', analysis: 'SANGAT SESUAI. Gejala (bercak putih gatal), faktor risiko (petani), dan terutama temuan fluoresensi kuning keemasan pada lampu Wood sangat spesifik untuk diagnosis ini.' },
                { id: 'eritrasma', name: 'Eritrasma', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">🦠</div></div>`, description: 'Infeksi bakteri oleh Corynebacterium minutissimum, biasanya di lipatan kulit.', analysis: 'TIDAK SESUAI. Lokasi (punggung) kurang khas. Yang terpenting, fluoresensi pada lampu Wood untuk Eritrasma adalah merah koral (coral-red), bukan kuning keemasan.' },
                { id: 'tinea-corporis', name: 'Tinea Corporis', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">⭕</div></div>`, description: 'Infeksi jamur dermatofita (ringworm) dengan lesi khas berbentuk cincin kemerahan.', analysis: 'KURANG SESUAI. Gambaran klinis (bukan bercak putih) dan temuan lampu Wood (umumnya tidak berpendar) berbeda dengan kasus ini.' },
                { id: 'ptyriasis-alba', name: 'Pityriasis Alba', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-slate-200"><div class="w-12 h-12 bg-slate-400 rounded-full flex items-center justify-center text-3xl">⚪</div></div>`, description: 'Kondisi kulit non-infeksius berupa bercak hipopigmentasi, sering terkait riwayat atopi/eksim.', analysis: 'TIDAK SESUAI. Meskipun sama-sama bercak putih, Pityriasis Alba biasanya tidak gatal dan tidak menunjukkan fluoresensi khas di bawah lampu Wood.' },
                 { id: 'ptyriasis-rubra', name: 'Pityriasis Rubra', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-pink-100"><div class="w-12 h-12 bg-pink-300 rounded-full flex items-center justify-center text-3xl">❓</div></div>`, description: 'Penyakit peradangan kulit kronis yang langka (Pityriasis Rubra Pilaris) dengan etiologi tidak diketahui.', analysis: 'SANGAT TIDAK SESUAI. Ini adalah diagnosis banding yang keliru. Gejala klinis dan etiologinya sama sekali berbeda dengan kasus yang disajikan.' },
            ],
            quiz: [
                { question: "Apa temuan paling spesifik dari pemeriksaan lampu Wood pada kasus ini?", options: ["Fluoresensi merah koral", "Fluoresensi biru kehijauan", "Fluoresensi kuning keemasan", "Tidak ada fluoresensi"], answer: "Fluoresensi kuning keemasan" },
                { question: "Apa etiologi (penyebab) dari diagnosis yang paling mungkin pada pasien ini?", options: ["Bakteri", "Jamur", "Virus", "Autoimun"], answer: "Jamur" },
                { question: "Faktor risiko manakah pada pasien yang paling mendukung diagnosis Pityriasis Versicolor?", options: ["Usia muda", "Kulit kering", "Pekerjaan sebagai petani (berkeringat)", "Riwayat alergi"], answer: "Pekerjaan sebagai petani (berkeringat)" },
                { question: "Jika diagnosisnya adalah Eritrasma, warna fluoresensi apa yang diharapkan muncul pada pemeriksaan lampu Wood?", options: ["Kuning keemasan", "Putih pucat", "Merah koral", "Tidak ada warna"], answer: "Merah koral" },
                { question: "Berdasarkan keseluruhan data klinis dan pemeriksaan, diagnosis apakah yang paling akurat?", options: ["Pityriasis Alba", "Tinea Corporis", "Eritrasma", "Pityriasis Versicolor"], answer: "Pityriasis Versicolor" }
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
             const reorderedDiagnoses = [
                diagnoses.find(d => d.id === 'pityriasis-versicolor'),
                diagnoses.find(d => d.id === 'eritrasma'),
                diagnoses.find(d => d.id === 'tinea-corporis'),
                diagnoses.find(d => d.id === 'ptyriasis-alba'),
                diagnoses.find(d => d.id === 'ptyriasis-rubra'),
            ];

            reorderedDiagnoses.forEach(diagnosis => {
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
                labels: diagnoses.map(d => d.name).reverse(),
                datasets: [{
                    label: 'Tingkat Kecocokan',
                    data: diagnoses.map(d => d.matchScore).reverse(),
                    backgroundColor: diagnoses.reverse().map(d => d.matchScore >= 8 ? '#059669' : (d.matchScore >= 4 ? '#34d399' : '#fca5a5')),
                    borderColor: diagnoses.map(d => d.matchScore >= 8 ? '#065f46' : (d.matchScore >= 4 ? '#059669' : '#ef4444')),
                    borderWidth: 1,
                    borderRadius: 4
                }]
            };
            diagnoses.reverse(); // put it back to original order
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
                renderDetails('pityriasis-versicolor');
            }
            createChart();
            loadQuiz();
        };
