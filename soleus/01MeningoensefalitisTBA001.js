        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'meningoensefalitis-tb', name: 'Meningoensefalitis TB', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">🧠</div></div>`, description: 'Infeksi tuberkulosis yang menyerang selaput otak (meninges) dan jaringan otak (ensefalon).', analysis: 'SANGAT SESUAI. Diagnosis ini mencakup semua temuan kunci: tanda infeksi SSP (kaku kuduk, sopor, Babinski), penyebab (TB dari kontak erat), dan bukti penyebaran sistemik (Rontgen milier).' },
                { id: 'tb-milier', name: 'TB Milier', matchScore: 7, vizIconHtml: `<div class="viz-icon bg-cyan-100"><div class="w-12 h-12 bg-cyan-300 rounded-full flex items-center justify-center text-3xl">🫁</div></div>`, description: 'Bentuk TB diseminata akibat penyebaran kuman melalui darah, dengan gambaran khas pada Rontgen.', analysis: 'SESUAI, TAPI TIDAK LENGKAP. Pasien memang memiliki TB milier, namun diagnosis ini tidak menjelaskan gejala neurologis berat yang merupakan kondisi paling mengancam nyawa saat ini.' },
                { id: 'meningitis-tb', name: 'Meningitis TB', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">🤕</div></div>`, description: 'Infeksi tuberkulosis yang terbatas pada selaput otak (meninges).', analysis: 'CUKUP SESUAI. Menjelaskan kaku kuduk dan demam. Namun, istilah "Meningoensefalitis" lebih akurat karena adanya penurunan kesadaran berat (sopor) dan refleks Babinski yang menandakan keterlibatan jaringan otak.' },
                { id: 'meningitis-streptococcal', name: 'Meningitis Streptococcal', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-purple-100"><div class="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center text-3xl">🦠</div></div>`, description: 'Infeksi bakteri akut pada selaput otak oleh kuman Streptococcus.', analysis: 'KURANG SESUAI. Tidak menjelaskan riwayat penyakit kronis (2 bulan), malnutrisi berat, kontak erat dengan penderita TB, serta tidak cocok dengan gambaran TB milier pada Rontgen.' },
                { id: 'abses-serebral', name: 'Abses Serebral', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">🎯</div></div>`, description: 'Kumpulan nanah yang terlokalisir di dalam jaringan otak.', analysis: 'KURANG KHAS. Abses biasanya menyebabkan gejala fokal (misal: kelemahan satu sisi) bukan tanda iritasi meningeal difus seperti kaku kuduk. Meskipun bisa disebabkan TB (tuberculoma), presentasi klinisnya tidak secocok meningoensefalitis.' }
            ],
            quiz: [
                { question: "Temuan neurologis mana yang paling spesifik menunjukkan adanya iritasi pada selaput otak (meninges)?", options: ["Demam tinggi", "Refleks Babinski (+)", "Kesadaran sopor", "Kaku kuduk (+)"], answer: "Kaku kuduk (+)" },
                { question: "Apa makna klinis dari gambaran rontgen thorax 'milier' pada kasus ini?", options: ["Infeksi paru biasa", "Alergi pada paru", "Penyebaran kuman TB luas melalui aliran darah", "Cairan di dalam paru"], answer: "Penyebaran kuman TB luas melalui aliran darah" },
                { question: "Faktor risiko paling signifikan yang dimiliki pasien ini untuk menderita TB berat adalah...", options: ["Usia muda", "Status gizi buruk", "Kontak erat satu rumah dengan penderita TB aktif", "Semua jawaban benar"], answer: "Semua jawaban benar" },
                { question: "Mengapa Meningitis Streptococcal (bakteri) menjadi diagnosis yang kurang mungkin?", options: ["Karena tidak ada riwayat kontak TB dan gambaran Rontgen tidak khas", "Karena gejalanya terlalu akut", "Karena tidak menyebabkan demam", "Karena hanya terjadi pada orang dewasa"], answer: "Karena tidak ada riwayat kontak TB dan gambaran Rontgen tidak khas" },
                { question: "Berdasarkan keseluruhan data, diagnosis apakah yang paling lengkap dan akurat?", options: ["TB Milier", "Meningitis TB", "Meningoensefalitis TB", "Abses Serebral"], answer: "Meningoensefalitis TB" }
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
                    backgroundColor: diagnoses.map(d => d.matchScore >= 8 ? '#059669' : (d.matchScore >= 5 ? '#34d399' : '#a7f3d0')),
                    borderColor: diagnoses.map(d => d.matchScore >= 8 ? '#065f46' : (d.matchScore >= 5 ? '#059669' : '#6ee7b7')),
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
                renderDetails(diagnoses[0].id);
            }
            createChart();
            loadQuiz();
        };