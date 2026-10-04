function initNavToggle() {
    const toggleBtn = document.getElementById("nav-toggle-btn");
    const nav = document.querySelector("header nav");
    if (!toggleBtn || !nav) return;

    toggleBtn.addEventListener("click", function () {
        nav.classList.toggle("nav-open");
    });
}

// ===== Konfirmasi hapus (front-end only, belum ke server) =====
function initHapusConfirm() {
    document.addEventListener("click", function (e) {
        const btn = e.target.closest(".btn-hapus");
        if (!btn) return;

        const row = btn.closest("tr");
        const nama = row ? row.querySelector("td")?.textContent : "data ini";
        const yakin = confirm("Yakin ingin menghapus \"" + nama + "\"?");
        if (yakin && row) {
            row.remove();
        }
    });
}

// ===== Filter/pencarian tabel real-time =====
function initTableFilter() {
    const input = document.getElementById("search-input");
    const table = document.querySelector(".table-responsive table");
    if (!input || !table) return;

    input.addEventListener("keyup", function () {
        const keyword = input.value.toLowerCase();
        const rows = table.querySelectorAll("tbody tr");
        rows.forEach(function (row) {
            const teks = row.textContent.toLowerCase();
            row.style.display = teks.includes(keyword) ? "" : "none";
        });
    });
}

// ===== Validasi form (client-side) =====
function initValidasiForm() {
    const form = document.getElementById("form-tambah");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        let valid = true;
        const messages = [];
        const previousError = form.parentElement.querySelector(".client-validation-error");
        if (previousError) {
            previousError.remove();
        }

        const judul = form.querySelector("[name='judul'], [name='nama']");
        if (judul && judul.value.trim() === "") {
            messages.push("Judul wajib diisi.");
            valid = false;
        }

        const pengarang = form.querySelector("[name='pengarang']");
        if (pengarang && pengarang.value.trim() === "") {
            messages.push("Pengarang wajib diisi.");
            valid = false;
        }

        const tahun = form.querySelector("[name='tahun']");
        if (tahun) {
            const nilai = parseInt(tahun.value, 10);
            if (isNaN(nilai) || nilai < 1900 || nilai > 2026) {
                messages.push("Tahun harus di antara 1900-2026.");
                valid = false;
            }
        }

        const stok = form.querySelector("[name='stok']");
        if (stok) {
            const nilai = parseInt(stok.value, 10);
            if (isNaN(nilai) || nilai < 0) {
                messages.push("Stok tidak boleh negatif.");
                valid = false;
            }
        }

        if (!valid) {
            e.preventDefault();
            const error = document.createElement("p");
            error.className = "flash flash-error client-validation-error";
            error.textContent = messages.join(" ");
            form.insertAdjacentElement("beforebegin", error);
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    initNavToggle();
    initHapusConfirm();
    initTableFilter();
    initValidasiForm();
});