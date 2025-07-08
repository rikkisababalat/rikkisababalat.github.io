
        // Data untuk studi kasus ini
        const caseData = {
            diagnoses: [
                { id: 'tes-holmgren', name: 'Tes Holmgren', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-green-200"><div class="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-3xl">🧶</div></div>`, description: 'Tes kualitatif yang menggunakan satu set gulungan benang wol dengan berbagai warna dan corak.', analysis: 'SANGAT SESUAI. Kasus secara eksplisit menyebutkan penggunaan "gulungan benang wol" dan meminta pasien untuk "menyocokan warna", yang merupakan prosedur standar dari Tes Holmgren.' },
                { id: 'tes-ishihara', name: 'Tes Ishihara', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">🔢</div></div>`, description: 'Tes skrining yang paling umum, menggunakan plat dengan titik-titik warna yang membentuk angka atau pola.', analysis: 'TIDAK SESUAI. Meskipun tes pertama kemungkinan adalah Tes Ishihara, pertanyaan menanyakan tentang tes kedua. Tes Ishihara tidak menggunakan benang wol.' },
                { id: 'tes-farnsworth', name: 'Tes Farnsworth-Munsell', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-purple-100"><div class="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center text-3xl">🎨</div></div>`, description: 'Tes yang meminta pasien untuk menyusun serangkaian tutup (caps) berwarna dalam urutan gradasi warna.', analysis: 'TIDAK SESUAI. Media yang digunakan adalah tutup berwarna (caps), bukan gulungan benang wol.' },
                { id: 'tes-anomaloskop', name: 'Tes Anomaloskop', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">🔬</div></div>`, description: 'Alat presisi (dianggap gold standard) di mana pasien mencocokkan warna dengan memutar kenop untuk mencampur cahaya.', analysis: 'TIDAK SESUAI. Ini adalah tes berbasis instrumen optik, bukan tes manual dengan benang wol.' },
                { id: 'tes-perimetri', name: 'Tes Perimetri', matchScore: 0, vizIconHtml: `<div class="viz-icon bg-slate-200"><div class="w-12 h-12 bg-slate-400 rounded-full flex items-center justify-center text-3xl">👁️</div></div>`, description: 'Tes untuk memetakan lapang pandang seseorang, baik sentral maupun perifer.', analysis: 'SANGAT TIDAK SESUAI. Tes ini tidak ada hubungannya dengan persepsi atau diskriminasi warna.' }
            ],
            quiz: [
                { question: "Untuk keperluan apa pasien laki-laki tersebut datang ke klinik?", options: ["Pemeriksaan mata rutin", "Mengeluh mata perih", "Surat keterangan tidak buta warna", "Membuat kacamata baru"], answer: "Surat keterangan tidak buta warna" },
                { question: "Pada tes pertama (tes plat angka), pasien kesulitan melihat angka pada lingkaran dengan warna dominan...", options: ["Merah", "Hijau", "Kuning", "Biru"], answer: "Biru" },
                { question: "Media apa yang digunakan pada pemeriksaan kedua yang dijelaskan dalam kasus?", options: ["Kartu dengan angka", "Layar komputer", "Gulungan benang wol", "Tutup botol berwarna"], answer: "Gulungan benang wol" },
                { question: "Berdasarkan media yang digunakan, pemeriksaan kedua yang paling tepat adalah...", options: ["Tes Farnsworth-Munsell", "Tes Holmgren", "Tes Ishihara", "Tes Perimetri"], answer: "Tes Holmgren" },
                { question: "Tes buta warna yang menggunakan plat berisi titik-titik warna yang membentuk angka umumnya dikenal sebagai...", options: ["Tes Snellen", "Tes Anomaloskop", "Tes Holmgren", "Tes Ishihara"], answer: "Tes Ishihara" }
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
                    backgroundColor: diagnoses.map(d => d.matchScore >= 8 ? '#059669' : (d.matchScore >= 3 ? '#34d399' : '#fca5a5')),
                    borderColor: diagnoses.map(d => d.matchScore >= 8 ? '#065f46' : (d.matchScore >= 3 ? '#059669' : '#ef4444')),
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
                renderDetails(diagnoses[0].id);
            }
            createChart();
            loadQuiz();
        };
   