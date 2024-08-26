const inputTargetKalori = document.getElementById("input-target-kalori");
const listContainers = document.getElementsByClassName("list-container");
const jenisMakanan = document.getElementById("jenis-makanan");
const kaloriMakanan = document.getElementById("kalori-makanan");
const listMakananDetail = document.getElementById("list-makanan-detail");
const subTitle = document.getElementById("h6");
let kesimpulan = document.createElement("h7");
//jika menggunakan classname maka harus memilih element dulu seperti code dibawah
//listContainers[0] adalah element pertama yang dipilih dan akan digunakan untuk create elemen h5
const listContainer = listContainers.length > 0 ? listContainers[0] : null;

let totalTargetkalori = 0;

// Cek jika ada nilai tersimpan di localStorage saat halaman dimuat
if (localStorage.getItem("totalTargetkalori")) {
  totalTargetkalori = parseInt(localStorage.getItem("totalTargetkalori"));
  displayStoredTargetKalori();
}

function addTaskSatu() {
  if (inputTargetKalori.value === "") {
    alert(
      "Tolong isi dulu target kalorimu, atau kalau tanpa target jangan klik Add!"
    );
  } else {
    function addNumberTargetKalori() {
      const valueInputTargetKalori = parseInt(inputTargetKalori.value);
      if (!isNaN(valueInputTargetKalori)) {
        totalTargetkalori = valueInputTargetKalori;
        // Simpan totalTargetkalori ke localStorage
        localStorage.setItem("totalTargetkalori", totalTargetkalori);
      }
    }
    addNumberTargetKalori();

    const overwrite = listContainer.querySelectorAll("h5");
    overwrite.forEach((header) => header.remove());

    let targetKalori = document.createElement("h5");
    targetKalori.innerHTML = `Target kalori kamu adalah ${totalTargetkalori}`;
    listContainer.appendChild(targetKalori);
    inputTargetKalori.value = "";

    if (totalTargetkalori > total) {
      kesimpulan.innerHTML = `Kamu kurang makan ${
        totalTargetkalori - total
      } kalori`;
    } else if (totalTargetkalori === 0 && totalTargetkalori < total) {
      kesimpulan.innerHTML = `Kamu sudah makan ${
        total - totalTargetkalori
      } kalori`;
    } else if (totalTargetkalori < total) {
      kesimpulan.innerHTML = `Kamu kebanyakan makan ${
        total - totalTargetkalori
      } kalori`;
    } else if (totalTargetkalori === total) {
      kesimpulan.innerHTML = `Kamu sudah makan sesuai kalori`;
    } else if (totalTargetkalori === 0 && total === 0) {
      kesimpulan.remove();
    }
    listContainer.appendChild(kesimpulan);
  }
}

// Fungsi untuk menampilkan target kalori yang tersimpan saat halaman dimuat
function displayStoredTargetKalori() {
  const storedTargetKalori = localStorage.getItem("totalTargetkalori");
  if (storedTargetKalori) {
    let targetKalori = document.createElement("h5");
    targetKalori.innerHTML = `Target kalori kamu adalah ${storedTargetKalori}`;
    listContainer.appendChild(targetKalori);
  }
}

let total = 0;

// Cek jika ada nilai tersimpan di localStorage saat halaman dimuat
if (localStorage.getItem("total")) {
  total = parseInt(localStorage.getItem("total"));
  displayStoredMakanan();
}

// Cek status subtitle di localStorage
if (localStorage.getItem("subTitleVisible") === "true") {
  subTitle.style.display = "block";
}

