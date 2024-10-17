const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "/", "*", "-", "+", "="];
let output = "";
let acClickCount = 0;
let acClickTimeout;

// Fungsi untuk menjalankan kalkulasi
const calculate = (btnValue) => {
    // Fokus pada tampilan
    display.focus();

    // Handle double click on AC button
    if (btnValue === "AC") {
        acClickCount++;
        clearTimeout(acClickTimeout);
        
        // Set a timeout to reset the click count
        acClickTimeout = setTimeout(() => {
            if (acClickCount === 1) {
                // Hapus karakter terakhir jika hanya satu klik
                output = output.slice(0, -1);
            } else if (acClickCount >= 2) {
                // Hapus semua jika dua klik
                output = "";
            }
            display.value = output;
            acClickCount = 0; // Reset click count
        }, 300); // 300 ms for double click detection
        return; // Exit early to avoid further processing
    }

    // Handle +/- button
    if (btnValue === "+/-") {
        if (output) {
            output = (parseFloat(output) * -1).toString(); // Toggle the sign
        }
        display.value = output;
        return;
    }

    if (btnValue === "=" && output !== "") {
        try {
            // Gunakan eval untuk menghitung hasil
            output = eval(output.replace("%", "*0.01"));
        } catch (e) {
            output = "Error"; // Jika ada kesalahan
        }
    } else if (btnValue === "^") {
        // Hitung pangkat 2 (squared)
        if (output !== "") {
            try {
                const value = parseFloat(output);
                output = (value * value).toString(); // Menghitung nilai kuadrat
            } catch (e) {
                output = "Error"; // Jika ada kesalahan
            }
        }
    } else {
        // Cegah menambahkan operator di awal
        if (output === "" && specialChars.includes(btnValue)) return;

        // Tambahkan nilai tombol ke output
        output += btnValue;
    }

    // Tampilkan hasil di display
    display.value = output;
};

// Event listener untuk tiap tombol
buttons.forEach((button) => {
    button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});
