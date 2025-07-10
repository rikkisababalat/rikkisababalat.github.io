
        document.addEventListener('DOMContentLoaded', () => {
            // Data kasus, diagnosis, dan kuis
            // Didefinisikan dalam urutan yang sesuai dengan opsi A, B, C, D, E
            const caseData = {
                diagnoses: [
                    { id: 'ulkus-molle', name: 'Ulkus Molle', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">😖</div></div>`, description: 'Infeksi menular seksual yang disebabkan bakteri Haemophilus ducreyi.', analysis: 'SANGAT TIDAK SESUAI. Ciri khas ulkus molle adalah lesi (borok) yang sangat nyeri. Kasus ini dengan jelas menyebutkan riwayat borok yang tidak nyeri.' },
                    { id: 'ulkus-durum', name: 'Ulkus Durum', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">🩹</div></div>`, description: 'Lesi primer pada sifilis, dikenal juga sebagai chancre.', analysis: 'KURANG TEPAT SEBAGAI DIAGNOSIS AKHIR. Meskipun pasien memiliki riwayat ulkus durum, lesi ini sudah sembuh. Diagnosis saat ini harus mencerminkan manifestasi penyakit yang sedang berlangsung (ruam), bukan lesi yang sudah hilang.' },
                    { id: 'condyloma-lata', name: 'Condyloma Lata', matchScore: 5, vizIconHtml: `<div class="viz-icon bg-purple-100"><div class="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center text-3xl">🟣</div></div>`, description: 'Lesi mirip kutil, datar, dan lembab yang muncul pada sifilis sekunder.', analysis: 'MUNGKIN, TAPI BUKAN YANG UTAMA. Condyloma lata adalah salah satu tanda sifilis sekunder, namun temuan kunci yang disebutkan dalam kasus adalah "copper penny rash" di telapak tangan, yang lebih spesifik dan diagnostik untuk kondisi ini.' },
                    { id: 'sifilis-primer', name: 'Sifilis Primer', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">🎯</div></div>`, description: 'Tahap awal sifilis yang ditandai dengan adanya ulkus durum (chancre).', analysis: 'TIDAK SESUAI. Pasien telah melewati tahap ini. Sifilis primer ditandai dengan adanya borok aktif. Karena boroknya sudah sembuh dan ruam baru muncul, pasien sudah berada di tahap selanjutnya.' },
                    { id: 'sifilis-sekunder', name: 'Sifilis Sekunder', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-emerald-200"><div class="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center text-3xl">✋</div></div>`, description: 'Tahap kedua sifilis yang terjadi setelah lesi primer sembuh.', analysis: 'SANGAT SESUAI. Kombinasi riwayat borok genital tidak nyeri yang sembuh sendiri (sifilis primer) diikuti dengan munculnya ruam makulopapular khas (\'copper penny rash\') di telapak tangan adalah presentasi klinis buku teks untuk sifilis sekunder.' }
                ],
                quiz: [
                    { question: "Apa ciri khas dari borok (ulkus) yang dialami pasien sebelumnya?", options: ["Sangat nyeri dan banyak", "Tidak nyeri dan sembuh sendiri", "Gatal dan berair", "Cepat membesar"], answer: "Tidak nyeri dan sembuh sendiri" },
                    { question: "Temuan 'copper penny rash' pada telapak tangan paling spesifik untuk tahap sifilis yang mana?", options: ["Primer", "Sekunder", "Laten", "Tersier"], answer: "Sekunder" },
                    { question: "Bakteri penyebab sifilis adalah...", options: ["Neisseria gonorrhoeae", "Haemophilus ducreyi", "Chlamydia trachomatis", "Treponema pallidum"], answer: "Treponema pallidum" },
                    { question: "Mengapa 'Sifilis Primer' bukan diagnosis yang tepat untuk keluhan pasien saat ini?", options: ["Karena ruamnya tidak gatal", "Karena borok primernya sudah sembuh", "Karena tanda vitalnya normal", "Karena usianya masih muda"], answer: "Karena borok primernya sudah sembuh" },
                    { question: "Berdasarkan keseluruhan presentasi klinis, diagnosis yang paling akurat adalah:", options: ["Ulkus Molle", "Herpes Genitalis", "Sifilis Sekunder", "Dermatitis Kontak"], answer: "Sifilis Sekunder" }
                ]
            };

            const { diagnoses, quiz: quizData } = caseData;
            
            const navContainer = document.getElementById('diagnosis-nav');
            const detailsContainer = document.getElementById('diagnosis-details');
            const quizContainer = document.getElementById('quiz-container');
            let chart = null;
            let currentQuestionIndex = 0;
            let score = 0;
            let selectedAnswer = null;

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
                            if (d.matchScore >= 8) return '#059669'; 
                            if (d.matchScore >= 4) return '#f59e0b';
                            return '#ef4444';
                        }),
                        borderColor: diagnoses.map(d => {
                            if (d.matchScore >= 8) return '#065f46';
                            if (d.matchScore >= 4) return '#b45309';
                            return '#b91c1c';
                        }),
                        borderWidth: 1,
                        borderRadius: 4
                    }]
                };
                if(chart) { chart.destroy(); }
                chart = new Chart(ctx, {
                    type: 'bar', data,
                    options: {
                        responsive: true, maintainAspectRatio: false, indexAxis: 'y',
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
            
            function loadQuiz() {
                currentQuestionIndex = 0;
                score = 0;
                selectedAnswer = null;
                
                quizContainer.querySelector('#quiz-header').classList.remove('hidden');
                quizContainer.querySelector('#quiz-body').classList.remove('hidden');
                quizContainer.querySelector('#quiz-footer').classList.remove('hidden');
                quizContainer.querySelector('#result-container').classList.add('hidden');
                
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
                
                quizContainer.querySelector('#next-btn').disabled = true;

                quizBody.querySelectorAll('.option-btn').forEach(button => {
                    button.addEventListener('click', () => {
                        quizBody.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
                        button.classList.add('selected');
                        selectedAnswer = button.textContent.trim();
                        quizContainer.querySelector('#next-btn').disabled = false;
                    });
                });
            }
            
            function updateProgress() {
                quizContainer.querySelector('#question-counter').textContent = `Pertanyaan ${currentQuestionIndex + 1} dari ${quizData.length}`;
                const progressBar = quizContainer.querySelector('#progress-bar');
                const progressPercentage = ((currentQuestionIndex) / quizData.length) * 100;
                progressBar.style.width = `${progressPercentage}%`;
            }

            function showResults() {
                quizContainer.querySelector('#progress-bar').style.width = '100%';
                quizContainer.querySelector('#quiz-header').classList.add('hidden');
                quizContainer.querySelector('#quiz-body').classList.add('hidden');
                quizContainer.querySelector('#quiz-footer').classList.add('hidden');
                
                const resultContainer = quizContainer.querySelector('#result-container');
                resultContainer.classList.remove('hidden');
                resultContainer.querySelector('#score-text').textContent = `${score}/${quizData.length}`;

                const percentage = (score / quizData.length) * 100;
                let feedback = "Pemahaman yang luar biasa!";
                if (percentage < 50) feedback = "Mungkin perlu meninjau kembali materinya.";
                else if (percentage < 80) feedback = "Pemahaman yang baik!";
                resultContainer.querySelector('#feedback-text').textContent = feedback;
            }

            quizContainer.addEventListener('click', (e) => {
                if (e.target.id === 'next-btn' && selectedAnswer !== null) {
                    if (selectedAnswer === quizData[currentQuestionIndex].answer) score++;
                    currentQuestionIndex++;
                    if (currentQuestionIndex < quizData.length) loadQuestion();
                    else showResults();
                } else if (e.target.id === 'restart-btn') {
                    loadQuiz();
                }
            });
            
            // --- INISIALISASI HALAMAN ---
            createNav();
            createChart();
            loadQuiz();
            // Tampilkan detail diagnosis yang paling tepat saat halaman pertama kali dimuat
            renderDetails('sifilis-sekunder');
        });