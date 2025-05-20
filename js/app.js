let intervaloRelogio;
let intervaloTemporizador;
let estadoTemporizador = 'parado'; //'rodando', 'pausado'
let segundosRestantes = 0;

const relogio = document.getElementById('relogio');
const selecionar = document.getElementById('selecionar');
const inputTemporizador = document.getElementById('totalTemporizador');
const botaoIniciar = document.getElementById('iniciar-parar-contagem');
const botaoResetar = document.getElementById('resetar-temporizador');
const unidadeTempo = document.getElementById('unidade-tempo');

function iniciarRelogio() {
    intervaloRelogio = setInterval(() => {
        const horario = new Date();
        relogio.textContent = horario.toLocaleTimeString();
    }, 1000)
}

function pararRelogio() {
    clearInterval(intervaloRelogio);
}

function iniciarTemporizador() {
    relogio.textContent = formatarTempo(segundosRestantes);

    intervaloTemporizador = setInterval(() => {
        segundosRestantes--;
        relogio.textContent = formatarTempo(segundosRestantes);

        if (segundosRestantes <= 0) {
            clearInterval(intervaloTemporizador);
            document.getElementById('som-alarme').play(); // Toca o alarme
            botaoIniciar.textContent = 'Iniciar';
            estadoTemporizador = 'parado';
        }
    }, 1000)
}

function formatarTempo(segundos) {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segundosRestantes = segundos % 60;

    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;
}

selecionar.addEventListener('change', () => {
    const tipo = selecionar.value;

    if (tipo === 'temporizador') {
        inputTemporizador.disabled = false;
        botaoIniciar.disabled = false;
        botaoResetar.disabled = false;
        unidadeTempo.disabled = false;
        pararRelogio();
        relogio.textContent = formatarTempo(segundosRestantes);
    } else {
        inputTemporizador.disabled = true;
        botaoIniciar.disabled = true;
        botaoResetar.disabled = true;
        unidadeTempo.disabled = true
        relogio.textContent = '';
        inputTemporizador.value = '';
        clearInterval(intervaloTemporizador)
        iniciarRelogio();
    }
});

botaoIniciar.addEventListener('click', () => {
    if (estadoTemporizador === 'parado') {
        let tempo = parseInt(inputTemporizador.value);
        const unidade = unidadeTempo.value;

        if (!isNaN(tempo) && tempo > 0) {
            if (unidade === 'minutos') {
                tempo *= 60;
            } else if (unidade === 'horas') {
                tempo *= 3600;
            }    

            segundosRestantes = Math.floor(tempo);
            iniciarTemporizador();
            botaoIniciar.textContent = 'Parar';
            estadoTemporizador = 'rodando';
        } else {
            alert('Insira um número válido de segundos.');
        }

    } else if (estadoTemporizador === 'rodando') {
        clearInterval(intervaloTemporizador);
        estadoTemporizador = 'pausado';
        botaoIniciar.textContent = 'Retomar';

    } else if (estadoTemporizador === 'pausado') {
        iniciarTemporizador();
        estadoTemporizador = 'rodando';
        botaoIniciar.textContent = 'Parar';
    }
});

botaoResetar.addEventListener('click', () => {
    clearInterval(intervaloTemporizador);
    segundosRestantes = 0;
    relogio.textContent = formatarTempo(segundosRestantes);
    botaoIniciar.textContent = 'Iniciar';
    estadoTemporizador = 'parado';
});

/* inicia o relógio ao carregar a página */
iniciarRelogio();