      // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'obstruksi-distal', name: 'Obstruksi Ureter Distal', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-emerald-200"><div class="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center text-3xl">💎</div></div>`, description: 'Adanya sumbatan pada bagian bawah saluran ureter, dekat dengan kandung kemih.', analysis: 'SANGAT SESUAI. Pola nyeri yang menjalar dari lipat paha ke kemaluan (distribusi saraf genitofemoral) adalah ciri khas sumbatan di ureter distal. Hematuria (BAK kemerahan) juga sangat mendukung diagnosis ini, yang sering disebabkan oleh batu ureter.' },
                { id: 'obstruksi-proksimal', name: 'Obstruksi Ureter Proksimal', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-amber-100"><div class="w-12 h-12 bg-amber-300 rounded-full flex items-center justify-center text-3xl">⚠️</div></div>`, description: 'Adanya sumbatan pada bagian atas saluran ureter, dekat dengan ginjal.', analysis: 'KURANG SESUAI. Sumbatan di proksimal biasanya menyebabkan nyeri pinggang atau perut bagian atas (flank pain) dan nyeri ketok CVA yang positif. Pasien ini tidak memiliki nyeri ketok CVA dan lokasi nyerinya lebih ke bawah.' },
                { id: 'keganasan-buli', name: 'Keganasan Buli', matchScore: 5, vizIconHtml: `<div class="viz-icon bg-rose-100"><div class="w-12 h-12 bg-rose-300 rounded-full flex items-center justify-center text-3xl">🔬</div></div>`, description: 'Kanker atau tumor pada dinding kandung kemih (buli-buli).', analysis: 'MUNGKIN, TAPI KURANG KHAS. Meskipun keganasan buli dapat menyebabkan hematuria, gejala nyeri kolik yang menjalar seperti ini kurang umum. Nyeri pada keganasan buli biasanya bersifat suprapubik atau terkait iritasi saat berkemih.' },
                { id: 'infeksi-ginjal', name: 'Infeksi Ginjal (Pyelonefritis)', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">🤒</div></div>`, description: 'Infeksi pada jaringan ginjal dan pelvis renalis.', analysis: 'SANGAT TIDAK SESUAI. Pyelonefritis hampir selalu disertai demam, menggigil, dan nyeri ketok CVA yang positif. Pasien ini tidak memiliki gejala sistemik infeksi dan nyeri ketok CVA-nya negatif.' },
                { id: 'deposit-imun', name: 'Deposit Kompleks Imun', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-indigo-100"><div class="w-12 h-12 bg-indigo-300 rounded-full flex items-center justify-center text-3xl">🧬</div></div>`, description: 'Kondisi seperti glomerulonefritis dimana kompleks imun merusak ginjal.', analysis: 'TIDAK SESUAI. Ini adalah penyakit pada level mikroskopis (glomerulus) ginjal. Gejalanya bisa berupa hematuria dan hipertensi, tetapi tidak menyebabkan nyeri kolik obstruktif seperti yang dialami pasien.' }
            ],
            quiz: [
                { question: "Berdasarkan lokasi dan penjalaran nyerinya, bagian manakah dari saluran kemih yang paling mungkin mengalami masalah?", options: ["Uretra", "Kandung kemih", "Ureter bagian proksimal", "Ureter bagian distal"], answer: "Ureter bagian distal" },
                { question: "Temuan 'nyeri ketok CVA (-/-)' pada pemeriksaan fisik berguna untuk menyingkirkan diagnosis...", options: ["Batu kandung kemih", "Infeksi Ginjal (Pyelonefritis)", "Kanker prostat", "Infeksi saluran kemih bawah"], answer: "Infeksi Ginjal (Pyelonefritis)" },
                { question: "Manakah gejala pasien yang paling spesifik menunjukkan adanya masalah di dalam saluran kemih (urinary tract)?", options: ["Tekanan darah 140/90 mmHg", "Nyeri lipat paha", "BAK berwarna kemerahan", "Usia 54 tahun"], answer: "BAK berwarna kemerahan" },
                { question: "Mengapa 'Infeksi Ginjal' menjadi diagnosis yang sangat tidak mungkin pada kasus ini?", options: ["Karena tekanan darahnya tinggi", "Karena pasien tidak demam dan tidak ada nyeri ketok CVA", "Karena nyerinya sudah berlangsung 1 bulan", "Karena pasien adalah seorang laki-laki"], answer: "Karena pasien tidak demam dan tidak ada nyeri ketok CVA" },
                { question: "Dengan mempertimbangkan semua data, apa penyebab paling umum untuk 'Obstruksi Ureter Distal' pada pasien ini?", options: ["Penyempitan karena infeksi", "Tumor dari luar menekan ureter", "Batu saluran kemih (Urolitiasis)", "Gumpalan darah"], answer: "Batu saluran kemih (Urolitiasis)" }
            ]
        };

        const diagnoses = caseData.diagnoses.sort((a, b) => a.name.localeCompare(b.name));
        const { quiz: quizData } = caseData;
        
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
            const sortedDiagnoses = [...diagnoses].sort((a,b) => b.matchScore - a.matchScore);
            const data = {
                labels: sortedDiagnoses.map(d => d.name),
                datasets: [{
                    label: 'Tingkat Kecocokan',
                    data: sortedDiagnoses.map(d => d.matchScore),
                    backgroundColor: sortedDiagnoses.map(d => d.matchScore >= 8 ? '#059669' : (d.matchScore >= 4 ? '#34d399' : '#a7f3d0')),
                    borderColor: sortedDiagnoses.map(d => d.matchScore >= 8 ? '#065f46' : (d.matchScore >= 4 ? '#059669' : '#6ee7b7')),
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
                renderDetails('obstruksi-distal'); // Default to the most likely diagnosis
            }
            createChart();
            loadQuiz();
        };