function addTaskDua() {
  if (jenisMakanan.value === "" || kaloriMakanan.value === "") {
    alert("Isi dulu jenis makanan dan kalorinya berapa");
  } else {
    function addNumber() {
      let kaloriResult = document.createElement("li");
      kaloriResult.innerHTML = `${jenisMakanan.value} dengan kalori ${kaloriMakanan.value}`;
      listMakananDetail.appendChild(kaloriResult);

      const number = parseInt(kaloriMakanan.value, 10);
      let span = document.createElement("span");
      span.setAttribute("data-number", number);
      span.innerHTML = "\u00d7";
      kaloriResult.appendChild(span);

      if (!isNaN(number)) {
        total += number;
        // Simpan total dan list makanan ke localStorage
        localStorage.setItem("total", total);
        saveMakananToLocalStorage(jenisMakanan.value, number);

        span.addEventListener("click", function () {
          const numberToSubtract = parseInt(
            this.getAttribute("data-number"),
            10
          );
          total -= numberToSubtract;
          this.parentElement.remove();
          updateLocalStorageAfterRemoval(jenisMakanan.value, numberToSubtract);
          updateKesimpulan();
        });
      }

      subTitle.style.display = "block";
      // Simpan status subTitle ke localStorage
      localStorage.setItem("subTitleVisible", "true");

      jenisMakanan.value = "";
      kaloriMakanan.value = "";
      updateKesimpulan();
    }
    addNumber();
  }
}

function saveMakananToLocalStorage(jenis, kalori) {
  let makananList = JSON.parse(localStorage.getItem("makananList")) || [];
  makananList.push({ jenis: jenis, kalori: kalori });
  localStorage.setItem("makananList", JSON.stringify(makananList));
}

function displayStoredMakanan() {
  let makananList = JSON.parse(localStorage.getItem("makananList")) || [];
  makananList.forEach((item) => {
    let kaloriResult = document.createElement("li");
    kaloriResult.innerHTML = `${item.jenis} dengan kalori ${item.kalori}`;
    listMakananDetail.appendChild(kaloriResult);

    let span = document.createElement("span");
    span.setAttribute("data-number", item.kalori);
    span.innerHTML = "\u00d7";
    kaloriResult.appendChild(span);

    span.addEventListener("click", function () {
      const numberToSubtract = parseInt(this.getAttribute("data-number"), 10);
      total -= numberToSubtract;
      this.parentElement.remove();
      updateLocalStorageAfterRemoval(item.jenis, numberToSubtract);
      updateKesimpulan();
    });

    listMakananDetail.appendChild(kaloriResult);
  });
  updateKesimpulan();
}

function updateLocalStorageAfterRemoval(jenis, kalori) {
  let makananList = JSON.parse(localStorage.getItem("makananList")) || [];
  makananList = makananList.filter(
    (item) => !(item.jenis === jenis && item.kalori === kalori)
  );
  localStorage.setItem("makananList", JSON.stringify(makananList));
  localStorage.setItem("total", total);
}

function updateKesimpulan() {
  if (totalTargetkalori > total) {
    kesimpulan.innerHTML = `Kamu kurang makan ${
      totalTargetkalori - total
    } kalori`;
  } else if (totalTargetkalori === 0 && totalTargetkalori < total) {
    kesimpulan.innerHTML = `Kamu sudah makan ${
      total - totalTargetkalori
    } kalori`;
  } else if (totalTargetkalori < total) {
    kesimpulan.innerHTML = `Kamu kebanyakan makan ${
      total - totalTargetkalori
    } kalori`;
  } else if (totalTargetkalori === total) {
    kesimpulan.innerHTML = `Kamu sudah makan sesuai kalori`;
  } else if (totalTargetkalori === 0 && total === 0) {
    kesimpulan.remove();
  }
  listContainer.appendChild(kesimpulan);
}

function deleteLocalStorage() {
  // Hapus semua item dari localStorage
  localStorage.clear();

  // Reset variabel yang terkait
  total = 0;
  totalTargetkalori = 0;

  // Kosongkan tampilan hasil yang terkait
  listMakananDetail.innerHTML = "";
  kesimpulan.innerHTML = "";
  subTitle.style.display = "none";

  // Hapus elemen <h5> yang menampilkan target kalori
  const targetKaloriElement = listContainer.querySelector("h5");
  if (targetKaloriElement) {
    targetKaloriElement.remove();
  }

  // Jika ada elemen tambahan yang perlu di-reset, bisa ditambahkan di sini
  console.log("Local storage telah dihapus dan data telah di-reset.");
}
document
  .getElementById("deleteButton")
  .addEventListener("click", deleteLocalStorage);
