        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'migraine-sumatriptan', name: 'Migrain; Sumatriptan', matchScore: 9.5, vizIconHtml: `<div class="viz-icon bg-purple-200"><div class="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center text-3xl">🎯</div></div>`, description: 'Nyeri kepala primer episodik yang seringkali unilateral, berdenyut, dan dapat disertai aura. Sumatriptan adalah terapi abortif spesifik.', analysis: 'SANGAT SESUAI. Gejala nyeri kepala unilateral (kanan), berdenyut, dan adanya aura visual (garis hitam putih) adalah gambaran klasik migrain dengan aura. Sumatriptan adalah pilihan terapi abortif lini pertama yang tepat.' },
                { id: 'migraine-amitriptilin', name: 'Migrain; Amitriptilin', matchScore: 6, vizIconHtml: `<div class="viz-icon bg-purple-100"><div class="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center text-3xl">💊</div></div>`, description: 'Diagnosis migrain benar, namun Amitriptilin adalah obat untuk pencegahan (profilaksis), bukan untuk menghentikan serangan akut.', analysis: 'DIAGNOSIS TEPAT, TERAPI KURANG TEPAT. Diagnosis migrain sudah benar. Namun, Amitriptilin digunakan untuk terapi profilaksis (pencegahan jangka panjang), bukan terapi abortif (menghentikan serangan saat itu juga). Pertanyaan meminta terapi abortif.' },
                { id: 'tth-parasetamol', name: 'TTH; Parasetamol', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">🤕</div></div>`, description: 'Nyeri kepala tipe tegang (Tension-Type Headache) biasanya bilateral, menekan (tidak berdenyut), dan tidak disertai aura.', analysis: 'KURANG SESUAI. Karakter nyeri pada kasus ini (unilateral, berdenyut) dan adanya aura visual tidak sesuai dengan gambaran khas TTH.' },
                { id: 'tth-ibuprofen', name: 'TTH; Ibuprofen', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">🤕</div></div>`, description: 'Sama seperti TTH dengan Parasetamol, diagnosis TTH tidak cocok dengan gejala klinis pasien.', analysis: 'KURANG SESUAI. Gejala unilateral, berdenyut, dan adanya aura visual tidak mendukung diagnosis TTH, meskipun Ibuprofen bisa digunakan untuk nyeri kepala.' },
                { id: 'cluster-oksigen', name: 'Cluster Headache; Oksigen', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">🤯</div></div>`, description: 'Nyeri kepala hebat, unilateral di area mata, disertai gejala otonom (mata merah/berair, hidung tersumbat).', analysis: 'TIDAK SESUAI. Pasien tidak memiliki gejala otonom seperti mata berair atau hidung tersumbat. Sifat nyeri juga berdenyut, bukan menusuk hebat seperti pada cluster headache.' }
            ],
            quiz: [
                { question: "Gejala manakah yang paling khas menunjuk ke diagnosis 'Migrain dengan Aura' pada kasus ini?", options: ["Nyeri kepala 3 bulan", "Dipicu oleh stres", "Melihat garis-garis hitam putih", "Nyeri berlangsung 30 menit"], answer: "Melihat garis-garis hitam putih" },
                { question: "Mengapa 'Tension-Type Headache' bukan merupakan diagnosis yang tepat?", options: ["Karena nyeri hilang timbul", "Karena pasien adalah seorang guru", "Karena nyeri bersifat berdenyut dan satu sisi", "Karena tidak ada demam"], answer: "Karena nyeri bersifat berdenyut dan satu sisi" },
                { question: "Apa peran Sumatriptan dalam penatalaksanaan migrain?", options: ["Sebagai terapi pencegahan (profilaksis)", "Sebagai vitamin neurotropik", "Sebagai pereda nyeri non-spesifik", "Sebagai terapi abortif (menghentikan serangan)"], answer: "Sebagai terapi abortif (menghentikan serangan)" },
                { question: "Jika dokter ingin memberikan terapi pencegahan karena serangan sering terjadi, obat manakah dari pilihan yang mungkin diresepkan?", options: ["Sumatriptan", "Parasetamol", "Amitriptilin", "Oksigen 100%"], answer: "Amitriptilin" },
                { question: "Berdasarkan keseluruhan data, diagnosis dan terapi abortif yang paling tepat adalah...", options: ["TTH; Parasetamol", "Migrain; Sumatriptan", "Cluster Headache; Oksigen 100%", "Migrain; Amitriptilin"], answer: "Migrain; Sumatriptan" }
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
            // Urutkan data dari skor tertinggi ke terendah untuk visualisasi yang lebih baik
            const sortedDiagnoses = [...diagnoses].sort((a, b) => b.matchScore - a.matchScore);
            const data = {
                labels: sortedDiagnoses.map(d => d.name),
                datasets: [{
                    label: 'Tingkat Kecocokan',
                    data: sortedDiagnoses.map(d => d.matchScore),
                    backgroundColor: sortedDiagnoses.map(d => {
                        if (d.matchScore >= 8) return '#10b981'; // emerald-500
                        if (d.matchScore >= 5) return '#f59e0b'; // amber-500
                        return '#ef4444'; // red-500
                    }),
                    borderColor: sortedDiagnoses.map(d => {
                        if (d.matchScore >= 8) return '#059669'; // emerald-700
                        if (d.matchScore >= 5) return '#d97706'; // amber-600
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
                renderDetails(diagnoses[0].id);
            }
            createChart();
            loadQuiz();
        };