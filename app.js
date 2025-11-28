// URL CSV Google Sheets kamu
const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR-Iw7Ou8GyhlBVW_aVhj6xPlncGhtMgYBzzHxnCXMkY5-pNp0lAzEXgov7SM8MlrvaKASy0-AQzQk4/pub?output=csv";

// Fungsi untuk mengambil CSV
async function fetchCSV(url) {
  const response = await fetch(url);
  const data = await response.text();
  return parseCSV(data);
}

// Parse CSV menjadi array objek
function parseCSV(csv) {
  const lines = csv.split("\n").map(l => l.trim());
  const headers = lines[0].split(",");

  const items = lines.slice(1).map(line => {
    const cols = line.split(",");
    const obj = {};
    headers.forEach((h, i) => {
      obj[h.trim()] = cols[i] ? cols[i].trim() : "";
    });
    return obj;
  });

  return items;
}

// Menampilkan barang
function displayProducts(products) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";

  products.forEach(item => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${item.gambar}" class="product-image" alt="${item.nama}">
      <h3>${item.nama}</h3>
      <p>Jenis: ${item.jenis}</p>
      <p>Harga: Rp ${item.harga}</p>
      <p>Stok: ${item.stok}</p>
    `;

    container.appendChild(card);
  });
}

// Mulai load data
fetchCSV(sheetURL)
  .then(data => {
    console.log("Data berhasil di-load:", data);
    displayProducts(data);
  })
  .catch(err => console.error("Error loading data:", err));
