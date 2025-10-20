class Parquimetro {
  constructor(maxTempo = 120) {
    this.saldo = 0;
    this.tempoTotal = 0;
    this.tempoRestante = 0;
    this.maxTempo = maxTempo;
    this.cronometro = null;

    // Elementos da interface
    this.saldoEl = document.getElementById("saldo");
    this.tempoEl = document.getElementById("tempoDisplay");
  }

  adicionarSaldo(valor) {
    if (isNaN(valor) || valor <= 0) {
      alert("Digite um valor válido!");
      return;
    }
    this.saldo += valor;
    this.atualizarTela();
  }

  adicionarTempo(minutos) {
    if (![30, 60, 120].includes(minutos)) {
      alert("Digite 30, 60 ou 120 minutos!");
      return;
    }

    const custo = this.calcularCusto(minutos);

    if (this.saldo < custo) {
      alert("Saldo insuficiente!");
      return;
    }

    if (this.tempoTotal + minutos > this.maxTempo) {
      alert(`Tempo máximo permitido é ${this.maxTempo} minutos!`);
      return;
    }

    // Debita saldo e soma tempo
    this.saldo -= custo;
    this.tempoTotal += minutos;
    this.tempoRestante += minutos;

    // Inicia contagem se ainda não estiver rodando
    if (!this.cronometro) {
      this.iniciarContagem();
    }

    this.atualizarTela();
  }

  calcularCusto(minutos) {
    const tabela = {
      30: 1.00,
      60: 1.75,
      120: 3.00
    };
    return tabela[minutos] || 0;
  }

  atualizarTela() {
    this.saldoEl.textContent = `Saldo: R$ ${this.saldo.toFixed(2)}`;
    this.tempoEl.textContent = `Tempo total: ${this.tempoTotal} min | Restante: ${this.tempoRestante} min`;
  }

  iniciarContagem() {
    this.cronometro = setInterval(() => {
      if (this.tempoRestante > 0) {
        this.tempoRestante--;
        this.atualizarTela();
      } else {
        clearInterval(this.cronometro);
        this.cronometro = null;
        alert("Tempo esgotado!");
      }
    }, 1000 * 60); // 1 minuto
  }
}

// --- Instância e interações ---
const parquimetro = new Parquimetro();

document.getElementById("btnAdicionarSaldo").addEventListener("click", () => {
  const valor = parseFloat(document.getElementById("valor").value);
  parquimetro.adicionarSaldo(valor);
  document.getElementById("valor").value = "";
});

document.getElementById("btnAdicionarTempo").addEventListener("click", () => {
  const minutos = parseInt(document.getElementById("tempoDesejado").value);
  parquimetro.adicionarTempo(minutos);
  document.getElementById("tempoDesejado").value = "";
});
