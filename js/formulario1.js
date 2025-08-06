function calcularResultado() {
  const respuestas = document.querySelectorAll('input[type="radio"]:checked');
  let conteo = { medellin: 0, leticia: 0, cartagena: 0 };

  if (respuestas.length < 11) {
    const modal = new bootstrap.Modal(document.getElementById('alertModal'));
    modal.show();
    return;
  }

  respuestas.forEach(r => {
    const ciudad = r.value.toLowerCase();
    if (conteo.hasOwnProperty(ciudad)) {
      conteo[ciudad]++;
    }
  });

  let max = 0;
  for (let ciudad in conteo) {
    if (conteo[ciudad] > max) {
      max = conteo[ciudad];
    }
  }

  let ciudades = [];
  for (let ciudad in conteo) {
    if (conteo[ciudad] === max) {
      ciudades.push(ciudad.charAt(0).toUpperCase() + ciudad.slice(1));
    }
  }

  const resultModal = document.getElementById('resultModal');
  const resultModalBody = document.getElementById('resultModalBody');
  const saberMasMedellin = document.getElementById('saberMasMedellin');
  const saberMasLeticia = document.getElementById('saberMasLeticia');
  const saberMasCartagena = document.getElementById('saberMasCartagena');

  // Hide all buttons initially
  saberMasMedellin.style.display = 'none';
  saberMasLeticia.style.display = 'none';
  saberMasCartagena.style.display = 'none';

  // Set modal content and show appropriate button(s)
  if (ciudades.length === 1) {
    resultModalBody.textContent = `Tu punto ideal para viajar es: ${ciudades[0]}`;
    if (ciudades[0] === 'Medellin') {
      saberMasMedellin.style.display = 'block';
    } else if (ciudades[0] === 'Leticia') {
      saberMasLeticia.style.display = 'block';
    } else if (ciudades[0] === 'Cartagena') {
      saberMasCartagena.style.display = 'block';
    }
  } else {
    resultModalBody.textContent = `Tus destinos ideales son: ${ciudades.join(" y ")}`;
    ciudades.forEach(ciudad => {
      if (ciudad === 'Medellin') {
        saberMasMedellin.style.display = 'block';
      } else if (ciudad === 'Leticia') {
        saberMasLeticia.style.display = 'block';
      } else if (ciudad === 'Cartagena') {
        saberMasCartagena.style.display = 'block';
      }
    });
  }

  const modal = new bootstrap.Modal(resultModal);
  modal.show();
}