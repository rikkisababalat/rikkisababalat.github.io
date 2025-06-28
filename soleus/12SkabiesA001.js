        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'permetrin-5', name: 'Permetrin 5%', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-emerald-200"><div class="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center text-3xl">🥇</div></div>`, description: 'Krim topikal antiskabies.', analysis: 'SANGAT TEPAT. Merupakan terapi lini pertama (gold standard) untuk skabies karena efektivitasnya yang tinggi (98%) dan keamanannya. Dosis 5% adalah standar. Pengulangan setelah 1 minggu diperlukan untuk eradikasi sempurna.' },
                { id: 'permetrin-10', name: 'Permetrin 10%', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">浓度</div></div>`, description: 'Krim topikal dengan konsentrasi lebih tinggi.', analysis: 'TIDAK TEPAT. Konsentrasi standar untuk skabies adalah 5%. Peningkatan konsentrasi menjadi 10% tidak terbukti lebih efektif dan hanya akan meningkatkan risiko iritasi kulit tanpa manfaat tambahan.' },
                { id: 'lindane-5', name: 'Lindane 5%', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">⚠️</div></div>`, description: 'Obat topikal organoklorin.', analysis: 'KURANG TEPAT. Lindane (biasanya 1%) adalah terapi lini kedua yang sudah jarang digunakan karena berpotensi toksik pada sistem saraf (neurotoksik), terutama pada anak-anak. Risiko melebihi manfaat jika ada alternatif yang lebih aman seperti Permetrin.' },
                { id: 'benzil-benzoat-10', name: 'Emulsi Benzil Benzoat 10%', matchScore: 6, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">🥈</div></div>`, description: 'Emulsi topikal alternatif.', analysis: 'CUKUP TEPAT. Merupakan terapi alternatif yang efektif, namun tingkat iritasi kulitnya lebih tinggi dibandingkan Permetrin. Dianggap sebagai lini kedua jika Permetrin tidak tersedia atau kontraindikasi.' },
                { id: 'sulfur-25', name: 'Sulfur Presipitatum 25%', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-stone-200"><div class="w-12 h-12 bg-stone-400 rounded-full flex items-center justify-center text-3xl">🧼</div></div>`, description: 'Salep dengan kandungan sulfur tinggi.', analysis: 'SANGAT TIDAK TEPAT. Konsentrasi sulfur untuk skabies biasanya 6-10%. Konsentrasi 25% sangat tinggi dan iritatif. Meskipun aman, sulfur kurang efektif, berbau, mengotori pakaian, dan memerlukan aplikasi berulang selama 3 malam.' }
            ],
            quiz: [
                { question: "Apa temuan pemeriksaan fisik yang paling spesifik (patognomonik) untuk skabies?", options: ["Papul kemerahan", "Rasa gatal di malam hari", "Kanalikuli (terowongan)", "Riwayat kontak erat"], answer: "Kanalikuli (terowongan)" },
                { question: "Mengapa gatal pada skabies terasa lebih hebat pada malam hari?", options: ["Suhu lebih dingin", "Aktivitas tungau meningkat", "Alergi terhadap sprei", "Pasien lebih banyak berkeringat"], answer: "Aktivitas tungau meningkat" },
                { question: "Selain pasien, siapa lagi yang wajib diobati secara bersamaan?", options: ["Hanya teman yang menginap", "Hanya yang menunjukkan gejala gatal", "Semua anggota keluarga & kontak erat", "Tidak ada, cukup pasien saja"], answer: "Semua anggota keluarga & kontak erat" },
                { question: "Apa tujuan utama mengulang pengobatan Permetrin 5% setelah satu minggu?", options: ["Untuk membunuh tungau dewasa yang tersisa", "Untuk membunuh telur tungau", "Untuk membunuh tungau yang baru menetas dari telur", "Untuk mencegah reaksi alergi"], answer: "Untuk membunuh tungau yang baru menetas dari telur" },
                { question: "Manakah yang merupakan terapi lini pertama (gold standard) untuk skabies?", options: ["Sulfur 10%", "Lindane 1%", "Benzil Benzoat 25%", "Permetrin 5%"], answer: "Permetrin 5%" }
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
                        <h4 class="font-semibold text-slate-700">Analisis Ketepatan Terapi:</h4>
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
                    label: 'Tingkat Ketepatan',
                    data: diagnoses.map(d => d.matchScore),
                    backgroundColor: diagnoses.map(d => d.matchScore >= 9 ? '#059669' : (d.matchScore >= 5 ? '#f59e0b' : '#ef4444')),
                    borderColor: diagnoses.map(d => d.matchScore >= 9 ? '#065f46' : (d.matchScore >= 5 ? '#b45309' : '#b91c1c')),
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
                        x: { beginAtZero: true, max: 10, title: { display: true, text: 'Skor Ketepatan (0-10)', font: { size: 14 } } },
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