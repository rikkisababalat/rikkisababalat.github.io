        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'option-a', name: 'Tidak perlu tampon segera', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">🩸</div></div>`, description: 'Menyatakan tidak perlu memasang tampon telinga dengan segera.', analysis: 'TIDAK SESUAI. Ini adalah pernyataan pengecualian. Karena ada perdarahan aktif dari luka robek, tindakan hemostasis (menghentikan perdarahan) adalah prioritas. Ini mungkin memerlukan pemasangan tampon steril. Jadi, menyatakan "tidak perlu" secara absolut adalah tidak tepat.' },
                { id: 'option-b', name: 'Komplikasi: Tuli Konduktif', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">📉</div></div>`, description: 'Menyatakan komplikasi pasien adalah tuli konduktif.', analysis: 'SANGAT SESUAI. Robekan pada membran timpani secara langsung mengganggu mekanisme penghantaran suara, yang merupakan definisi dari tuli konduktif. Ini adalah komplikasi yang paling umum dan diharapkan.' },
                { id: 'option-c', name: 'Edukasi: Jangan korek/berenang', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-green-100"><div class="w-12 h-12 bg-green-300 rounded-full flex items-center justify-center text-3xl">🏊‍♂️</div></div>`, description: 'Menganjurkan pasien untuk tidak mengorek telinga dan tidak berenang.', analysis: 'SANGAT SESUAI. Menjaga liang telinga tetap kering dan menghindari trauma tambahan adalah pilar utama penatalaksanaan konservatif untuk mempercepat penyembuhan dan mencegah infeksi sekunder (otitis media).' },
                { id: 'option-d', name: 'Jangan beri Tobramisin tetes', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-3xl">🚫</div></div>`, description: 'Menyatakan untuk tidak memberikan antibiotik tobramisin tetes telinga.', analysis: 'SANGAT SESUAI. Tobramisin adalah antibiotik aminoglikosida yang bersifat ototoksik. Penggunaannya pada telinga dengan membran timpani berlubang merupakan kontraindikasi karena dapat menyebabkan kerusakan permanen pada telinga dalam.' },
                { id: 'option-e', name: 'Operasi jika >2 bulan', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-purple-100"><div class="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center text-3xl">⏳</div></div>`, description: 'Menyatakan tindakan operatif jarang diperlukan kecuali robekan menetap >2 bulan.', analysis: 'SANGAT SESUAI. Sebagian besar kasus perforasi traumatik sembuh secara spontan. Operasi (timpanoplasti) hanya dipertimbangkan jika penyembuhan gagal setelah periode observasi yang cukup (umumnya 2-3 bulan).' },
            ],
            quiz: [
                { question: "Apa komplikasi gangguan pendengaran yang paling umum dari robekan membran timpani?", options: ["Tuli Sensorineural", "Tuli Konduktif", "Tuli Campuran", "Tinnitus"], answer: "Tuli Konduktif" },
                { question: "Mengapa antibiotik seperti tobramisin tetes telinga berbahaya pada kasus ini?", options: ["Menyebabkan reaksi alergi", "Tidak efektif untuk bakteri di telinga", "Bersifat ototoksik dan bisa merusak telinga dalam", "Menghambat penyembuhan luka"], answer: "Bersifat ototoksik dan bisa merusak telinga dalam" },
                { question: "Kapan tindakan operasi (timpanoplasti) biasanya dipertimbangkan untuk robekan membran timpani?", options: ["Segera setelah kecelakaan", "Jika pasien mengeluh nyeri", "Jika tidak sembuh spontan setelah 2-3 bulan", "Jika terjadi pada anak-anak"], answer: "Jika tidak sembuh spontan setelah 2-3 bulan" },
                { question: "Manakah anjuran yang PALING PENTING untuk pasien demi mendukung penyembuhan?", options: ["Minum obat pereda nyeri", "Banyak beristirahat", "Menjaga telinga agar tetap kering dan tidak mengoreknya", "Menggunakan penutup telinga saat tidur"], answer: "Menjaga telinga agar tetap kering dan tidak mengoreknya" },
                { question: "Dalam kondisi spesifik apa pemasangan tampon telinga mungkin diperlukan pada pasien ini?", options: ["Untuk menyerap nanah", "Untuk memasukkan obat", "Jika ada perdarahan aktif yang perlu dihentikan", "Untuk mengurangi rasa sakit"], answer: "Jika ada perdarahan aktif yang perlu dihentikan" }
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
                        <h4 class="font-semibold text-slate-700">Analisis Pernyataan:</h4>
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
                    label: 'Tingkat Kebenaran',
                    data: diagnoses.map(d => d.matchScore),
                    backgroundColor: diagnoses.map(d => d.matchScore >= 9 ? '#059669' : '#f87171'),
                    borderColor: diagnoses.map(d => d.matchScore >= 9 ? '#065f46' : '#b91c1c'),
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
                        x: { beginAtZero: true, max: 10, title: { display: true, text: 'Skor Kebenaran (0-10)', font: { size: 14 } } },
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