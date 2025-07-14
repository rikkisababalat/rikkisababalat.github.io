        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'mri-otak', name: 'MRI Otak', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-indigo-200"><div class="w-12 h-12 bg-indigo-400 rounded-full flex items-center justify-center text-3xl">🧠</div></div>`, description: 'Pencitraan resonansi magnetik untuk melihat struktur otak secara detail.', analysis: 'KURANG SESUAI. Tidak ada gejala fokal neurologis seperti kelemahan separuh badan, gangguan bicara, atau kejang. Keluhan utama lebih mengarah ke gangguan pernapasan saat tidur, bukan masalah struktural di otak.' },
                { id: 'angiografi', name: 'Angiografi', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-rose-200"><div class="w-12 h-12 bg-rose-400 rounded-full flex items-center justify-center text-3xl">🫀</div></div>`, description: 'Prosedur pencitraan invasif untuk memvisualisasikan pembuluh darah.', analysis: 'SANGAT TIDAK SESUAI. Pemeriksaan ini digunakan untuk masalah vaskular seperti penyakit jantung koroner atau stroke, dan tidak relevan untuk mendiagnosis penyebab gangguan tidur dan mendengkur.' },
                { id: 'c-peptide', name: 'C-peptide', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-amber-200"><div class="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center text-2xl">🩸</div></div>`, description: 'Tes darah untuk mengukur produksi insulin oleh pankreas.', analysis: 'KURANG SESUAI UNTUK KELUHAN UTAMA. Meskipun pasien memiliki faktor risiko sindrom metabolik, tes ini bertujuan untuk evaluasi diabetes, bukan untuk mencari penyebab gangguan tidurnya. Bisa menjadi pemeriksaan tambahan, bukan utama.' },
                { id: 'polisomnografi', name: 'Polisomnografi', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-sky-200"><div class="w-12 h-12 bg-sky-400 rounded-full flex items-center justify-center text-3xl">😴</div></div>`, description: 'Rekaman semalaman dari berbagai parameter fisiologis saat tidur (sleep study).', analysis: 'PALING SESUAI. Ini adalah baku emas untuk mendiagnosis gangguan napas saat tidur seperti OSA. Pemeriksaan ini akan secara objektif mengukur frekuensi henti napas (apnea/hipopnea), penurunan saturasi oksigen, dan gangguan arsitektur tidur yang menyebabkan keluhan pasien.' },
                { id: 'spirometri', name: 'Spirometri', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-teal-200"><div class="w-12 h-12 bg-teal-400 rounded-full flex items-center justify-center text-3xl">🫁</div></div>`, description: 'Tes untuk mengukur volume dan kecepatan udara yang dapat dihirup dan dihembuskan paru-paru.', analysis: 'CUKUP SESUAI NAMUN BUKAN YANG UTAMA. Obesitas dapat menyebabkan sindrom hipoventilasi atau penyakit paru restriktif. Namun, spirometri tidak dapat mendeteksi sumbatan jalan napas atas yang terjadi saat tidur, yang merupakan mekanisme inti dari OSA.' },
            ],
            quiz: [
                { question: "Berdasarkan gejala klinis dan faktor risiko, diagnosis apa yang paling mungkin pada pasien ini?", options: ["Insomnia Primer", "Narkolepsi", "Obstructive Sleep Apnea (OSA)", "Sindrom Kaki Gelisah (RLS)"], answer: "Obstructive Sleep Apnea (OSA)" },
                { question: "Manakah temuan pada pemeriksaan fisik yang merupakan faktor risiko mayor untuk kelainan yang dicurigai?", options: ["TD 150/90 mmHg", "HR 82x/menit", "IMT 31,14 kg/m²", "Suhu 37,5°C"], answer: "IMT 31,14 kg/m²" },
                { question: "Profil lipid pasien (kolesterol, LDL, trigliserida tinggi; HDL rendah) secara kolektif dikenal sebagai...", options: ["Hiperglikemia", "Dislipidemia", "Anemia", "Hipotiroidisme"], answer: "Dislipidemia" },
                { question: "Pemeriksaan polisomnografi (PSG) bertujuan utama untuk...", options: ["Mengukur fungsi pompa jantung", "Menganalisis aktivitas listrik otak saat bangun", "Merekam berbagai parameter fisiologis selama tidur", "Melihat struktur saluran cerna"], answer: "Merekam berbagai parameter fisiologis selama tidur" },
                { question: "Mengapa MRI Otak bukan pilihan pertama yang tepat untuk kasus ini?", options: ["Karena biayanya terlalu mahal", "Karena tidak ada tanda-tanda kelainan neurologis fokal", "Karena pasien takut ruang sempit", "Karena hasilnya terlalu lama keluar"], answer: "Karena tidak ada tanda-tanda kelainan neurologis fokal" }
            ]
        };

        const { diagnoses, quiz: quizData } = caseData;
        
        // Reorder diagnoses to match the question's option order: A, B, C, D, E
        const orderedDiagnoses = [
            diagnoses.find(d => d.id === 'mri-otak'),
            diagnoses.find(d => d.id === 'angiografi'),
            diagnoses.find(d => d.id === 'c-peptide'),
            diagnoses.find(d => d.id === 'polisomnografi'),
            diagnoses.find(d => d.id === 'spirometri'),
        ];
        
        const navContainer = document.getElementById('diagnosis-nav');
        const detailsContainer = document.getElementById('diagnosis-details');
        let chart = null;

        function renderDetails(diagnosisId) {
            const diagnosis = orderedDiagnoses.find(d => d.id === diagnosisId);
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
            orderedDiagnoses.forEach(diagnosis => {
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
                labels: orderedDiagnoses.map(d => d.name),
                datasets: [{
                    label: 'Tingkat Kecocokan',
                    data: orderedDiagnoses.map(d => d.matchScore),
                    backgroundColor: orderedDiagnoses.map(d => {
                        if (d.matchScore >= 9) return '#059669'; // Emerald-600 for best match
                        if (d.matchScore >= 4) return '#34d399'; // Emerald-400 for moderate match
                        return '#a7f3d0'; // Emerald-200 for low match
                    }),
                    borderColor: orderedDiagnoses.map(d => {
                         if (d.matchScore >= 9) return '#065f46'; // Emerald-800
                         if (d.matchScore >= 4) return '#059669'; // Emerald-600
                         return '#6ee7b7'; // Emerald-300
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
            const navButtons = document.querySelectorAll('#diagnosis-nav button');
            if (navButtons.length > 0) {
                 navButtons.forEach(btn => btn.classList.add('nav-button-inactive'));
            }
            
            createChart();
            loadQuiz();
        };