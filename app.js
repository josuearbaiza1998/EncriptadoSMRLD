const LETRAS = "abcdefghijklmnñopqrstuvwxyz";

const form = document.getElementById("form");
const entrada = document.getElementById("entrada");
const error = document.getElementById("error");
const resultado = document.getElementById("resultado");
const salida = document.getElementById("salida");
const descargar = document.getElementById("descargar");

for (const letra of LETRAS) {
  const li = document.createElement("li");
  const l = document.createElement("span");
  l.className = "letra";
  l.textContent = letra;
  const s = document.createElement("span");
  s.className = "simbolo";
  s.textContent = letra;
  li.append(l, s);
  document.getElementById("clave").append(li);
}

entrada.addEventListener("input", () => { error.hidden = true; });

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const texto = entrada.value.trim();
  if (!texto) {
    error.hidden = false;
    entrada.focus();
    return;
  }
  error.hidden = true;
  salida.textContent = texto.toLowerCase();
  resultado.hidden = false;
  descargar.hidden = false;
});

function cortar(ctx, texto, anchoMax) {
  const lineas = [];
  for (const parrafo of texto.split("\n")) {
    if (!parrafo.trim()) { lineas.push(""); continue; }
    let actual = "";
    for (const palabra of parrafo.split(/\s+/)) {
      const prueba = actual ? actual + " " + palabra : palabra;
      if (ctx.measureText(prueba).width <= anchoMax) {
        actual = prueba;
      } else {
        if (actual) lineas.push(actual);
        actual = palabra;
      }
    }
    lineas.push(actual);
  }
  return lineas;
}

descargar.addEventListener("click", async () => {
  const texto = salida.textContent;
  if (!texto) return;

  const tam = 56;
  const interlinea = 96;
  const margen = 64;
  const ancho = 1000;

  try { await document.fonts.load(`${tam}px "Encriptado SMRLD"`); } catch (_) {}

  const medidor = document.createElement("canvas").getContext("2d");
  medidor.font = `${tam}px "Encriptado SMRLD"`;
  const lineas = cortar(medidor, texto, ancho - margen * 2);

  const alto = margen * 2 + lineas.length * interlinea;
  const escala = 2;
  const lienzo = document.createElement("canvas");
  lienzo.width = ancho * escala;
  lienzo.height = alto * escala;

  const ctx = lienzo.getContext("2d");
  ctx.scale(escala, escala);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, ancho, alto);
  ctx.fillStyle = "#1a1a18";
  ctx.font = `${tam}px "Encriptado SMRLD"`;
  ctx.textBaseline = "alphabetic";

  lineas.forEach((linea, i) => {
    ctx.fillText(linea, margen, margen + tam + i * interlinea);
  });

  const enlace = document.createElement("a");
  enlace.download = "mensaje-cifrado.png";
  enlace.href = lienzo.toDataURL("image/png");
  enlace.click();
});
