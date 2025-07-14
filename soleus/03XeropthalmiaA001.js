        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'ulkus-xia', name: 'Ulkus kornea, XIA', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">⚠️</div></div>`, description: 'Kerusakan pada kornea (ulkus) dengan adanya xerosis konjungtiva (XIA).', analysis: 'TIDAK SESUAI. Pemeriksaan tidak menemukan adanya ulkus atau kerusakan pada kornea. Selain itu, stadium XIA (xerosis konjungtiva saja) adalah stadium yang lebih ringan dari temuan pada pasien.' },
                { id: 'keratomalacia-xib', name: 'Keratomalacia, XIB', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-orange-200"><div class="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center text-3xl">❗️</div></div>`, description: 'Pelunakan dan kehancuran kornea (keratomalacia) disertai Bercak Bitot (XIB).', analysis: 'TIDAK SESUAI. Keratomalacia adalah stadium yang jauh lebih berat (X3) dan tidak ditemukan pada pasien ini. Meskipun Bercak Bitot (X1B) ada, ini bukan tanda terberat.' },
                { id: 'xerophthalmia-x2', name: 'Xerophthalmia, X2', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-emerald-200"><div class="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center text-3xl">🎯</div></div>`, description: 'Kelainan mata akibat defisiensi Vitamin A, dengan tanda terberat berupa kekeringan pada kornea (Xerosis Kornea).', analysis: 'SANGAT SESUAI. Diagnosis mencakup seluruh gambaran klinis: rabun senja, xerosis konjungtiva, Bercak Bitot, dan temuan terberat yaitu kornea kering (X2). Riwayat sulit makan mendukung diagnosis.' },
                { id: 'ulkus-x3a', name: 'Ulkus kornea, X3A', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-300"><div class="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-3xl">🚨</div></div>`, description: 'Ulkus atau keratomalacia yang menutupi kurang dari 1/3 permukaan kornea.', analysis: 'SANGAT TIDAK SESUAI. Tidak ada laporan ulkus atau keratomalacia pada pemeriksaan fisik pasien.' },
                { id: 'xerophthalmia-xn', name: 'Xerophthalmia, XN', matchScore: 6, vizIconHtml: `<div class="viz-icon bg-blue-200"><div class="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-3xl">🌙</div></div>`, description: 'Stadium paling awal Xerophthalmia yang ditandai dengan rabun senja (Night blindness) saja.', analysis: 'KURANG TEPAT. Meskipun pasien mengalami rabun senja (XN), terdapat tanda lain yang lebih parah (X1A, X1B, dan X2). Staging selalu didasarkan pada tanda terberat yang ditemukan, yaitu X2.' }
            ],
            quiz: [
                { question: "Apa gejala awal yang dikeluhkan ibu pasien, yang merupakan tanda khas defisiensi vitamin A?", options: ["Mata merah", "Mata berair", "Sering menabrak saat senja", "Penglihatan kabur sepanjang hari"], answer: "Sering menabrak saat senja" },
                { question: "Temuan 'bercak putih seperti sabun' pada sklera pasien disebut?", options: ["Pinguecula", "Pterygium", "Ulkus Mooren", "Bercak Bitot"], answer: "Bercak Bitot" },
                { question: "Staging Xerophthalmia menurut WHO didasarkan pada?", options: ["Lamanya keluhan", "Hasil tes darah", "Tanda klinis terberat yang ditemukan", "Usia pasien"], answer: "Tanda klinis terberat yang ditemukan" },
                { question: "Mengapa visus (ketajaman penglihatan) pasien 6/6 pada pemeriksaan di puskesmas?", options: ["Karena pemeriksaannya salah", "Karena defisiensi vitamin A tidak mempengaruhi mata", "Karena kerusakan belum mengenai pusat penglihatan (makula)", "Karena penyakitnya sudah sembuh"], answer: "Karena kerusakan belum mengenai pusat penglihatan (makula)" },
                { question: "Berdasarkan semua gejala dan temuan, diagnosis dan stadium apakah yang paling akurat?", options: ["Keratomalacia, XIB", "Xerophthalmia, X2", "Xerophthalmia, XN", "Ulkus Kornea, X3A"], answer: "Xerophthalmia, X2" }
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
                    backgroundColor: diagnoses.map(d => d.matchScore >= 8 ? '#059669' : (d.matchScore >= 4 ? '#34d399' : '#a7f3d0')),
                    borderColor: diagnoses.map(d => d.matchScore >= 8 ? '#065f46' : (d.matchScore >= 4 ? '#059669' : '#6ee7b7')),
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
            const navButtons = document.querySelectorAll('#diagnosis-nav button');
            if (navButtons.length > 0) {
                 navButtons.forEach(btn => btn.classList.add('nav-button-inactive'));
            }
            
            createChart();
            loadQuiz();
        };