          // Data kasus diperbarui untuk mencerminkan analisis yang benar
        const caseData = {
            diagnoses: [
                { id: 'opsi-a', name: '2 tab 4FDC + inj. Streptomisin 500 mg', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-xl font-bold">A</div></div>`, description: '2 tab 4FDC + inj. Streptomisin 500 mg', analysis: 'TIDAK SESUAI. Dosis ini untuk pasien dengan berat badan jauh lebih rendah (30-37 kg). Pemberian dosis ini akan menyebabkan kegagalan terapi.' },
                { id: 'opsi-b', name: '6 tab 4FDC + inj. Streptomisin 500 mg', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-xl font-bold">B</div></div>`, description: '6 tab 4FDC + inj. Streptomisin 500 mg', analysis: 'TIDAK SESUAI. Dosis 4FDC terlalu tinggi (untuk BB > 71 kg) sementara dosis Streptomisin terlalu rendah. Kombinasi yang tidak rasional.' },
                { id: 'opsi-c', name: '3 tab 4FDC + inj. Streptomisin 750 mg', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-xl font-bold">C</div></div>`, description: '3 tab 4FDC + inj. Streptomisin 750 mg', analysis: 'KURANG TEPAT. Dosis ini untuk rentang berat badan 38-54 kg. Menurut pedoman, pasien dengan BB 55 kg sudah masuk ke dalam rentang dosis berikutnya yang lebih tinggi.' },
                { id: 'opsi-d', name: '4 tab 4FDC + inj. Streptomisin 1000 mg', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-emerald-200"><div class="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center text-xl font-bold">D</div></div>`, description: '4 tab 4FDC + inj. Streptomisin 1000 mg', analysis: 'SANGAT SESUAI. Menurut pedoman TB Nasional, pasien dengan BB 55 kg masuk dalam rentang 55-70 kg. Dosisnya adalah 4 tablet 4FDC dan injeksi Streptomisin 1000 mg. Rejimen ini juga konsisten (4 tablet di bulan ke-3), menjadikannya jawaban yang paling tepat.' },
                { id: 'opsi-e', name: '5 tab 4FDC + inj. Streptomisin 1000 mg', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-xl font-bold">E</div></div>`, description: '5 tab 4FDC + inj. Streptomisin 1000 mg', analysis: 'TIDAK SESUAI. Dosis 5 tablet 4FDC adalah untuk berat badan di atas 71 kg. Pemberian dosis ini berisiko tinggi menyebabkan toksisitas/efek samping obat.' },
            ],
            quiz: [
                { question: "Apa diagnosis yang paling tepat untuk pasien ini berdasarkan riwayat dan temuan BTA?", options: ["TB Kasus Baru", "TB Gagal Pengobatan", "TB Kambuh (Relaps)", "TB Laten"], answer: "TB Kambuh (Relaps)" },
                { question: "Regimen pengobatan OAT (Obat Anti Tuberkulosis) mana yang diindikasikan untuk kasus ini?", options: ["OAT Kategori 1", "OAT Kategori 2", "OAT Kategori Anak", "OAT Lini Kedua"], answer: "OAT Kategori 2" },
                { question: "Faktor utama yang digunakan untuk menentukan jumlah tablet 4FDC dan dosis Streptomisin adalah...", options: ["Usia pasien", "Jenis kelamin pasien", "Tinggi badan pasien", "Berat badan pasien"], answer: "Berat badan pasien" },
                { question: "Mengapa pasien ini memerlukan suntikan Streptomisin sebagai bagian dari terapinya?", options: ["Karena batuknya berdarah", "Karena ini adalah kasus baru", "Karena ini adalah kasus dengan riwayat pengobatan sebelumnya (kambuh)", "Karena hasil BTA-nya scanty (+/-)"], answer: "Karena ini adalah kasus dengan riwayat pengobatan sebelumnya (kambuh)" },
                { question: "Menurut pedoman, berapa dosis 4FDC yang tepat untuk pasien dengan BB 55 kg?", options: ["2 tablet", "3 tablet", "4 tablet", "5 tablet"], answer: "4 tablet" }
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
                            <h3 class="text-2xl font-bold text-emerald-800">${diagnosis.description}</h3>
                        </div>
                    </div>
                    <div class="mt-4 pt-4 border-t border-slate-200">
                        <h4 class="font-semibold text-slate-700">Analisis Kecocokan dengan Kasus (BB 55 kg):</h4>
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
                    backgroundColor: diagnoses.map(d => d.matchScore >= 8 ? '#059669' : (d.matchScore >= 4 ? '#f59e0b' : '#ef4444')),
                    borderColor: diagnoses.map(d => d.matchScore >= 8 ? '#065f46' : (d.matchScore >= 4 ? '#d97706' : '#b91c1c')),
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
                        y: { ticks: { font: { size: 12, weight: '500' } } }
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
                // Tampilkan opsi yang benar (Opsi D) secara default
                renderDetails('opsi-d');
            }
            createChart();
            loadQuiz();
        };