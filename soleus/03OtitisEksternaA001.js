        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'herpes-zoster', name: 'Herpes zoster otikus', matchScore: 7, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">🔥</div></div>`, description: 'Reaktivasi virus Varicella-Zoster (VZV) di ganglion genikulatum saraf fasialis (N. VII). Dikenal juga sebagai Ramsay Hunt Syndrome.', analysis: 'CUKUP SESUAI. Menjelaskan nyeri telinga (otalgia) dan paresis N.VII. Namun, tidak adanya laporan vesikel (lepuhan) di telinga dan adanya tanda infeksi bakteri yang jelas (edema kanalis, nyeri tekan) membuat diagnosis ini kurang mungkin dibandingkan Otitis Eksterna Maligna.' },
                { id: 'oem', name: 'Otitis eksterna maligna', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">💀</div></div>`, description: 'Infeksi invasif dan nekrotikans pada liang telinga luar yang menyebar ke dasar tengkorak.', analysis: 'SANGAT SESUAI. Ini adalah diagnosis klasik untuk pasien dengan riwayat DM yang mengalami otitis eksterna berat (edema, nyeri hebat) yang disertai komplikasi kelumpuhan saraf kranial (paresis N.VII). Etiologi tersering adalah Pseudomonas Sp.' },
                { id: 'oe-difus', name: 'Otitis eksterna difus', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">💧</div></div>`, description: 'Peradangan umum pada kulit liang telinga, sering disebut "swimmer\'s ear".', analysis: 'KURANG SESUAI. Meskipun menjelaskan gejala di telinga (edema, nyeri tekan/tarik), diagnosis ini tidak dapat menjelaskan adanya paresis N.VII. Paresis N.VII mengindikasikan proses penyakit yang jauh lebih parah dan invasif.' },
                { id: 'oe-sirkum', name: 'Otitis eksterna sirkumskripta', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">🎯</div></div>`, description: 'Infeksi terlokalisasi pada folikel rambut di liang telinga (furunkel/bisul).', analysis: 'TIDAK SESUAI. Ini adalah infeksi yang sangat terlokalisasi dan tidak menyebabkan kelumpuhan saraf wajah atau edema difus pada seluruh liang telinga.' },
                { id: 'omsk', name: 'Otitis media supuratif kronis', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-green-100"><div class="w-12 h-12 bg-green-300 rounded-full flex items-center justify-center text-3xl">👂</div></div>`, description: 'Infeksi kronis pada telinga tengah dengan perforasi membran timpani.', analysis: 'KURANG SESUAI. Gejala utama pasien (nyeri tekan tragus, nyeri tarik aurikula, edema kanalis) jelas menunjuk ke patologi di telinga LUAR, bukan telinga tengah. Paresis N.VII bisa menjadi komplikasi OMSK, tetapi gambaran utamanya tidak cocok.' }
            ],
            quiz: [
                { question: "Faktor risiko paling signifikan pada pasien ini yang mengarah ke diagnosis berat adalah...", options: ["Usia 47 tahun", "Jenis kelamin perempuan", "Riwayat Diabetes Mellitus", "Nyeri pada telinga"], answer: "Riwayat Diabetes Mellitus" },
                { question: "Temuan 'mulut mencong' atau paresis N.VII pada kasus infeksi telinga ini menandakan...", options: ["Infeksi sudah menyebar ke otak", "Infeksi telah menyebar ke dasar tengkorak", "Ini adalah reaksi alergi", "Pasien juga menderita stroke"], answer: "Infeksi telah menyebar ke dasar tengkorak" },
                { question: "Manakah dari temuan berikut yang paling spesifik untuk infeksi telinga LUAR?", options: ["Demam", "Mulut mencong", "Nyeri tekan pada tragus", "Riwayat DM"], answer: "Nyeri tekan pada tragus" },
                { question: "Bakteri apakah yang menjadi penyebab paling umum Otitis Eksterna Maligna?", options: ["Staphylococcus aureus", "Streptococcus pneumoniae", "Candida albicans", "Pseudomonas aeruginosa"], answer: "Pseudomonas aeruginosa" },
                { question: "Mengapa Otitis Eksterna Difus biasa bukan diagnosis yang tepat untuk kasus ini?", options: ["Karena disebabkan oleh jamur", "Karena tidak menyebabkan kelumpuhan saraf wajah", "Karena tidak menyebabkan nyeri", "Karena hanya terjadi pada anak-anak"], answer: "Karena tidak menyebabkan kelumpuhan saraf wajah" }
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
            // Urutan label dan data harus sesuai dengan urutan option di soal
            const orderedDiagnoses = [
                diagnoses.find(d => d.id === 'herpes-zoster'),
                diagnoses.find(d => d.id === 'oem'),
                diagnoses.find(d => d.id === 'oe-difus'),
                diagnoses.find(d => d.id === 'oe-sirkum'),
                diagnoses.find(d => d.id === 'omsk')
            ];
            const data = {
                labels: orderedDiagnoses.map(d => d.name),
                datasets: [{
                    label: 'Tingkat Kecocokan',
                    data: orderedDiagnoses.map(d => d.matchScore),
                    backgroundColor: orderedDiagnoses.map(d => d.matchScore >= 8 ? '#059669' : (d.matchScore >= 4 ? '#34d399' : '#f87171')),
                    borderColor: orderedDiagnoses.map(d => d.matchScore >= 8 ? '#065f46' : (d.matchScore >= 4 ? '#059669' : '#ef4444')),
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
            // Tampilkan diagnosis yang paling mungkin (Otitis Eksterna Maligna) secara default
            if (diagnoses.length > 0) {
                renderDetails('oem'); 
            }
            createChart();
            loadQuiz();
        };