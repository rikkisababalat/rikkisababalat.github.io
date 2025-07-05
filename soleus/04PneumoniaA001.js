        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                 { id: 'hcap', name: 'Healthcare-Associated Pneumonia', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-cyan-200"><div class="w-12 h-12 bg-cyan-400 rounded-full flex items-center justify-center text-3xl">🏥</div></div>`, description: 'Pneumonia yang didapat terkait kontak dengan fasilitas kesehatan.', analysis: 'SANGAT SESUAI. Pasien dirawat inap selama 2 minggu (memenuhi kriteria >48 jam dalam 90 hari terakhir). Gejala muncul setelah pasien keluar dari rumah sakit. Ini adalah definisi klasik dari HCAP.' },
                 { id: 'cap', name: 'Community-Acquired Pneumonia', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-green-200"><div class="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-3xl">🌳</div></div>`, description: 'Pneumonia yang didapat di luar lingkungan rumah sakit atau fasilitas kesehatan.', analysis: 'KURANG SESUAI. Meskipun secara teknis gejala muncul saat di komunitas, riwayat rawat inap yang panjang merupakan faktor risiko kuat untuk patogen nosokomial, sehingga HCAP lebih tepat.' },
                 { id: 'hap', name: 'Hospital-Acquired Pneumonia', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-orange-200"><div class="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center text-3xl">🏨</div></div>`, description: 'Pneumonia yang berkembang ≥48 jam SETELAH masuk rumah sakit.', analysis: 'TIDAK SESUAI. Gejala pasien ini muncul SETELAH ia dipulangkan, bukan saat masih dirawat di rumah sakit. Waktu onsetnya tidak memenuhi kriteria HAP.' },
                 { id: 'vap', name: 'Ventilator-Associated Pneumonia', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-slate-200"><div class="w-12 h-12 bg-slate-400 rounded-full flex items-center justify-center text-3xl">💨</div></div>`, description: 'Pneumonia yang berkembang >48 jam setelah intubasi endotrakeal.', analysis: 'SANGAT TIDAK SESUAI. Tidak ada informasi bahwa pasien pernah menggunakan ventilator selama perawatannya.' },
                 { id: 'post-op', name: 'Post-operative Pneumonia', matchScore: 7, vizIconHtml: `<div class="viz-icon bg-purple-200"><div class="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center text-3xl">🩹</div></div>`, description: 'Istilah umum untuk pneumonia yang terjadi setelah prosedur operasi.', analysis: 'CUKUP SESUAI NAMUN TIDAK SPESIFIK. Istilah ini benar secara deskriptif, tetapi HCAP adalah diagnosis yang lebih presisi karena menyoroti faktor risiko epidemiologis (paparan nosokomial) yang penting untuk tatalaksana.' },
            ],
            quiz: [
                { question: "Faktor risiko paling signifikan pada pasien ini yang mengarahkan diagnosis ke HCAP adalah...", options: ["Usia 26 tahun", "Jenis kelamin laki-laki", "Riwayat patah tulang", "Riwayat rawat inap 2 minggu"], answer: "Riwayat rawat inap 2 minggu" },
                { question: "Temuan pemeriksaan fisik paru yang mendukung diagnosis pneumonia adalah...", options: ["Tekanan darah 140/90", "Nyeri minimal pada luka", "Ronkhi bilateral", "Denyut jantung 100x/menit"], answer: "Ronkhi bilateral" },
                { question: "Mengapa diagnosis Hospital-Acquired Pneumonia (HAP) kurang tepat untuk kasus ini?", options: ["Karena gejala terlalu ringan", "Karena gejala muncul setelah pasien dipulangkan", "Karena tidak ada riwayat merokok", "Karena luka operasi bersih"], answer: "Karena gejala muncul setelah pasien dipulangkan" },
                { question: "Kondisi luka operasi pasien yang 'terawat baik tanpa pus' penting untuk...", options: ["Mengesampingkan infeksi paru", "Meningkatkan kecurigaan ke VAP", "Mengesampingkan luka sebagai sumber demam", "Memastikan pasien alergi obat"], answer: "Mengesampingkan luka sebagai sumber demam" },
                { question: "Berdasarkan definisi klasik, diagnosis yang paling presisi untuk pasien ini adalah...", options: ["Community-Acquired Pneumonia", "Healthcare-Associated Pneumonia", "Ventilator-Associated Pneumonia", "Post-operative Pneumonia"], answer: "Healthcare-Associated Pneumonia" }
            ]
        };

        // Re-order diagnoses to match the question's option order: A, B, C, D, E
        const optionOrder = ['cap', 'hcap', 'hap', 'vap', 'post-op'];
        const orderedDiagnoses = optionOrder.map(id => caseData.diagnoses.find(d => d.id === id));
        caseData.diagnoses = orderedDiagnoses;

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
                        if (d.id === 'hcap') return '#047857'; // Most correct
                        if (d.matchScore >= 7) return '#10b981';
                        if (d.matchScore >= 4) return '#6ee7b7';
                        return '#fecaca'; // Red for low match
                    }),
                    borderColor: diagnoses.map(d => {
                         if (d.id === 'hcap') return '#064e3b';
                         if (d.matchScore >= 7) return '#059669';
                         if (d.matchScore >= 4) return '#34d399';
                         return '#ef4444';
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
                 // Start with HCAP selected as it's the correct answer
                renderDetails('hcap');
            }
            createChart();
            loadQuiz();
        };