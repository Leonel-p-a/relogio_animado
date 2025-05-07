let intervaloRelogio;
let intervaloTemporizador;

const relogio = document.getElementById('relogio');
const selecionar = document.getElementById('selecionar');
const inputTemporizador = document.getElementById('totalTemporizador');
const botaoIniciar = document.getElementById('iniciar-parar-contagem');

function iniciarRelogio() {
    intervaloRelogio = setInterval(() => {
        const horario = new Date();
        relogio.textContent = horario.toLocaleTimeString();
    }, 1000)
}

function pararRelogio() {
    clearInterval(intervaloRelogio);
}

function iniciarTemporizador(segundos) {
    relogio.textContent = segundos;

    intervaloTemporizador = setInterval(() => {
        segundos--;
        relogio.textContent = segundos;

        if (segundos <= 0) {
            clearInterval(intervaloTemporizador);
            document.getElementById('som-alarme').play(); // Toca o alarme
        }
    }, 1000)
}

selecionar.addEventListener('change', () => {
    const tipo = selecionar.value;

    if (tipo === 'temporizador') {
        inputTemporizador.disabled = false;
        botaoIniciar.disabled = false;
        pararRelogio();
    } else {
        inputTemporizador.disabled = true;
        botaoIniciar.disabled = true;
        relogio.textContent = '';
        inputTemporizador.value = '';
        clearInterval(intervaloTemporizador)
        iniciarRelogio();
    }
});

botaoIniciar.addEventListener('click', () => {
    clearInterval(intervaloTemporizador); /* Evita intervalos acumulados */
    const tempo = parseInt(inputTemporizador.value);

    if (!isNaN(tempo) && tempo > 0) {
        iniciarTemporizador(tempo);
    } else {
        alert('Insira um número válido de segundos.');
    }
});

/* inicia o relógio ao carregar a página */
iniciarRelogio();