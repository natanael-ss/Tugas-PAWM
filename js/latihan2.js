let currentQuestion = 1;
const totalQuestions = 4;
const correctAnswers = {
    1: "menari",
    2: "penambang",
    3: "terpercayakan",
    4: "menyepakati"
};

function checkAnswer() {
    const dropArea = document.getElementById(`drop-area-${currentQuestion}`);
    const userAnswer = dropArea.textContent.trim();
    const correctAnswer = correctAnswers[currentQuestion];
    const notification = document.getElementById('notification');

    if (userAnswer === '') {
        dropArea.style.border = '2px solid red';  // Penanda jika belum diisi
        notification.innerHTML = `<span style="color: red;">Soal ${currentQuestion} belum diisi. Silakan pilih jawaban.</span>`;
    } else {
        dropArea.style.border = '2px solid green';  // Reset border setelah diisi
        if (userAnswer === correctAnswer) {
            notification.innerHTML = `<span class="notification-success">Jawaban benar!</span>`;
        } else {
            notification.innerHTML = `<span class="notification-wrong">Jawaban salah. Jawaban yang benar: ${correctAnswer}</span>`;
        }

        // Sembunyikan tombol submit setelah jawaban diberikan
        document.getElementById('submit-btn').style.display = 'none';

        // Lanjutkan ke soal berikutnya
        setTimeout(() => {
            notification.innerHTML = '';  // Bersihkan notifikasi
            nextQuestion();
        }, 2000);  // Delay 2 detik sebelum lanjut ke soal berikutnya
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
function goBackToMaterial() {
    // Ganti ini dengan link halaman materi, misalnya ke homepage atau halaman materi
    window.location.href = 'tatakataMateri.html';
}
// Fungsi drag-and-drop tetap sama
document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', e.target.textContent);
    });
});

document.querySelectorAll('.drop-area').forEach((area, index) => {
    area.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    area.addEventListener('drop', (e) => {
        const data = e.dataTransfer.getData('text');
        e.target.textContent = data;
    });
});
