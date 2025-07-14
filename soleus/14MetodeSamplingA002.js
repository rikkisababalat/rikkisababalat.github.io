        // Data untuk kasus teknik sampling telah diganti di sini
        const caseData = {
            diagnoses: [
                { id: 'snowball', name: 'Snowball Sampling', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-blue-200"><div class="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-3xl">❄️</div></div>`, description: 'Teknik sampling non-probabilitas di mana subjek yang ada merekrut subjek masa depan dari antara kenalan mereka.', analysis: 'SANGAT SESUAI. Skenario ini secara eksplisit menggambarkan proses di mana satu subjek membantu peneliti menemukan subjek lain. Ini adalah aplikasi klasik dari snowball sampling, yang ideal untuk populasi langka dan sulit dijangkau.' },
                { id: 'simple-random', name: 'Simple Random Sampling', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">🎲</div></div>`, description: 'Setiap anggota populasi memiliki kesempatan yang sama persis untuk dipilih.', analysis: 'TIDAK SESUAI. Teknik ini membutuhkan daftar lengkap (kerangka sampel) dari semua individu dalam populasi. Dalam kasus penyakit langka, daftar seperti itu hampir tidak mungkin ada.' },
                { id: 'cluster', name: 'Cluster Sampling', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-green-100"><div class="w-12 h-12 bg-green-300 rounded-full flex items-center justify-center text-3xl">🏘️</div></div>`, description: 'Populasi dibagi menjadi beberapa kelompok (cluster), dan kemudian sampel acak dari cluster dipilih.', analysis: 'TIDAK SESUAI. Meskipun kepulauan bisa dianggap cluster, peneliti tidak memilih pulau secara acak dan menyurvei semua orang di dalamnya. Sebaliknya, ia mencari individu spesifik melalui rujukan.' },
                { id: 'systematic', name: 'Systematic Sampling', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-purple-100"><div class="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center text-3xl">🔢</div></div>`, description: 'Memilih anggota sampel dari daftar populasi pada interval yang teratur dan telah ditentukan.', analysis: 'TIDAK SESUAI. Sama seperti simple random sampling, teknik ini juga memerlukan daftar lengkap populasi untuk dapat memilih sampel pada interval ke-n, yang tidak tersedia dalam kasus ini.' },
                { id: 'stratified', name: 'Stratified Sampling', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">📊</div></div>`, description: 'Membagi populasi menjadi subkelompok (strata) dan mengambil sampel acak dari setiap strata.', analysis: 'TIDAK SESUAI. Teknik ini memerlukan pengetahuan rinci tentang strata populasi (misalnya, jumlah penderita per pulau) dan kerangka sampel dalam setiap strata, yang tidak dimiliki oleh peneliti.' }
            ],
            quiz: [
                { question: "Berdasarkan ilustrasi, teknik sampling apakah yang paling sesuai?", options: ["Simple Random Sampling", "Cluster Sampling", "Systematic Sampling", "Snowball Sampling"], answer: "Snowball Sampling" },
                { question: "Kapan Snowball Sampling menjadi metode yang paling berguna?", options: ["Ketika populasi sangat besar", "Ketika populasi sulit dijangkau atau tersembunyi", "Ketika peneliti ingin hasil yang bebas bias", "Ketika peneliti punya daftar lengkap populasi"], answer: "Ketika populasi sulit dijangkau atau tersembunyi" },
                { question: "Apa kelemahan utama dari Snowball Sampling?", options: ["Membutuhkan waktu yang sangat lama", "Sangat mahal untuk diimplementasikan", "Potensi bias karena sampel tidak acak", "Sulit untuk dianalisis secara statistik"], answer: "Potensi bias karena sampel tidak acak" },
                { question: "Teknik sampling probabilitas (seperti random, stratified, cluster) semuanya membutuhkan satu hal penting yang tidak ada dalam kasus ini. Apa itu?", options: ["Izin dari kepala desa", "Dana penelitian yang besar", "Kerangka sampel (daftar populasi)", "Tim peneliti yang banyak"], answer: "Kerangka sampel (daftar populasi)" },
                { question: "Apa karakteristik kunci yang mendefinisikan metode yang digunakan dokter dalam kasus tersebut?", options: ["Memilih subjek secara acak dari peta", "Membagi populasi menjadi beberapa kelompok", "Meminta rujukan dari partisipan yang sudah ada", "Memilih setiap orang ke-10 yang ditemui"], answer: "Meminta rujukan dari partisipan yang sudah ada" }
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