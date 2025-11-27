fetch('products.json')
  .then(r => r.json())
  .then(data => {
    const list = document.getElementById('productList');
    const jenisFilter = document.getElementById('jenisFilter');
    const hargaFilter = document.getElementById('hargaFilter');

    const jenisSet = ["all", ...new Set(data.map(d => d.jenis))];
    jenisSet.forEach(j => {
      jenisFilter.innerHTML += `<option value="${j}">${j}</option>`;
    });

    function hargaRange(harga, filter) {
      if (filter === "1") return harga < 3000;
      if (filter === "2") return harga >= 3000 && harga <= 5000;
      if (filter === "3") return harga > 5000;
      return true;
    }

    function render() {
      list.innerHTML = "";
      const jf = jenisFilter.value;
      const hf = hargaFilter.value;

      data
        .filter(p => (jf === "all" || p.jenis === jf))
        .filter(p => hargaRange(p.harga, hf))
        .forEach(p => {
          list.innerHTML += `
          <div class="item">
            <img src="${p.gambar}">
            <h3>${p.nama}</h3>
            <p>Rp ${p.harga}</p>
            <small>Jenis: ${p.jenis}</small><br>
            <strong class="${p.stok > 0 ? 'ready' : 'empty'}">
              ${p.stok > 0 ? 'Stok: ' + p.stok : 'Habis'}
            </strong>
          </div>`;
        });
    }

    render();
    jenisFilter.onchange = render;
    hargaFilter.onchange = render;
  });