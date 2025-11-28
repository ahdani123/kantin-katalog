// URL Google Sheets JSON (GVIZ)
const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR-Iw7Ou8GyhlBVW_aVhj6xPlncGhtMgYBzzHxnCXMkY5-pNp0lAzEXgov7SM8MlrvaKASy0-AQzQk4/gviz/tq?tqx=out:json";

async function loadData() {
    const response = await fetch(sheetURL);
    let text = await response.text();

    // GVIZ JSON memiliki karakter tambahan "google.visualization.Query.setResponse(...)"
    text = text.substring(text.indexOf("{"), text.lastIndexOf("}") + 1);

    const data = JSON.parse(text);

    const rows = data.table.rows.map(r => {
        return {
            nama: r.c[0]?.v || "",
            harga: r.c[1]?.v || "",
            jenis: r.c[2]?.v || "",
            stok: r.c[3]?.v || "",
            gambar: r.c[4]?.v || ""
        };
    });

    displayProducts(rows);
}

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

loadData();
              
