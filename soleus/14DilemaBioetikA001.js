const caseData = {
            diagnoses: [
                 { id: 'nonmaleficence-autonomy', name: 'Non-Maleficence - Autonomy', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">🛡️</div></div>`, description: 'Konflik antara kewajiban untuk tidak merugikan (Non-Maleficence) dan hak otonomi pasien.', analysis: 'SANGAT SESUAI. Ini adalah konflik fundamental. Kewajiban paling dasar dokter adalah tidak merugikan pasien (primum non nocere). Membiarkan pasien meninggal karena tidak ditransfusi dapat dianggap sebagai bentuk kerugian melalui pembiaran (harm by omission). Kewajiban ini berbenturan langsung dengan hak keluarga untuk menolak intervensi medis (Autonomy).' },
                 { id: 'beneficence-autonomy', name: 'Beneficence - Autonomy', matchScore: 8, vizIconHtml: `<div class="viz-icon bg-emerald-200"><div class="w-12 h-12 rounded-full flex items-center justify-center text-3xl">⚖️</div></div>`, description: 'Konflik antara kewajiban berbuat baik (Beneficence) dan hak pasien untuk menentukan nasib sendiri (Autonomy).', analysis: 'JUGA SANGAT RELEVAN. Tindakan transfusi jelas merupakan wujud Beneficence. Namun, dalam situasi darurat, kewajiban untuk mencegah kerugian (Non-Maleficence) sering dianggap sebagai landasan etis yang lebih mendesak dan fundamental sebelum beranjak ke tindakan "kebaikan" lainnya.' },
                 { id: 'autonomy-justice', name: 'Autonomy - Justice', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">🏛️</div></div>`, description: 'Konflik antara hak otonomi pasien dan prinsip keadilan (distribusi sumber daya).', analysis: 'KURANG SESUAI. Kasus ini tidak berfokus pada alokasi sumber daya yang adil atau perbandingan dengan pasien lain. Isunya adalah konflik internal pada penanganan satu pasien.' },
                 { id: 'nonmaleficence-beneficence', name: 'Non-Maleficence - Beneficence', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-purple-100"><div class="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center text-3xl">🔄</div></div>`, description: 'Konflik di mana suatu tindakan yang bertujuan baik juga berisiko menimbulkan kerugian.', analysis: 'KURANG SESUAI. Dilema ini biasanya terjadi pada pengobatan berisiko tinggi (misal: kemoterapi). Di sini, manfaat transfusi sangat jelas dan risikonya jauh lebih kecil daripada kematian, sehingga bukan ini konflik utamanya.' },
                 { id: 'justice-nonmaleficence', name: 'Justice - Non-Maleficence', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-gray-100"><div class="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-3xl">📋</div></div>`, description: 'Konflik antara keadilan dan kewajiban untuk tidak merugikan.', analysis: 'TIDAK SESUAI. Kasus ini tidak secara langsung mengangkat isu keadilan dalam pelayanan kesehatan yang berbenturan dengan prinsip tidak merugikan.' },
            ],
            quiz: [
                { question: "Penolakan transfusi darah oleh keluarga pasien berdasarkan keyakinan agama mereka merupakan perwujudan dari prinsip...", options: ["Justice", "Autonomy", "Beneficence", "Non-Maleficence"], answer: "Autonomy" },
                { question: "Kewajiban dokter untuk mencegah kematian pasien dengan memberikan transfusi, meskipun ditolak, paling kuat didasari oleh prinsip...", options: ["Autonomy", "Justice", "Non-Maleficence", "Paternalisme"], answer: "Non-Maleficence" },
                { question: "Dalam situasi gawat darurat yang mengancam nyawa, tindakan dokter yang bertentangan dengan keinginan keluarga seringkali didasarkan pada prioritas untuk...", options: ["Menghindari tuntutan hukum", "Mengikuti protokol rumah sakit", "Mencegah kerugian/kematian pada pasien", "Menghabiskan stok darah"], answer: "Mencegah kerugian/kematian pada pasien" },
                { question: "Mengapa prinsip 'Justice' (Keadilan) kurang relevan dalam dilema utama kasus ini?", options: ["Karena keadilan tidak penting dalam kedokteran", "Karena kasus tidak membahas alokasi sumber daya atau perlakuan antar pasien", "Karena pasien memiliki asuransi", "Karena dokternya adil"], answer: "Karena kasus tidak membahas alokasi sumber daya atau perlakuan antar pasien" },
                { question: "Berdasarkan analisis yang menekankan pada kewajiban untuk tidak mencelakai, manakah dilema sentral pada kasus ini?", options: ["Beneficence - Justice", "Autonomy - Justice", "Beneficence - Non-Maleficence", "Non-Maleficence - Autonomy"], answer: "Non-Maleficence - Autonomy" }
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
                        <h4 class="font-semibold text-slate-700">Analisis Relevansi dengan Kasus:</h4>
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
                    label: 'Tingkat Relevansi',
                    data: diagnoses.map(d => d.matchScore),
                    backgroundColor: diagnoses.map(d => d.matchScore >= 9 ? '#059669' : (d.matchScore >= 5 ? '#34d399' : '#a7f3d0')),
                    borderColor: diagnoses.map(d => d.matchScore >= 9 ? '#065f46' : (d.matchScore >= 5 ? '#059669' : '#6ee7b7')),
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
                        x: { beginAtZero: true, max: 10, title: { display: true, text: 'Skor Relevansi (0-10)', font: { size: 14 } } },
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
                    ${currentQuestion.options.map(option => `<button class="option-btn w-full text-left p-4 border-2 border-slate-200 rounded-lg text-slate-700 font-medium">${option}</button>`).join('')}
                </div>
            `;
            updateProgress();
            
            const nextBtn = quizContainer.querySelector('#next-btn');
            if(nextBtn) nextBtn.disabled = true;

            quizBody.querySelectorAll('.option-btn').forEach(button => {
                button.addEventListener('click', () => {
                    quizBody.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
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
                progressBar.style.width = `${((currentQuestionIndex) / quizData.length) * 100}%`;
            }
        }

        function showResults() {
            quizContainer.querySelector('#progress-bar').style.width = '100%';
            quizContainer.querySelector('#quiz-header').classList.add('hidden');
            quizContainer.querySelector('#quiz-body').classList.add('hidden');
            quizContainer.querySelector('#quiz-footer').classList.add('hidden');
            
            const resultContainer = quizContainer.querySelector('#result-container');
            resultContainer.classList.remove('hidden');

            resultContainer.querySelector('#score-text').textContent = `${score}/${quizData.length}`;

            const feedbackText = resultContainer.querySelector('#feedback-text');
            const percentage = (score / quizData.length) * 100;
            if (percentage < 60) {
                feedbackText.textContent = "Sepertinya perlu meninjau kembali materinya.";
            } else if (percentage < 90) {
                feedbackText.textContent = "Pemahaman yang baik!";
            } else {
                feedbackText.textContent = "Luar biasa! Pemahaman Anda sangat mendalam.";
            }
        }

        quizContainer.addEventListener('click', (e) => {
            if (e.target.id === 'next-btn') {
                 if (selectedAnswer === null) return;
                if (selectedAnswer === quizData[currentQuestionIndex].answer) { score++; }
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