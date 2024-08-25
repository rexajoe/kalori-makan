const inputTargetKalori = document.getElementById("input-target-kalori");
const listContainers = document.getElementsByClassName("list-container");
const jenisMakanan = document.getElementById("jenis-makanan");
const kaloriMakanan = document.getElementById("kalori-makanan");
const listMakananDetail = document.getElementById("list-makanan-detail");
const subTitle = document.getElementById("h6");

//jika menggunakan classname maka harus memilih element dulu seperti code dibawah
//listContainers[0] adalah element pertama yang dipilih dan akan digunakan untuk create elemen h5
const listContainer = listContainers.length > 0 ? listContainers[0] : null;

let totalTargetkalori = 0;
function addTaskSatu() {
  if (inputTargetKalori.value === "") {
    alert(
      "tolong isi dulu target kalorimu, atau kalo tanpa target gausah diklik Add!"
    );
  } else {
    function addNumberTargetKalori() {
      const valueInputTargetKalori = parseInt(inputTargetKalori.value);
      if (!isNaN(valueInputTargetKalori)) {
        totalTargetkalori = valueInputTargetKalori;
        console.log(totalTargetkalori);
      }
    }
    addNumberTargetKalori();
    const overwrite = listContainer.querySelectorAll("h5");
    overwrite.forEach((header) => header.remove());
    let targetKalori = document.createElement("h5");
    targetKalori.innerHTML = `Target kalori kamu adalah ${inputTargetKalori.value}`;
    listContainer.appendChild(targetKalori);
    inputTargetKalori.value = "";

    if (totalTargetkalori > total) {
      console.log(`kamu kurang makan ${totalTargetkalori - total} kalori`);
    } else {
      console.log(`kamu kelebihan makan ${total - totalTargetkalori}`);
    }
  }
}

let total = 0;
function addTaskDua() {
  if (jenisMakanan.value === "" || kaloriMakanan.value === "") {
    alert("isi dulu jenis makanan dan kalorinya berapa");
  } else {
    function addNumber() {
      const number = parseInt(kaloriMakanan.value, 10);
      if (!isNaN(number)) {
        total += number;
        console.log(total);
      }
    }
    addNumber();
    subTitle.style.display = "block";
    let kaloriResult = document.createElement("li");
    kaloriResult.innerHTML = `${jenisMakanan.value} dengan kalori ${kaloriMakanan.value}`;
    listMakananDetail.appendChild(kaloriResult);
    jenisMakanan.value = "";
    kaloriMakanan.value = "";
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    kaloriResult.appendChild(span);
    span.addEventListener("click", function () {
      this.parentElement.remove();
    });
    if (totalTargetkalori > total) {
      console.log(`kamu kurang makan ${totalTargetkalori - total} kalori`);
    } else {
      console.log(`kamu kelebihan makan ${total - totalTargetkalori}`);
    }
  }
}
