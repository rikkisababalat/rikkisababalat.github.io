        // Data untuk halaman kasus Hepatitis A
        const caseData = {
            diagnoses: [
                { id: 'fecal-oral', name: 'Fecal-Oral', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-green-200"><div class="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-3xl">🍔</div></div>`, description: 'Penularan virus melalui mulut dari makanan atau minuman yang terkontaminasi feses orang terinfeksi.', analysis: 'SANGAT SESUAI. Diagnosis Hepatitis A, yang dikonfirmasi oleh hasil IgM anti-HAV positif, secara eksklusif ditularkan melalui jalur ini. Ini adalah jawaban yang benar.' },
                { id: 'darah', name: 'Darah', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">🩸</div></div>`, description: 'Penularan melalui kontak langsung dengan darah yang terinfeksi.', analysis: 'TIDAK SESUAI. Penularan melalui darah adalah karakteristik utama Hepatitis B dan C, bukan Hepatitis A. Meskipun secara teoritis mungkin, ini sangat jarang terjadi dan bukan mode penularan utama.' },
                { id: 'semen', name: 'Semen', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-pink-100"><div class="w-12 h-12 bg-pink-300 rounded-full flex items-center justify-center text-3xl">🚻</div></div>`, description: 'Penularan melalui kontak seksual atau cairan mani.', analysis: 'TIDAK SESUAI. Seperti penularan darah, ini adalah jalur penularan untuk Hepatitis B dan C. Hepatitis A tidak dianggap sebagai penyakit menular seksual.' },
                { id: 'urin', name: 'Urin', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">💧</div></div>`, description: 'Penularan melalui kontak dengan urin orang yang terinfeksi.', analysis: 'KURANG SESUAI. Meskipun urin pasien menjadi gelap karena bilirubin, virus Hepatitis A terutama dikeluarkan melalui feses, bukan urin. Urin bukan jalur penularan yang signifikan.' },
                { id: 'ko-infeksi-b', name: 'Ko-infeksi Hepatitis B', matchScore: 0, vizIconHtml: `<div class="viz-icon bg-slate-200"><div class="w-12 h-12 bg-slate-400 rounded-full flex items-center justify-center text-3xl">➕</div></div>`, description: 'Terinfeksi Hepatitis A dan B secara bersamaan.', analysis: 'BUKAN POLA PENULARAN. Ini adalah sebuah kondisi klinis, bukan cara virus menyebar. Kasus ini hanya menunjukkan infeksi Hepatitis A.' }
            ],
            quiz: [
                { question: "Apa temuan laboratorium yang paling penting untuk mendiagnosis kasus ini?", options: ["Peningkatan enzim hati", "Hepatomegali", "Urin gelap", "IgM anti-HAV (+)"], answer: "IgM anti-HAV (+)" },
                { question: "Gejala 'urin berwarna gelap seperti teh' pada pasien hepatitis disebabkan oleh?", options: ["Dehidrasi parah", "Peningkatan kadar bilirubin dalam darah", "Efek samping obat demam", "Infeksi saluran kemih"], answer: "Peningkatan kadar bilirubin dalam darah" },
                { question: "Pola penularan fecal-oral paling sering terjadi melalui?", options: ["Transfusi darah", "Berbagi jarum suntik", "Makanan atau air yang terkontaminasi", "Hubungan seksual"], answer: "Makanan atau air yang terkontaminasi" },
                { question: "Mengapa penularan melalui darah bukan jawaban yang tepat untuk Hepatitis A?", options: ["Karena Hepatitis A tidak pernah ada di dalam darah", "Karena penularan darah hanya untuk HIV", "Hepatitis A sangat jarang menular melalui darah; ini ciri Hepatitis B/C", "Karena virusnya mati jika terkena udara"], answer: "Hepatitis A sangat jarang menular melalui darah; ini ciri Hepatitis B/C" },
                { question: "Berdasarkan diagnosis, apa saran pencegahan utama yang paling efektif?", options: ["Vaksinasi Hepatitis B", "Menggunakan kondom", "Menjaga kebersihan tangan dan makanan", "Menghindari gigitan nyamuk"], answer: "Menjaga kebersihan tangan dan makanan" }
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
                    backgroundColor: diagnoses.map(d => d.matchScore >= 8 ? '#059669' : (d.matchScore >= 2 ? '#a7f3d0' : '#fca5a5')),
                    borderColor: diagnoses.map(d => d.matchScore >= 8 ? '#065f46' : (d.matchScore >= 2 ? '#6ee7b7' : '#ef4444')),
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
