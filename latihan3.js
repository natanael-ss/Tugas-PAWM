let currentQuestion = 1;
const totalQuestions = 3; // Update if you have more questions
const correctAnswers = {
    1: "Saya akan pergi ke tujuan",  // Example answer for question 1
    2: "Budi pergi ke Bandung besok", // Example for question 2
    3: "Kami mau makan ayam goreng"  // Example for question 3
};

function checkAnswer() {
    const optionContainer = document.querySelector(`#question-${currentQuestion} .option-containerX`);
    const userAnswer = Array.from(optionContainer.children).map(option => option.textContent.trim()).join(" ");
    const correctAnswer = correctAnswers[currentQuestion];
    const notification = document.getElementById('notification');

    if (userAnswer === '') {
        notification.innerHTML = `<span style="color: red;">Soal ${currentQuestion} belum diisi. Silakan pilih jawaban.</span>`;
    } else {
        if (userAnswer === correctAnswer) {
            notification.innerHTML = `<span class="notification-success">Jawaban benar! Lanjut ke soal berikutnya...</span>`;

            // Sembunyikan tombol submit dan lanjutkan ke soal berikutnya setelah delay
            setTimeout(() => {
                notification.innerHTML = '';  // Bersihkan notifikasi
                nextQuestion();
            }, 2000);  // Delay 2 detik sebelum lanjut ke soal berikutnya

        } else {
            notification.innerHTML = `<span class="notification-wrong">Jawaban salah. Ayo coba lagi!</span>`;
        }
    }
}

function nextQuestion() {
    // Sembunyikan soal yang sekarang
    document.getElementById(`question-${currentQuestion}`).style.display = 'none';

    // Tampilkan soal selanjutnya
    currentQuestion++;

    if (currentQuestion <= totalQuestions) {
        document.getElementById(`question-${currentQuestion}`).style.display = 'block';
        document.getElementById('submit-btn').style.display = 'inline-block';  // Tampilkan lagi tombol submit
    } else {
        // Jika semua soal selesai
        document.getElementById('result').innerHTML = "<h3 class='result-message'>Latihan selesai! Terima kasih.</h3>";
        document.getElementById('quiz-container').style.display = 'none';
        document.getElementById('back-to-material').style.display='block';
    }

}

document.querySelectorAll('.optionX').forEach(option => {
    option.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', e.target.textContent);
    });
});

document.querySelectorAll('.option-containerX').forEach((container) => {
    container.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    container.addEventListener('drop', (e) => {
        const data = e.dataTransfer.getData('text');
        const draggedElement = Array.from(container.children).find(child => child.textContent === data);
        const targetElement = e.target;

        if (targetElement.classList.contains('optionX')) {
            // Swap the elements
            [draggedElement.textContent, targetElement.textContent] = [targetElement.textContent, draggedElement.textContent];
        }
    });
});

function goBackToMaterial() {
    // Ganti ini dengan link halaman materi, misalnya ke homepage atau halaman materi
    window.location.href = 'tatakalimatMateri.html';
}