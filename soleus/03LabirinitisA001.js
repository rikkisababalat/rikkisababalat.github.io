        const caseData = {
            diagnoses: [
                { id: 'labirinitis', name: 'Labirinitis', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-emerald-200"><div class="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center text-3xl">🧠</div></div>`, description: 'Peradangan pada labirin (telinga dalam), memengaruhi sistem vestibular (keseimbangan) dan koklea (pendengaran).', analysis: 'SANGAT SESUAI. Terdapat triad klasik: vertigo akut, tinnitus, dan gangguan pendengaran unilateral. Gejala ini muncul setelah riwayat infeksi saluran napas atas (batuk pilek), yang merupakan pemicu umum. Pemeriksaan otoskopi dan neurologis yang normal semakin mendukung diagnosis ini.' },
                { id: 'neuritis-vestibularis', name: 'Neuritis Vestibularis', matchScore: 6, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">🌀</div></div>`, description: 'Peradangan pada nervus vestibularis, bagian dari saraf kranial VIII yang mengatur keseimbangan.', analysis: 'CUKUP SESUAI, NAMUN TIDAK LENGKAP. Kondisi ini menyebabkan vertigo hebat yang mirip dengan kasus, dan sering dipicu oleh virus. Namun, neuritis vestibularis murni TIDAK melibatkan gangguan pendengaran atau tinnitus karena hanya saraf vestibular yang terkena, bukan saraf koklea.' },
                { id: 'penyakit-meniere', name: 'Penyakit Meniere', matchScore: 5, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">💧</div></div>`, description: 'Gangguan telinga dalam akibat penumpukan cairan (endolimf) yang menyebabkan serangan vertigo berulang.', analysis: 'KURANG SESUAI. Meskipun gejalanya (vertigo, tinnitus, gangguan dengar) mirip, Penyakit Meniere bersifat kronis dan episodik (serangan datang dan pergi), bukan sebuah episode tunggal akut yang langsung terkait dengan infeksi sebelumnya. Onset pada kasus ini lebih menunjukkan proses peradangan akut.' },
                { id: 'omsk', name: 'Otitis Media Supuratif Kronis', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">👂</div></div>`, description: 'Infeksi kronis pada telinga tengah dengan perforasi (lubang) membran timpani.', analysis: 'TIDAK SESUAI. Gejala OMSK bisa tumpang tindih, namun diagnosis ini dikesampingkan oleh temuan otoskopi yang menunjukkan membran timpani intak (tidak berlubang) dan tidak adanya tanda-tanda infeksi kronis seperti kolesteatoma.' },
                { id: 'vertigo-sentral', name: 'Vertigo Sentral', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">🖥️</div></div>`, description: 'Vertigo yang disebabkan oleh kelainan pada sistem saraf pusat (otak kecil atau batang otak).', analysis: 'SANGAT TIDAK SESUAI. Vertigo sentral biasanya disertai dengan defisit neurologis lainnya (misalnya, penglihatan ganda, kesulitan bicara, kelemahan anggota gerak). Pasien dalam kasus ini tidak memiliki defisit neurologis, membuat penyebab sentral sangat tidak mungkin.' }
            ],
            quiz: [
                { question: "Triad gejala klasik yang dialami pasien (pusing berputar, telinga berdenging, dan penurunan pendengaran) secara spesifik menunjuk pada gangguan di...", options: ["Telinga luar", "Telinga tengah", "Telinga dalam (Labirin)", "Batang otak"], answer: "Telinga dalam (Labirin)" },
                { question: "Faktor riwayat manakah yang menjadi petunjuk paling penting untuk mendiagnosis Labirinitis pada kasus ini?", options: ["Usia pasien 20 tahun", "Jenis kelamin perempuan", "Riwayat batuk pilek sebelumnya", "Pusing tidak dipengaruhi posisi"], answer: "Riwayat batuk pilek sebelumnya" },
                { question: "Mengapa Neuritis Vestibularis bukan diagnosis yang paling tepat?", options: ["Karena pusingnya berputar", "Karena tidak ada demam", "Karena ada gangguan pendengaran dan tinnitus", "Karena membran timpani intak"], answer: "Karena ada gangguan pendengaran dan tinnitus" },
                { question: "Temuan pemeriksaan fisik apa yang membantu menyingkirkan Otitis Media Supuratif Kronis (OMSK)?", options: ["Tanda vital normal", "Tidak ada defisit neurologis", "Membran timpani intak", "Pasien sadar penuh"], answer: "Membran timpani intak" },
                { question: "Berdasarkan analisis klinis yang paling komprehensif, diagnosis akhir untuk pasien ini adalah...", options: ["Penyakit Meniere", "Vertigo Sentral", "Neuritis Vestibularis", "Labirinitis"], answer: "Labirinitis" }
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
                        if (d.matchScore >= 9) return '#059669'; // emerald-600
                        if (d.matchScore >= 5) return '#34d399'; // emerald-400
                        if (d.matchScore >= 2) return '#fde047'; // yellow-300
                        return '#fca5a5'; // red-300
                    }),
                    borderColor: diagnoses.map(d => {
                        if (d.matchScore >= 9) return '#047857'; // emerald-700
                        if (d.matchScore >= 5) return '#059669'; // emerald-600
                        if (d.matchScore >= 2) return '#facc15'; // yellow-400
                        return '#ef4444'; // red-500
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
            // Sort diagnoses by matchScore descending for initial view
            diagnoses.sort((a, b) => b.matchScore - a.matchScore);
            createNav();
            if (diagnoses.length > 0) {
                renderDetails(diagnoses[0].id);
            }
            createChart();
            loadQuiz();
        };