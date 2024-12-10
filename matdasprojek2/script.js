function calculateSpeed() {
    const math = window.math; // Pastikan Math.js sudah digunakan

    // Ambil input dari pengguna
    const funcInput = document.getElementById('function').value; // Fungsi posisi
    const timeValue = parseFloat(document.getElementById('time').value); // Nilai t

    // Validasi input
    if (!funcInput || isNaN(timeValue)) {
        document.getElementById('result').innerHTML = 
            "<span style='color: red;'>Masukkan fungsi posisi dan nilai t yang valid!</span>";
        document.getElementById('explanation').innerHTML = ""; // Bersihkan penjelasan
        return;
    }

    try {
        // Parsir fungsi posisi menggunakan Math.js
        const expr = math.parse(funcInput.replace(/t/g, 'x')); // Ganti 't' dengan 'x' untuk konsistensi
        const derivative = math.derivative(expr, 'x'); // Turunan fungsi

        // Evaluasi turunan pada t yang diberikan
        const speed = derivative.evaluate({ x: timeValue });

        // Tampilkan hasil
        document.getElementById('result').innerHTML = `
            <strong>Hasil:</strong> Kecepatan = <strong>${speed.toFixed(2)} m/s</strong>
        `;

        // Penjelasan
        document.getElementById('explanation').innerHTML = `
            <div class="explanation-box">
                <p><strong>Penjelasan:</strong></p>
                <ol>
                    <li>Fungsi posisi yang diberikan adalah: \( x(t) = ${funcInput} \).</li>
                    <li>Turunan fungsi posisi adalah: \( v(t) = ${derivative.toString().replace(/x/g, 't')} \).</li>
                    <li>Evaluasi pada \( t = ${timeValue} \) menghasilkan \( v(${timeValue}) = ${speed.toFixed(2)} \, \text{m/s} \).</li>
                </ol>
            </div>
        `;

        // Render ulang MathJax untuk elemen baru
        MathJax.typeset();
    } catch (error) {
        document.getElementById('result').innerHTML = 
            "<span style='color: red;'>Fungsi posisi tidak valid. Periksa kembali input Anda!</span>";
        document.getElementById('explanation').innerHTML = "";
    }
}

