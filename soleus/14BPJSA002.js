        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'opsi-a', name: 'Rp 50.000.000,00', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-slate-200"><div class="w-12 h-12 bg-slate-400 rounded-full flex items-center justify-center text-3xl">🤔</div></div>`, description: 'Perhitungan ini tidak akurat.', analysis: 'SALAH. Nilai ini tidak dapat dihasilkan dari data yang tersedia melalui perhitungan yang logis. Kemungkinan besar ini adalah hasil salah hitung atau angka acak sebagai pengecoh.' },
                { id: 'opsi-b', name: 'Rp 100.000.000,00', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-emerald-200"><div class="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center text-3xl">🎯</div></div>`, description: 'Perhitungan yang benar berdasarkan prinsip kapitasi.', analysis: 'SANGAT TEPAT. Perhitungan ini menggunakan rumus yang benar: Jumlah Peserta Terdaftar (20.000) dikalikan dengan Tarif Kapitasi (Rp 5.000). Hasilnya adalah 20.000 x 5.000 = 100.000.000.' },
                { id: 'opsi-c', name: 'Rp 115.000.000,00', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-slate-200"><div class="w-12 h-12 bg-slate-400 rounded-full flex items-center justify-center text-3xl">🤔</div></div>`, description: 'Perhitungan ini tidak akurat.', analysis: 'SALAH. Nilai ini mungkin didapat dari penggabungan data yang tidak relevan (misal: 20.000 peserta + 3.000 kunjungan) x 5.000, yang merupakan metode yang keliru.' },
                { id: 'opsi-d', name: 'Rp 85.000.000,00', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-slate-200"><div class="w-12 h-12 bg-slate-400 rounded-full flex items-center justify-center text-3xl">🤔</div></div>`, description: 'Perhitungan ini tidak akurat.', analysis: 'SALAH. Sama seperti pilihan A dan C, nilai ini tidak dapat dijelaskan dengan rumus perhitungan kapitasi yang benar. Ini adalah pilihan pengecoh.' },
                { id: 'opsi-e', name: 'Rp 15.000.000,00', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-yellow-200"><div class="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-3xl">⚠️</div></div>`, description: 'Perhitungan berdasarkan data yang salah.', analysis: 'SALAH, NAMUN SERING KELIRU. Nilai ini didapat dari mengalikan Rata-Rata Kunjungan (3.000 orang) dengan Tarif Kapitasi (Rp 5.000). Ini adalah kesalahan konsep umum; kapitasi tidak dihitung berdasarkan kunjungan, melainkan jumlah peserta terdaftar.' },
            ],
            quiz: [
                { question: "Apa dasar utama untuk menghitung dana kapitasi BPJS di sebuah Puskesmas?", options: ["Jumlah dokter yang bertugas", "Jumlah kunjungan pasien bulanan", "Jumlah peserta BPJS yang terdaftar", "Luas wilayah kerja Puskesmas"], answer: "Jumlah peserta BPJS yang terdaftar" },
                { question: "Dalam kasus ini, berapa tarif kapitasi per jiwa yang ditetapkan?", options: ["Rp 3.000", "Rp 20.000", "Rp 15.000", "Rp 5.000"], answer: "Rp 5.000" },
                { question: "Data 'rata-rata 3.000 orang berobat' digunakan untuk tujuan apa dalam perhitungan kapitasi?", options: ["Sebagai pengali utama", "Sebagai penambah dana", "Sebagai pengurang dana", "Tidak digunakan sama sekali"], answer: "Tidak digunakan sama sekali" },
                { question: "Manakah rumus yang benar untuk menghitung total anggaran kapitasi bulanan?", options: ["(Jumlah Kunjungan) x (Tarif Kapitasi)", "(Jumlah Peserta) x (Tarif Kapitasi)", "(Jumlah Peserta) + (Jumlah Kunjungan)", "(Jumlah Peserta) / (Tarif Kapitasi)"], answer: "(Jumlah Peserta) x (Tarif Kapitasi)" },
                { question: "Berdasarkan semua data, berapa total dana kapitasi yang diterima Puskesmas?", options: ["Rp 15.000.000", "Rp 100.000.000", "Rp 115.000.000", "Rp 20.000.000"], answer: "Rp 100.000.000" }
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
                        <h4 class="font-semibold text-slate-700">Analisis Perhitungan:</h4>
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
                    backgroundColor: diagnoses.map(d => d.matchScore >= 10 ? '#059669' : (d.matchScore >= 3 ? '#facc15' : '#ef4444')),
                    borderColor: diagnoses.map(d => d.matchScore >= 10 ? '#065f46' : (d.matchScore >= 3 ? '#eab308' : '#dc2626')),
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
                        x: { beginAtZero: true, max: 10, title: { display: true, text: 'Skor Kebenaran (0-10)', font: { size: 14 } } },
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
                // Set the initial view to the correct answer
                renderDetails('opsi-b');
            }
            createChart();
            loadQuiz();
        };