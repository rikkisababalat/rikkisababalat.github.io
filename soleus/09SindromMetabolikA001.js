        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'sindrom-x', name: 'Sindrom Metabolik', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-orange-200"><div class="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center text-3xl">🧩</div></div>`, description: 'Sekelompok kondisi (hipertensi, gula darah tinggi, lemak tubuh berlebih di pinggang, dan kadar kolesterol abnormal) yang terjadi bersamaan.', analysis: 'SANGAT SESUAI. Diagnosis ini paling komprehensif. Pasien memenuhi semua 5 kriteria: obesitas sentral (lingkar pinggang 112 cm), hipertensi (150/90 mmHg), trigliserida tinggi (310 mg/dL), HDL rendah (28 mg/dL), dan glukosa puasa terganggu (122 mg/dL).' },
                { id: 'dm-tipe-2', name: 'DM Tipe II', matchScore: 7, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">🩸</div></div>`, description: 'Gangguan metabolik yang ditandai dengan kadar gula darah tinggi dalam jangka waktu yang lama.', analysis: 'CUKUP SESUAI. GDS 240 mg/dL sangat mendukung. Namun, GDP 122 mg/dL masih dalam rentang prediabetes. Meskipun sangat mungkin, diagnosis ini hanya mencakup aspek glukosa dan tidak menjelaskan masalah lipid dan tekanan darah secara langsung.' },
                { id: 'dislipidemia', name: 'Dislipidemia', matchScore: 6, vizIconHtml: `<div class="viz-icon bg-yellow-200"><div class="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-3xl">🍔</div></div>`, description: 'Kelainan metabolisme lipid yang ditandai oleh kelainan fraksi lipid dalam plasma.', analysis: 'SESUAI, TAPI TIDAK LENGKAP. Pasien jelas memiliki dislipidemia (kolesterol, trigliserida, HDL abnormal), tetapi ini hanyalah salah satu komponen dari masalah kesehatan pasien yang lebih besar.' },
                { id: 'obesitas-sentral', name: 'Obesitas Sentral', matchScore: 5, vizIconHtml: `<div class="viz-icon bg-blue-200"><div class="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-3xl">📏</div></div>`, description: 'Akumulasi lemak berlebih di daerah perut atau abdominal.', analysis: 'SESUAI, TAPI TIDAK LENGKAP. Lingkar pinggang 112 cm memenuhi kriteria. Obesitas sentral adalah pemicu utama, tetapi bukan diagnosis yang mencakup semua temuan laboratorium dan klinis lainnya.' },
                { id: 'hipertensi-s2', name: 'Hipertensi Stage II', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-purple-200"><div class="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center text-3xl">🩺</div></div>`, description: 'Tekanan darah sistolik ≥160 mmHg atau diastolik ≥100 mmHg (JNC-VII).', analysis: 'TIDAK SESUAI. Tekanan darah pasien (150/90 mmHg) masuk dalam kategori Hipertensi Stage 1 menurut JNC-VII, bukan Stage 2. Pilihan ini secara teknis salah.' }
            ],
            quiz: [
                { question: "Temuan manakah yang paling akurat menggambarkan klasifikasi Indeks Massa Tubuh (IMT) pasien ini?", options: ["Normal", "Overweight (Kelebihan Berat Badan)", "Obesitas Kelas I", "Obesitas Kelas II"], answer: "Obesitas Kelas I" },
                { question: "Berdasarkan pedoman JNC-VII, tekanan darah pasien 150/90 mmHg diklasifikasikan sebagai...", options: ["Normal", "Prehipertensi", "Hipertensi Stage 1", "Hipertensi Stage 2"], answer: "Hipertensi Stage 1" },
                { question: "Dari profil lipid pasien, temuan mana yang memenuhi kriteria Sindrom Metabolik?", options: ["Kolesterol total 250 mg/dL", "Trigliserida 310 mg/dL dan HDL 28 mg/dL", "Hanya HDL yang rendah", "Hanya Trigliserida yang tinggi"], answer: "Trigliserida 310 mg/dL dan HDL 28 mg/dL" },
                { question: "Mengapa 'Hipertensi Stage II' menjadi diagnosis yang tidak tepat untuk kasus ini?", options: ["Karena tekanan darahnya normal", "Karena umurnya masih 51 tahun", "Karena tekanan darahnya tidak mencapai ambang batas ≥160/100 mmHg", "Karena pasien tidak memiliki gejala"], answer: "Karena tekanan darahnya tidak mencapai ambang batas ≥160/100 mmHg" },
                { question: "Diagnosis apakah yang paling komprehensif untuk merangkum semua temuan abnormal pada pasien?", options: ["Dislipidemia Campuran", "Obesitas dengan Komplikasi", "Diabetes Melitus Tipe 2", "Sindrom Metabolik"], answer: "Sindrom Metabolik" }
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
                    backgroundColor: ['#059669', '#34d399', '#6ee7b7', '#a7f3d0', '#fca5a5'],
                    borderColor: ['#065f46', '#059669', '#047857', '#064e3b', '#b91c1c'],
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