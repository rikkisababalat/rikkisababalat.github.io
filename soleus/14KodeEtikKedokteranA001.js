        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'menolak', name: 'Menolak dengan alasan apapun', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-emerald-200"><div class="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center text-3xl">🛡️</div></div>`, description: 'Menolak permintaan secara tegas namun sopan, dan memberikan edukasi.', analysis: 'SANGAT TEPAT. Tindakan ini menjunjung tinggi KODEKI, sumpah dokter, dan aspek hukum (KUHP Pasal 267). Ini menjaga integritas profesional dan kepercayaan publik. Ini adalah satu-satunya tindakan yang benar.' },
                { id: 'membuat-nasihat', name: 'Membuat & menasihati', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-3xl">⚠️</div></div>`, description: 'Memberikan surat palsu sambil menasihati agar tidak diulang.', analysis: 'SANGAT TIDAK TEPAT. Meskipun ada niat baik untuk menasihati, tindakan utamanya adalah pemalsuan dokumen. Ini adalah pelanggaran etika dan hukum yang serius. Nasihat tidak menghapus kesalahan.' },
                { id: 'membuat-biaya', name: 'Membuat dengan biaya', matchScore: 0, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-3xl">💰</div></div>`, description: 'Memberikan surat palsu dengan imbalan biaya tambahan.', analysis: 'PELANGGARAN TERBERAT. Ini menggabungkan pemalsuan dokumen dengan korupsi/pungli. Tindakan ini sangat merusak martabat profesi kedokteran dan dapat memiliki konsekuensi hukum yang paling parah.' },
                { id: 'bawa-pasien', name: 'Meminta membawa pasien', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-3xl">👨‍⚕️</div></div>`, description: 'Meminta ibu untuk membawa anaknya terlebih dahulu untuk diperiksa.', analysis: 'BISA DIBENARKAN, JIKA... tujuannya adalah untuk melakukan pemeriksaan objektif dan kemudian menolak jika anak sehat. Namun, jika ini hanya formalitas untuk tetap membuat surat palsu, maka ini tetap salah. Opsi ini ambigu dan berisiko.' },
                { id: 'ke-dokter-lain', name: 'Menyarankan ke dokter lain', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-slate-200"><div class="w-12 h-12 bg-slate-400 rounded-full flex items-center justify-center text-3xl">🤷</div></div>`, description: 'Menolak secara pribadi tetapi menyarankan pemohon untuk mencari di tempat lain.', analysis: 'TIDAK TEPAT. Ini adalah bentuk pengabaian tanggung jawab (passing the buck). Dokter memiliki kewajiban untuk tidak hanya bertindak etis tetapi juga untuk tidak memfasilitasi tindakan tidak etis oleh orang lain.' }
            ],
            quiz: [
                { question: "Apa prinsip etika utama yang dilanggar jika dokter membuat surat sakit palsu?", options: ["Keadilan (Justice)", "Manfaat (Beneficence)", "Kejujuran (Honesty) & Profesionalisme", "Otonomi Pasien"], answer: "Kejujuran (Honesty) & Profesionalisme" },
                { question: "Surat keterangan sakit yang dikeluarkan dokter memiliki kekuatan sebagai...", options: ["Catatan pribadi", "Dokumen medis-legal", "Saran tidak mengikat", "Rekomendasi biasa"], answer: "Dokumen medis-legal" },
                { question: "Menurut KUHP Pasal 267, ancaman bagi dokter yang sengaja memberikan surat keterangan palsu adalah...", options: ["Teguran lisan", "Denda ringan", "Pidana penjara", "Pencabutan gelar"], answer: "Pidana penjara" },
                { question: "Tindakan menolak permintaan surat sakit palsu sambil memberikan edukasi adalah contoh dari...", options: ["Aroganisme profesional", "Menjaga integritas dan martabat profesi", "Kurangnya rasa empati", "Prosedur yang kaku"], answer: "Menjaga integritas dan martabat profesi" },
                { question: "Mengapa argumen 'membantu anak agar bisa ikut ujian' tidak bisa membenarkan pembuatan surat palsu?", options: ["Karena tujuannya baik", "Karena ujian tidak penting", "Karena tujuan tidak menghalalkan cara yang salah (melanggar hukum & etika)", "Karena sekolah seharusnya memberi izin"], answer: "Karena tujuan tidak menghalalkan cara yang salah (melanggar hukum & etika)" }
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
                        <h4 class="font-semibold text-slate-700">Analisis Etis:</h4>
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
                    label: 'Tingkat Kesesuaian Etis',
                    data: diagnoses.map(d => d.matchScore),
                    backgroundColor: diagnoses.map(d => {
                        if (d.matchScore >= 9) return '#059669'; // a great choice
                        if (d.matchScore >= 4) return '#f59e0b'; // a questionable choice
                        return '#ef4444'; // a bad choice
                    }),
                    borderColor: diagnoses.map(d => {
                        if (d.matchScore >= 9) return '#065f46';
                        if (d.matchScore >= 4) return '#b45309';
                        return '#b91c1c';
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
                        x: { beginAtZero: true, max: 10, title: { display: true, text: 'Skor Kesesuaian Etis (0-10)', font: { size: 14 } } },
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
                feedback = "Mungkin perlu meninjau kembali materi etika dan hukum kedokteran.";
            } else if (percentage < 80) {
                feedback = "Pemahaman yang baik!";
            } else {
                feedback = "Pemahaman etika yang luar biasa! Pertahankan integritas Anda.";
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