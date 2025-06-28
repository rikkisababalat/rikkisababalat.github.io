        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'pirimetamin', name: 'Pirimetamin', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl font-bold text-white">X</div></div>`, description: 'Obat antiparasit, biasanya dalam kombinasi dengan Sulfadiazin.', analysis: 'TIDAK SESUAI. Pirimetamin bersifat teratogenik (antagonis folat) dan dikontraindikasikan pada kehamilan trimester pertama (sebelum 18 minggu) karena risiko cacat janin. Obat ini baru dipertimbangkan jika ada bukti infeksi janin pada usia kehamilan lebih lanjut.' },
                { id: 'cotrimoxazole', name: 'Cotrimoxazole', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-gray-200"><div class="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-3xl">🚫</div></div>`, description: 'Kombinasi antibiotik (Trimethoprim/Sulfamethoxazole).', analysis: 'SANGAT TIDAK SESUAI. Bukan merupakan terapi lini pertama untuk toksoplasmosis pada kehamilan. Trimethoprim juga merupakan antagonis folat yang penggunaannya harus dihindari, terutama pada trimester pertama.' },
                { id: 'ceftriaxone', name: 'Ceftriaxone', matchScore: 0, vizIconHtml: `<div class="viz-icon bg-gray-200"><div class="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-3xl">🚫</div></div>`, description: 'Antibiotik golongan Sefalosporin.', analysis: 'TIDAK RELEVAN. Ceftriaxone digunakan untuk infeksi bakteri dan tidak memiliki efektivitas terhadap parasit <i>Toxoplasma gondii</i>. Pemberian obat ini tidak akan memberikan manfaat klinis untuk kasus ini.' },
                { id: 'spiramisin', name: 'Spiramisin', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-emerald-200"><div class="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center text-3xl">💊</div></div>`, description: 'Antibiotik makrolida yang aman pada kehamilan.', analysis: 'PALING SESUAI. Spiramisin adalah terapi pilihan utama untuk infeksi toksoplasmosis akut pada kehamilan guna mencegah transmisi ke janin. Obat ini terkonsentrasi di plasenta, bertindak sebagai "barier", dan memiliki profil keamanan yang baik untuk digunakan di semua trimester.' },
                { id: 'sulfadiazine', name: 'Sulfadiazine', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-orange-200"><div class="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center text-3xl">⏳</div></div>`, description: 'Antibiotik sulfonamida.', analysis: 'KURANG SESUAI. Sulfadiazin tidak digunakan sebagai monoterapi. Obat ini merupakan bagian dari rejimen pengobatan (bersama Pirimetamin) untuk janin yang sudah terbukti terinfeksi, bukan untuk pencegahan primer dari ibu. Penggunaannya juga baru dipertimbangkan setelah trimester pertama.' }
            ],
            quiz: [
                { question: "Apa makna klinis dari hasil IgM dan IgG Toxoplasma yang sama-sama reaktif pada pasien ini?", options: ["Infeksi kronis yang tidak aktif", "Imunitas seumur hidup dari vaksin", "Infeksi primer akut atau yang baru terjadi", "Hasil positif palsu"], answer: "Infeksi primer akut atau yang baru terjadi" },
                { question: "Apa tujuan utama pemberian terapi pada pasien dengan usia kehamilan 15 minggu ini?", options: ["Mengobati gejala yang dialami ibu", "Mencegah transmisi parasit ke janin", "Mempercepat pembentukan antibodi IgG", "Membasmi kista parasit dari tubuh ibu"], answer: "Mencegah transmisi parasit ke janin" },
                { question: "Manakah dari obat berikut yang paling berisiko menyebabkan cacat janin (teratogenik) jika diberikan pada trimester pertama?", options: ["Spiramisin", "Sulfadiazine", "Ceftriaxone", "Pirimetamin"], answer: "Pirimetamin" },
                { question: "Mengapa Spiramisin menjadi pilihan yang paling tepat dalam kasus ini?", options: ["Karena harganya paling murah", "Karena membunuh parasit paling cepat di darah ibu", "Karena aman dan terkonsentrasi di plasenta untuk mencegah transmisi", "Karena merupakan satu-satunya pilihan antibiotik"], answer: "Karena aman dan terkonsentrasi di plasenta untuk mencegah transmisi" },
                { question: "Berdasarkan anamnesis, apa sumber penularan Toksoplasmosis yang paling mungkin pada pasien?", options: ["Makan sayuran yang tidak dicuci", "Transfusi darah", "Kontak erat dengan kotoran kucing", "Gigitan nyamuk"], answer: "Kontak erat dengan kotoran kucing" }
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
                    backgroundColor: diagnoses.map(d => {
                        if (d.matchScore >= 9) return '#059669'; // Paling Sesuai
                        if (d.matchScore >= 3) return '#f97316'; // Kurang Sesuai
                        if (d.matchScore >= 1) return '#ef4444'; // Tidak Sesuai
                        return '#9ca3af'; // Tidak Relevan
                    }),
                    borderColor: diagnoses.map(d => {
                        if (d.matchScore >= 9) return '#065f46';
                        if (d.matchScore >= 3) return '#c2410c';
                        if (d.matchScore >= 1) return '#b91c1c';
                        return '#6b7280';
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
                // Default to showing the correct answer's analysis first
                renderDetails('spiramisin');
            }
            createChart();
            loadQuiz();
        };