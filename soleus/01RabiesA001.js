        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'opsi-a', name: 'Berikan VAR 0,5 ml SC sebanyak dua dosis pada hari ke-0, dilanjutkan 0,5 ml SC sebanyak satu dosis pada hari ke-7 dan ke-21', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">💉</div></div>`, description: 'VAR 0,5 ml SC (hari 0, 7, 21)', analysis: 'KURANG TEPAT. Pemberian VAR saja tidak cukup untuk luka kategori III yang memerlukan imunitas pasif segera dari SAR. Selain itu, rute Subkutan (SC) kurang dianjurkan dibandingkan Intramuskular (IM).' },
                { id: 'opsi-b', name: 'Berikan VAR 0,5 ml IM sebanyak dua dosis pada hari ke-0, dilanjutkan 0,5 ml IM sebanyak satu dosis pada hari ke-7 dan ke-21', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">💉</div></div>`, description: 'VAR 0,5 ml IM (hari 0, 7, 21)', analysis: 'TIDAK LENGKAP. Walaupun rute IM untuk VAR sudah tepat, penanganan luka kategori III (luka dalam, hewan tidak bisa diobservasi) wajib menyertakan Serum Anti Rabies (SAR) untuk memberikan imunitas pasif segera.' },
                { id: 'opsi-c', name: 'Berikan VAR 0,5 ml IV sebanyak dua dosis pada hari ke-0, dilanjutkan 0,5 ml IV sebanyak satu dosis pada hari ke-7 dan ke-21', matchScore: 0, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">🚫</div></div>`, description: 'VAR 0,5 ml IV (hari 0, 7, 21)', analysis: 'SANGAT SALAH. Vaksin Anti Rabies (VAR) merupakan kontraindikasi absolut untuk diberikan secara intravena (IV). Ini adalah kesalahan fatal dalam tatalaksana.' },
                { id: 'opsi-d', name: 'Berikan VAR 0,5 ml IM sebanyak dua dosis pada hari ke-0, dilanjutkan 0,5 ml IM sebanyak satu dosis pada hari ke-7 dan ke-21 + SAR 20IU/kgBB (separuh IM- separuh diinfiltrasi sekitar luka)', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-emerald-200"><div class="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center text-3xl">✅</div></div>`, description: 'VAR 0,5 ml IM (hari 0, 7, 21) + SAR 20IU/kgBB', analysis: 'SANGAT TEPAT. Ini adalah tatalaksana lengkap untuk luka gigitan risiko tinggi (Kategori III) sesuai panduan WHO. Meliputi pemberian imunitas aktif (VAR) dan imunitas pasif (SAR). Infiltrasi SAR di sekitar luka bertujuan menetralkan virus di lokasi gigitan secepat mungkin.' },
                { id: 'opsi-e', name: 'Berikan VAR 0,5 ml IM sebanyak dua dosis pada hari ke-0, dilanjutkan 0,5 ml IM sebanyak satu dosis pada hari ke-7 dan ke-14', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">💉</div></div>`, description: 'VAR 0,5 ml IM (hari 0, 7, 14)', analysis: 'TIDAK LENGKAP. Sama seperti pilihan B, pilihan ini menggunakan jadwal pemberian VAR yang berbeda namun tetap mengabaikan komponen krusial yaitu pemberian Serum Anti Rabies (SAR) yang diperlukan untuk perlindungan segera pada luka berisiko tinggi.' }
            ],
            quiz: [
                { question: "Berdasarkan deskripsi luka (dalam hingga otot) dan status anjing (liar dan kabur), luka ini termasuk kategori risiko rabies apa?", options: ["Kategori I", "Kategori II", "Kategori III", "Tidak Berisiko"], answer: "Kategori III" },
                { question: "Apa tujuan utama pemberian Serum Anti Rabies (SAR) pada pasien ini?", options: ["Memberikan kekebalan aktif jangka panjang", "Memberikan netralisasi virus secara cepat di lokasi luka (imunitas pasif)", "Mengobati infeksi bakteri pada luka", "Mencegah demam pasca gigitan"], answer: "Memberikan netralisasi virus secara cepat di lokasi luka (imunitas pasif)" },
                { question: "Mengapa tindakan pasien mencuci luka dengan sabun dan air mengalir sangat penting?", options: ["Untuk menghentikan perdarahan", "Untuk mengurangi rasa nyeri", "Untuk membunuh virus rabies secara mekanis dan kimiawi", "Hanya untuk membersihkan kotoran"], answer: "Untuk membunuh virus rabies secara mekanis dan kimiawi" },
                { question: "Manakah rute pemberian Vaksin Anti Rabies (VAR) yang TIDAK dianjurkan atau merupakan kontraindikasi?", options: ["Intramuskular (IM)", "Intradermal (ID)", "Subkutan (SC)", "Intravena (IV)"], answer: "Intravena (IV)" },
                { question: "Tatalaksana yang paling tepat dan lengkap untuk kasus gigitan Kategori III adalah...", options: ["Hanya VAR", "Hanya SAR", "VAR + SAR", "Observasi saja"], answer: "VAR + SAR" }
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
                        <h4 class="font-semibold text-slate-700">Analisis Ketepatan:</h4>
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
                    backgroundColor: diagnoses.map(d => {
                        if (d.matchScore >= 9) return '#059669'; // a darker green for best
                        if (d.matchScore >= 4) return '#f97316'; // orange for incomplete
                        if (d.matchScore > 0) return '#facc15'; // yellow for less correct
                        return '#ef4444'; // red for wrong
                    }),
                    borderColor: diagnoses.map(d => {
                        if (d.matchScore >= 9) return '#065f46';
                        if (d.matchScore >= 4) return '#c2410c';
                        if (d.matchScore > 0) return '#eab308';
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