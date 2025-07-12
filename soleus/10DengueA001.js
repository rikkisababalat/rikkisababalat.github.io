        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'widal', name: 'Widal', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">🌡️</div></div>`, description: 'Tes serologi untuk mendeteksi antibodi terhadap bakteri Salmonella typhi, penyebab demam tifoid.', analysis: 'KURANG TEPAT. Meskipun demam tifoid dapat menyebabkan demam dan nyeri kepala, mimisan dan trombositopenia signifikan di hari ke-2 lebih jarang terjadi dan lebih khas untuk infeksi Dengue.' },
                { id: 'kultur-urin', name: 'Kultur Urin', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-sky-100"><div class="w-12 h-12 bg-sky-300 rounded-full flex items-center justify-center text-3xl">💧</div></div>`, description: 'Pemeriksaan untuk mengidentifikasi bakteri penyebab Infeksi Saluran Kemih (ISK).', analysis: 'TIDAK TEPAT. Pasien tidak memiliki gejala khas ISK seperti nyeri saat berkemih atau peningkatan frekuensi buang air kecil. Gejala sistemik yang dialami tidak sesuai dengan diagnosis ISK.' },
                { id: 'igg-dengue', name: 'IgG anti dengue', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-purple-100"><div class="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center text-3xl">🔄</div></div>`, description: 'Mendeteksi antibodi IgG yang menandakan infeksi Dengue di masa lalu atau infeksi sekunder.', analysis: 'TIDAK TEPAT UNTUK DIAGNOSIS AKUT. Antibodi IgG baru muncul di fase penyembuhan atau pada infeksi sekunder. Tidak bermanfaat untuk mengkonfirmasi infeksi akut pada hari ke-2 demam.' },
                { id: 'igm-dengue', name: 'IgM anti dengue', matchScore: 6, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">⏳</div></div>`, description: 'Mendeteksi antibodi IgM yang diproduksi tubuh selama fase akut infeksi Dengue primer.', analysis: 'CUKUP TEPAT, TAPI BUKAN YANG TERBAIK. IgM baru dapat dideteksi mulai hari 3-5 demam. Melakukan tes ini pada hari ke-2 memiliki risiko tinggi hasil negatif palsu. Kurang sensitif dibandingkan NS1 pada fase ini.' },
                { id: 'ns1', name: 'Antigen NS1', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">🎯</div></div>`, description: 'Mendeteksi Non-Structural Protein 1 (NS1), sebuah protein virus Dengue yang ada di darah sejak awal infeksi.', analysis: 'SANGAT TEPAT. Ini adalah marker paling sensitif untuk deteksi dini infeksi Dengue, terutama pada 1-7 hari pertama demam. Pilihan paling ideal untuk pasien ini yang berada pada hari ke-2 demam.' }
            ],
            quiz: [
                { question: "Berdasarkan anamnesis dan pemeriksaan fisik, diagnosis kerja yang paling mungkin untuk pasien ini adalah...", options: ["Demam Tifoid", "Infeksi Saluran Kemih", "Demam Dengue", "Malaria"], answer: "Demam Dengue" },
                { question: "Temuan laboratorium manakah yang menjadi tanda bahaya (warning sign) utama dalam kasus ini?", options: ["Hemoglobin 13 g/dL", "Hematokrit 39%", "Suhu 38,8°C", "Trombosit 128.000"], answer: "Trombosit 128.000" },
                { question: "Mengapa tes Antigen NS1 menjadi pilihan yang paling tepat untuk pasien ini?", options: ["Karena harganya paling murah", "Karena paling sensitif pada fase demam awal (hari ke-2)", "Karena bisa mendeteksi infeksi lampau", "Karena hanya memerlukan sedikit darah"], answer: "Karena paling sensitif pada fase demam awal (hari ke-2)" },
                { question: "Gejala 'rasa berat pada kedua mata' yang dikeluhkan pasien secara medis dikenal sebagai...", options: ["Sakit kepala tegang", "Nyeri retro-orbital", "Konjungtivitis", "Glaukoma"], answer: "Nyeri retro-orbital" },
                { question: "Jika tes IgM anti-dengue dilakukan pada hari ke-2 dan hasilnya negatif, apa artinya?", options: ["Pasien pasti tidak menderita Dengue", "Pasien mungkin masih dalam fase sangat awal infeksi sehingga IgM belum terbentuk", "Pasien menderita infeksi sekunder", "Tes tersebut rusak"], answer: "Pasien mungkin masih dalam fase sangat awal infeksi sehingga IgM belum terbentuk" }
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
                        <h4 class="font-semibold text-slate-700">Analisis Ketepatan dengan Kasus:</h4>
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
                    backgroundColor: diagnoses.map(d => d.matchScore >= 8 ? '#059669' : (d.matchScore >= 4 ? '#34d399' : '#f87171')),
                    borderColor: diagnoses.map(d => d.matchScore >= 8 ? '#065f46' : (d.matchScore >= 4 ? '#059669' : '#ef4444')),
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
                renderDetails(diagnoses[4].id); // Tampilkan NS1 sebagai default
            }
            createChart();
            loadQuiz();
        };