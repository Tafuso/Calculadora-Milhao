var acumulado = 0;
var investimentoInicial = 0;
var investimentoMensal = 0;
var taxaJuros = 0;
var valorAlmejado = 0;
const resposta = document.querySelector("#resultado");

function pegarValor() {
  investimentoInicial = parseFloat(
    document.querySelector("#valor-inicial").value
  );
  investimentoMensal = parseFloat(
    document.querySelector("#valor-mensal").value
  );
  taxaJuros = parseFloat(document.querySelector("#rentabilidade").value) / 12;
  valorAlmejado = parseFloat(document.querySelector("#valor-almejado").value);

  if (taxaJuros > 0 && (investimentoInicial > 0 || investimentoMensal > 0)) {
    calcular(investimentoInicial, investimentoMensal, taxaJuros);
  } else if (investimentoMensal > 0) {
    acumulado = investimentoInicial || 0;
    for (var tempo = 0; acumulado < valorAlmejado; tempo++) {
      acumulado += investimentoMensal;
    }
    resposta.innerHTML = `${(tempo / 12).toFixed(2)} anos`;
  } else {
    resposta.innerHTML = "--";
  }
}

function calcular(x, y, z) {
  acumulado = x || 0;
  y = y || 0;
  for (var tempo = 0; acumulado < valorAlmejado; tempo++) {
    acumulado = (acumulado * z) / 100 + acumulado;
    acumulado += y;
  }
  resposta.innerHTML = `${(tempo / 12).toFixed(2)} anos`;
}
