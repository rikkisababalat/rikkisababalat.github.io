        // Data disesuaikan untuk kasus hukum penanggulangan bencana
        const caseData = {
            diagnoses: [{
                id: 'nasional',
                name: 'Nasional',
                matchScore: 10,
                vizIconHtml: `<div class="viz-icon bg-emerald-200"><div class="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center text-3xl">🇮🇩</div></div>`,
                description: 'Lingkup kewenangan hukum yang berlaku di seluruh wilayah Negara Kesatuan Republik Indonesia.',
                analysis: 'SANGAT TEPAT. Undang-Undang (UU) adalah peraturan yang dibuat oleh pemerintah pusat dan berlaku untuk seluruh warga negara dan wilayah Indonesia tanpa terkecuali. UU No. 29 Tahun 2014 adalah dasar hukum nasional untuk semua operasi SAR.'
            }, {
                id: 'provinsi',
                name: 'Provinsi',
                matchScore: 5,
                vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">🗺️</div></div>`,
                description: 'Lingkup kewenangan hukum yang berlaku hanya di dalam batas wilayah satu provinsi.',
                analysis: 'KURANG TEPAT. Meskipun operasinya berlangsung di Provinsi Jawa Barat, dasar hukum yang digunakan adalah UU, bukan Peraturan Daerah (Perda) Provinsi. Lingkup provinsi berlaku untuk Perda Provinsi.'
            }, {
                id: 'kabupaten-kota',
                name: 'Kabupaten/Kota',
                matchScore: 4,
                vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">🏙️</div></div>`,
                description: 'Lingkup kewenangan hukum yang berlaku hanya di dalam batas wilayah satu kabupaten atau kota.',
                analysis: 'TIDAK TEPAT. Sama seperti provinsi, lingkup ini berlaku untuk Peraturan Daerah (Perda) tingkat Kabupaten/Kota, bukan untuk Undang-Undang yang bersifat nasional.'
            }, {
                id: 'internasional',
                name: 'Internasional',
                matchScore: 2,
                vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">🌍</div></div>`,
                description: 'Lingkup kewenangan hukum yang melibatkan dua atau lebih negara, biasanya berdasarkan perjanjian.',
                analysis: 'TIDAK TEPAT. UU No. 29/2014 adalah hukum domestik Indonesia. Meskipun Indonesia dapat bekerja sama secara internasional dalam operasi SAR, hukum ini sendiri memiliki ruang lingkup nasional.'
            }, {
                id: 'desa',
                name: 'Desa',
                matchScore: 1,
                vizIconHtml: `<div class="viz-icon bg-gray-200"><div class="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-3xl">🏡</div></div>`,
                description: 'Lingkup kewenangan hukum yang berlaku hanya di dalam batas wilayah administratif desa.',
                analysis: 'SANGAT TIDAK TEPAT. Lingkup ini berlaku untuk Peraturan Desa (Perdes). Sangat tidak mungkin sebuah Undang-Undang hanya berlaku di tingkat desa.'
            }],
            quiz: [{
                question: "Berdasarkan kasus, ruang lingkup UU No. 29 tahun 2014 tentang Pencarian dan Pertolongan adalah...",
                options: ["Internasional", "Nasional", "Provinsi", "Kabupaten/Kota"],
                answer: "Nasional"
            }, {
                question: "Lembaga pemerintah yang menjadi pelaksana utama dari UU No. 29 Tahun 2014 adalah...",
                options: ["Badan Nasional Penanggulangan Bencana (BNPB)", "Tentara Nasional Indonesia (TNI)", "Badan Nasional Pencarian dan Pertolongan (Basarnas)", "Kementerian Sosial"],
                answer: "Badan Nasional Pencarian dan Pertolongan (Basarnas)"
            }, {
                question: "Mengapa sebuah Undang-Undang (UU) memiliki ruang lingkup nasional?",
                options: ["Karena dibuat untuk peristiwa besar saja", "Karena merupakan hierarki peraturan tertinggi setelah UUD 1945", "Karena hanya mengatur hubungan luar negeri", "Karena biayanya dari APBN"],
                answer: "Karena merupakan hierarki peraturan tertinggi setelah UUD 1945"
            }, {
                question: "Jika pemerintah daerah ingin membuat aturan spesifik tentang penanggulangan bencana di wilayahnya, produk hukum yang tepat adalah...",
                options: ["Undang-Undang", "Peraturan Pemerintah", "Peraturan Daerah (Perda)", "Keputusan Presiden"],
                answer: "Peraturan Daerah (Perda)"
            }, {
                question: "Ruang lingkup 'Nasional' berarti UU No. 29 Tahun 2014 berlaku di...",
                options: ["Hanya di ibu kota negara", "Seluruh wilayah NKRI", "Hanya di daerah rawan bencana", "Di negara-negara tetangga yang membutuhkan"],
                answer: "Seluruh wilayah NKRI"
            }]
        };

        const {
            diagnoses,
            quiz: quizData
        } = caseData;

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
                        <h4 class="font-semibold text-slate-700">Analisis Kebenaran Opsi:</h4>
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
                    label: 'Tingkat Kebenaran',
                    data: diagnoses.map(d => d.matchScore),
                    backgroundColor: ['#059669', '#facc15', '#fb923c', '#93c5fd', '#d1d5db'],
                    borderColor: ['#065f46', '#eab308', '#f97316', '#60a5fa', '#9ca3af'],
                    borderWidth: 1,
                    borderRadius: 4
                }]
            };
            if (chart) {
                chart.destroy();
            }
            chart = new Chart(ctx, {
                type: 'bar',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y',
                    scales: {
                        x: {
                            beginAtZero: true,
                            max: 10,
                            title: {
                                display: true,
                                text: 'Skor Kebenaran (0-10)',
                                font: {
                                    size: 14
                                }
                            }
                        },
                        y: {
                            ticks: {
                                font: {
                                    size: 12
                                }
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: (context) => ` Skor: ${context.parsed.x}`
                            }
                        }
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
            if (nextBtn) nextBtn.disabled = true;

            const optionButtons = quizBody.querySelectorAll('.option-btn');
            optionButtons.forEach(button => {
                button.addEventListener('click', () => {
                    optionButtons.forEach(btn => btn.classList.remove('selected'));
                    button.classList.add('selected');
                    selectedAnswer = button.textContent.trim();
                    if (nextBtn) nextBtn.disabled = false;
                });
            });
        }

        function updateProgress() {
            const questionCounter = quizContainer.querySelector('#question-counter');
            const progressBar = quizContainer.querySelector('#progress-bar');
            if (questionCounter) questionCounter.textContent = `Pertanyaan ${currentQuestionIndex + 1} dari ${quizData.length}`;
            if (progressBar) {
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
                if (isCorrect) {
                    score++;
                }
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
                // Set default view to the correct answer
                renderDetails('nasional');
            }
            createChart();
            loadQuiz();
        };