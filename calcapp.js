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
      kesimpulan.innerHTML = `Kamu kurang makan ${
        totalTargetkalori - total
      } kalori`;
      listContainer.appendChild(kesimpulan);
    } else if (totalTargetkalori === 0 && totalTargetkalori < total) {
      kesimpulan.innerHTML = `Kamu sudah makan ${
        total - totalTargetkalori
      } kalori`;
      listContainer.appendChild(kesimpulan);
    } else if (totalTargetkalori < total) {
      kesimpulan.innerHTML = `Kamu kebanyakan makan ${
        total - totalTargetkalori
      } kalori`;
      listContainer.appendChild(kesimpulan);
    } else if ((totalTargetkalori = total)) {
      kesimpulan.innerHTML = `Kamu sudah makan sesuai kalori`;
      listContainer.appendChild(kesimpulan);
    }
  }
}

let total = 0;
function addTaskDua() {
  if (jenisMakanan.value === "" || kaloriMakanan.value === "") {
    alert("isi dulu jenis makanan dan kalorinya berapa");
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
        span.addEventListener("click", function () {
          const numberToSubtract = parseInt(
            this.getAttribute("data-number"),
            10
          );
          total -= numberToSubtract;
          this.parentElement.remove();
          if (totalTargetkalori > total) {
            kesimpulan.innerHTML = `Kamu kurang makan ${
              totalTargetkalori - total
            } kalori`;
            listContainer.appendChild(kesimpulan);
          } else if (totalTargetkalori === 0 && totalTargetkalori < total) {
            kesimpulan.innerHTML = `Kamu sudah makan ${
              total - totalTargetkalori
            } kalori`;
            listContainer.appendChild(kesimpulan);
          } else if (totalTargetkalori < total) {
            kesimpulan.innerHTML = `Kamu kebanyakan makan ${
              total - totalTargetkalori
            } kalori`;
            listContainer.appendChild(kesimpulan);
          } else if ((totalTargetkalori = total)) {
            kesimpulan.innerHTML = `Kamu sudah makan sesuai kalori`;
            listContainer.appendChild(kesimpulan);
          }
        });
        kaloriResult.appendChild(span);
      }
      subTitle.style.display = "block";
      jenisMakanan.value = "";
      kaloriMakanan.value = "";
    }
    addNumber();

    if (totalTargetkalori > total) {
      kesimpulan.innerHTML = `Kamu kurang makan ${
        totalTargetkalori - total
      } kalori`;
      listContainer.appendChild(kesimpulan);
    } else if (totalTargetkalori === 0 && totalTargetkalori < total) {
      kesimpulan.innerHTML = `Kamu sudah makan ${
        total - totalTargetkalori
      } kalori`;
      listContainer.appendChild(kesimpulan);
    } else if (totalTargetkalori < total) {
      kesimpulan.innerHTML = `Kamu kebanyakan makan ${
        total - totalTargetkalori
      } kalori`;
      listContainer.appendChild(kesimpulan);
    } else if ((totalTargetkalori = total)) {
      kesimpulan.innerHTML = `Kamu sudah makan sesuai kalori`;
      listContainer.appendChild(kesimpulan);
    }
  }
}
