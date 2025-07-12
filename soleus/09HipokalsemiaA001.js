        // Data kasus dengan 5 opsi sesuai permintaan
        const caseData = {
            diagnoses: [
                { id: 'carpopedal-spasm', name: 'Spasme carpopedal', matchScore: 5, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">✋</div></div>`, description: 'Spasme pada tangan dan kaki, sering disebut Tanda Trousseau jika diinduksi. Tangan membentuk posisi "tangan bidan".', analysis: 'KONDISI TERKAIT, TAPI BUKAN JAWABAN LANGSUNG. Spasme carpopedal adalah gejala lain dari hipokalsemia. Namun, pertanyaan spesifik menanyakan respon dari *pengetukan wajah*, bukan pemeriksaan lain.' },
                { id: 'metacarpal-spasm', name: 'Spasme metakarpal', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">✊</div></div>`, description: 'Spasme pada otot-otot tangan, khususnya di area metakarpal.', analysis: 'BAGIAN DARI GAMBARAN KLINIS, TAPI TIDAK TEPAT. Spasme metakarpal adalah komponen dari spasme carpopedal (Tanda Trousseau). Sama seperti opsi sebelumnya, ini bukan respon langsung terhadap pengetukan nervus facialis.' },
                { id: 'ipsilateral-contraction', name: 'Kontraksi m. facialis ipsilateral', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-blue-200"><div class="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-3xl">⚡</div></div>`, description: 'Kontraksi otot-otot wajah pada sisi yang sama (ipsilateral) saat nervus facialis diketuk. Ini adalah Tanda Chvostek positif.', analysis: 'SANGAT SESUAI. Manuver yang dilakukan adalah untuk Tanda Chvostek. Gejala dan riwayat pasien sangat mendukung diagnosis hipokalsemia, di mana tanda ini akan positif.' },
                { id: 'contralateral-contraction', name: 'Kontraksi m. facialis kontralateral', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">❌</div></div>`, description: 'Kontraksi otot wajah pada sisi yang berlawanan dari yang diketuk.', analysis: 'TIDAK SESUAI. Secara fisiologis, rangsangan pada nervus facialis akan menyebabkan respons pada sisi yang sama (ipsilateral). Respon kontralateral tidak diharapkan.' },
                { id: 'no-response', name: 'Tidak ada respon', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-slate-200"><div class="w-12 h-12 bg-slate-400 rounded-full flex items-center justify-center text-3xl">😐</div></div>`, description: 'Tidak ada kontraksi otot wajah yang terlihat setelah pengetukan.', analysis: 'KURANG SESUAI. Pada individu normal, ini adalah respons yang diharapkan. Namun, mengingat gejala klinis pasien yang kuat mengarah ke hipokalsemia, tidak adanya respons menjadi kurang mungkin terjadi.' }
            ],
            quiz: [
                { question: "Berdasarkan analisis kasus, apa kemungkinan respon yang terjadi saat dokter melakukan pengetukan pada wajah pasien?", options: ["Spasme carpopedal", "Spasme metakarpal", "Kontraksi m. facialis ipsilateral", "Kontraksi m. facialis kontralateral", "Tidak ada respon"], answer: "Kontraksi m. facialis ipsilateral" },
                { question: "Kondisi metabolik yang paling mungkin mendasari seluruh gejala pasien adalah...", options: ["Hiponatremia", "Hiperkalsemia", "Hipoglikemia", "Hipokalsemia", "Hiperkalemia"], answer: "Hipokalsemia" },
                { question: "Manuver mengetuk bagian depan telinga pada pasien ini disebut tes untuk tanda apa?", options: ["Tanda Trousseau", "Tanda Hoffmann", "Tanda Chvostek", "Tanda Babinski", "Tanda Kernig"], answer: "Tanda Chvostek" },
                { question: "Apa riwayat medis signifikan yang paling relevan sebagai petunjuk diagnosis pada pasien ini?", options: ["Riwayat kejang sebelumnya", "Operasi leher 4 bulan lalu", "Keluhan leher kaku", "Pingsan selama 5 menit", "Wajah berkedut"], answer: "Operasi leher 4 bulan lalu" },
                { question: "Gejala mana yang paling spesifik menunjukkan adanya hipereksitabilitas neuromuskular sebelum kejang?", options: ["Kejang seluruh tubuh", "Tidak sadar setelah kejang", "Leher kaku dan wajah berkedut", "Luka bekas operasi di leher", "Benjolan di leher"], answer: "Leher kaku dan wajah berkedut" }
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
                    backgroundColor: diagnoses.map(d => {
                        if (d.matchScore >= 8) return '#059669'; // very likely
                        if (d.matchScore >= 4) return '#f59e0b'; // related
                        if (d.matchScore >= 2) return '#f87171'; // unlikely
                        return '#ef4444'; // very unlikely
                    }),
                    borderColor: diagnoses.map(d => {
                        if (d.matchScore >= 8) return '#065f46';
                        if (d.matchScore >= 4) return '#b45309';
                        if (d.matchScore >= 2) return '#b91c1c';
                        return '#991b1b';
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
                        x: { beginAtZero: true, max: 10, title: { display: true, text: 'Skor Kecocokan Klinis (0-10)', font: { size: 14 } } },
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
                // Set the default view to the most likely option
                renderDetails('ipsilateral-contraction');
            }
            createChart();
            loadQuiz();
        };
