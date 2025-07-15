        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'hsv', name: 'Virus Herpes Simpleks', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 flex items-center justify-center text-3xl">🦠</div></div>`, description: 'Infeksi kornea oleh Virus Herpes Simpleks, penyebab umum keratitis viral.', analysis: 'KURANG SESUAI. Meskipun gejalanya mirip (mata merah, nyeri, kabur), gambaran klinis klasik keratitis HSV adalah ulkus dendritik (bercabang). Temuan lesi satelit tidak khas untuk infeksi ini.' },
                { id: 'aspergillus', name: 'Jamur Aspergillus', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-green-200"><div class="w-12 h-12 flex items-center justify-center text-3xl">🍄</div></div>`, description: 'Infeksi kornea oleh jamur, sering terjadi setelah trauma dengan materi tumbuhan.', analysis: 'SANGAT SESUAI. Adanya riwayat trauma mata terkena daun padi pada seorang petani merupakan faktor risiko klasik. Temuan lesi satelit pada pemeriksaan fisik sangat mendukung (patognomonik) diagnosis keratitis jamur.' },
                { id: 'hzo', name: 'Virus Herpes Zoster', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-purple-100"><div class="w-12 h-12 flex items-center justify-center text-3xl">⚡️</div></div>`, description: 'Reaktivasi virus cacar air pada saraf mata, menyebabkan keratitis dan ruam kulit.', analysis: 'TIDAK SESUAI. Keratitis Herpes Zoster Ophthalmicus biasanya disertai dengan ruam kulit (vesikel) pada area dahi dan hidung (dermatom nervus trigeminus V1). Tidak ada riwayat ruam pada pasien ini.' },
                { id: 'ecoli', name: 'Bakteri (misal: E.coli)', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 flex items-center justify-center text-3xl"> B </div></div>`, description: 'Infeksi kornea oleh bakteri. E. coli adalah bakteri, bukan jamur.', analysis: 'KURANG SESUAI. Opsi ini keliru menyebut E. coli sebagai jamur. Keratitis bakteri mungkin terjadi pasca trauma, namun biasanya lebih progresif cepat, dengan sekret purulen (nanah) yang banyak, dan umumnya tidak membentuk lesi satelit.' },
                { id: 'acanthamoeba', name: 'Acanthamoeba', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-cyan-100"><div class="w-12 h-12 flex items-center justify-center text-3xl">💧</div></div>`, description: 'Infeksi kornea oleh ameba dari air atau tanah, sering terkait lensa kontak.', analysis: 'TIDAK SESUAI. Faktor risiko utama (penggunaan lensa kontak, paparan air kotor) tidak ada. Gambaran klinis klasik keratitis Acanthamoeba adalah infiltrat cincin (ring infiltrate) dan nyeri yang sangat hebat, yang tidak digambarkan pada kasus ini.' }
            ],
            quiz: [
                { question: "Apa faktor risiko utama pada pasien ini yang paling mengarahkan ke keratitis jamur?", options: ["Usia 34 tahun", "Tekanan darah 140/80", "Riwayat trauma terkena daun padi", "Jenis kelamin laki-laki"], answer: "Riwayat trauma terkena daun padi" },
                { question: "Temuan pemeriksaan fisik manakah yang paling spesifik (patognomonik) untuk keratitis jamur?", options: ["Visus turun", "Injeksi siliar", "Mata merah dan nyeri", "Lesi satelit"], answer: "Lesi satelit" },
                { question: "Apa yang paling tepat diartikan oleh temuan 'injeksi siliar' pada kasus ini?", options: ["Infeksi kelopak mata", "Perdarahan di permukaan mata", "Peradangan pada struktur dalam mata (kornea/iris)", "Alergi mata ringan"], answer: "Peradangan pada struktur dalam mata (kornea/iris)" },
                { question: "Mengapa Keratitis Herpes Simpleks (HSV) kurang mungkin menjadi diagnosis pada kasus ini?", options: ["HSV tidak menyebabkan mata merah", "Gambaran klinis khasnya adalah ulkus dendritik, bukan lesi satelit", "HSV hanya menyerang anak-anak", "Infeksi HSV tidak terasa nyeri"], answer: "Gambaran klinis khasnya adalah ulkus dendritik, bukan lesi satelit" },
                { question: "Berdasarkan analisis lengkap, etiologi yang paling mungkin menyebabkan kondisi pasien adalah...", options: ["Virus", "Jamur", "Bakteri", "Ameba"], answer: "Jamur" }
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