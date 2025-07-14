        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'midazolam', name: 'Midazolam 5 mg IM', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-emerald-200"><div class="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center text-3xl">💉</div></div>`, description: 'Benzodiazepin kerja cepat untuk sedasi.', analysis: '<strong>SANGAT TEPAT.</strong> Pilihan ini secara cepat dan aman mengontrol agitasi dan agresi pasien (rapid tranquilization), yang merupakan prioritas utama. Dosis dan rute pemberian (IM) sesuai untuk pasien yang tidak kooperatif, sehingga menstabilkan situasi untuk penanganan lebih lanjut.' },
                { id: 'haloperidol', name: 'Haloperidol 100 mg IM', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">🚫</div></div>`, description: 'Antipsikotik generasi pertama.', analysis: '<strong>SANGAT TIDAK TEPAT.</strong> Meskipun Haloperidol adalah kelas obat yang benar untuk psikosis, dosis 100 mg IM untuk sekali pemberian adalah dosis yang sangat berlebihan dan berbahaya. Dosis lazim untuk agitasi akut adalah 5-10 mg. Risiko efek samping berat (misal: Sindrom Neuroleptik Maligna) sangat tinggi.' },
                { id: 'diazepam', name: 'Diazepam 500 mg PO', matchScore: 0, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">☠️</div></div>`, description: 'Benzodiazepin per oral.', analysis: '<strong>SANGAT TIDAK TEPAT.</strong> Dosis 500 mg sangat toksik dan berpotensi letal (menyebabkan henti napas). Selain itu, pemberian obat per oral (PO) tidak efektif pada pasien yang agitasi, agresif, dan tidak kooperatif.' },
                { id: 'fluoxetine', name: 'Fluoxetin 100 mg PO', matchScore: 0, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">⏳</div></div>`, description: 'Antidepresan (SSRI).', analysis: '<strong>TIDAK TEPAT.</strong> Fluoxetine adalah antidepresan yang tidak memiliki efek sedasi cepat dan tidak diindikasikan untuk penanganan psikosis akut atau agitasi. Efek terapeutiknya baru muncul setelah beberapa minggu penggunaan rutin.' },
                { id: 'methylphenidate', name: 'Metilfenidat', matchScore: 0, vizIconHtml: `<div class="viz-icon bg-purple-200"><div class="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center text-3xl">🔥</div></div>`, description: 'Psikostimulan.', analysis: '<strong>KONTRAINDIKASI.</strong> Metilfenidat adalah stimulan yang digunakan untuk ADHD. Pemberiannya pada pasien psikotik akan memperburuk gejala waham, halusinasi, dan agitasi secara signifikan.' }
            ],
            quiz: [
                { question: "Kondisi pasien di IGD yang memerlukan penanganan paling segera adalah...", options: ["Waham kebesaran", "Agitasi dan perilaku agresif", "Halusinasi auditorik", "Riwayat perilaku aneh"], answer: "Agitasi dan perilaku agresif" },
                { question: "Apa gejala psikotik yang paling mungkin menjadi pemicu langsung perilaku agresif pasien terhadap tetangganya?", options: ["Waham kebesaran", "Halusinasi visual", "Waham kejar (persekutorik)", "Disorganisasi bicara"], answer: "Waham kejar (persekutorik)" },
                { question: "Mengapa pemberian obat per oral (PO) bukan pilihan pertama pada kasus ini?", options: ["Karena obatnya lebih mahal", "Karena onset kerja obat PO lebih cepat", "Karena pasien tidak kooperatif dan agresif", "Karena tidak ada sediaan obat PO"], answer: "Karena pasien tidak kooperatif dan agresif" },
                { question: "Alasan utama dosis Haloperidol 100 mg IM dianggap tidak tepat adalah...", options: ["Dosis terlalu rendah", "Dosis terlalu tinggi dan berisiko fatal", "Obatnya tidak asli", "Interaksi dengan makanan"], answer: "Dosis terlalu tinggi dan berisiko fatal" },
                { question: "Tujuan utama pemberian Midazolam 5 mg IM pada pasien ini adalah...", options: ["Mengobati skizofrenia secara tuntas", "Untuk menenangkan pasien dengan cepat (sedasi)", "Menghilangkan waham secara permanen", "Sebagai antidepresan"], answer: "Untuk menenangkan pasien dengan cepat (sedasi)" }
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
                    backgroundColor: diagnoses.map(d => d.matchScore >= 8 ? '#059669' : (d.matchScore >= 1 ? '#f87171' : '#ef4444')),
                    borderColor: diagnoses.map(d => d.matchScore >= 8 ? '#065f46' : (d.matchScore >= 1 ? '#b91c1c' : '#991b1b')),
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
            const navButtons = document.querySelectorAll('#diagnosis-nav button');
            if (navButtons.length > 0) {
                 navButtons.forEach(btn => btn.classList.add('nav-button-inactive'));
            }
            
            createChart();
            loadQuiz();
        };