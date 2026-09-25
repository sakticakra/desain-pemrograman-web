// hamburger menu
function initNavToggle() {
    const toggleBtn = document.getElementById("nav-toggle-btn");
    const nav = document.querySelector("header nav");
    if (!toggleBtn || !nav) return;

    toggleBtn.addEventListener("click", function () {
        nav.classList.toggle("nav-open");
    });
}

// konfirmasi hapus
function initHapusConfirm() {
    document.querySelectorAll(".btn-hapus").forEach(function (btn) {
        btn.addEventListener("click", function () {
            const row = btn.closest("tr");
            const nama = row ? row.querySelector("td")?.textContent : "data ini";
            const yakin = confirm("Yakin ingin menghapus \"" + nama + "\"?");
            if (yakin && row) {
                row.remove();
            }
        });
    });
}

// pencarian tabel
function initTableFilter() {
    const input = document.getElementById("search-input");
    const table = document.querySelector(".table-responsive table");
    if (!input || !table) return;

    input.addEventListener("keyup", function () {
        const keyword = input.value.toLowerCase();
        const rows = table.querySelectorAll("tbody tr");
        rows.forEach(function (row) {
            const teks = row.textContent.toLowerCase();
            const isMatch = teks.includes(keyword);   
            row.style.display = isMatch ? "" : "none";
            if (isMatch) visibleCount++;
        });
    });
}

// Update counter
function updateCounter(table) {
    const totalRows = table.querySelectorAll("tbody tr").length;
    const visibleRows = Array.from(table.querySelectorAll("tbody tr"))
        .filter(row => row.style.display !== "none").length;

    let counterInfo = document.getElementById("table-counter");
    if (!counterInfo) {
        counterInfo = document.createElement("p");
        counterInfo.id = "table-counter";
        counterInfo.style.fontWeight = "bold";
        table.insertAdjacentElement("beforebegin", counterInfo);
    }
    counterInfo.textContent = `Menampilkan ${visibleRows} dari ${totalRows} data`;
}

// validasi form
function tampilkanError(input, pesan) {
    hapusError(input);
    const span = document.createElement("span");
    span.className = "error";
    span.textContent = pesan;
    input.insertAdjacentElement("afterend", span);
}

function hapusError(input) {
    const next = input.nextElementSibling;
    if (next && next.classList.contains("error")) {
        next.remove();
    }
}

function initValidasiForm() {
    const form = document.getElementById("form-tambah");
    if (!form) return;

    const validationRules = [
        {
            selector: "[name='judul'], [name='nama']",
            rule: (val) => val.trim() !== "", 
            message: "Field ini wajib diisi."
        },
        {
            selector: "[name='pengarang']",
            rule: (val) => val.trim() !== "",
            message: "Pengarang wajib diisi."
        },
    ];

    form.addEventListener("submit", function (e) {
        let isValid = true;

        validationRules.forEach(function (item) {
            const input = form.querySelector(item.selector); 
            if (input) {
                if (!item.rule(input.value)) {
                    tampilkanError(input, item.message);
                    isValid = false; 
                } else {
                    hapusError(input); 
                }
            }
        });

        if (!isValid) {
            e.preventDefault(); 
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    initNavToggle();
    initHapusConfirm();
    initTableFilter();
    initValidasiForm();
});