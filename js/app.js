let intervaloRelogio;
let intervaloTemporizador;
let estadoTemporizador = 'parado'; //'rodando', 'pausado'
let segundosRestantes = 0;

const relogio = document.getElementById('relogio');
const selecionar = document.getElementById('selecionar');
const totalHoras = document.getElementById('totalHoras');
const totalMinutos = document.getElementById('totalMinutos');
const totalSegundos = document.getElementById('totalSegundos');
const botaoIniciar = document.getElementById('iniciar-parar-contagem');
const botaoResetar = document.getElementById('resetar-temporizador');

function iniciarRelogio() {
    intervaloRelogio = setInterval(() => {
        const horario = new Date();
        relogio.textContent = horario.toLocaleTimeString();
    }, 1000)
}

function pararRelogio() {
    clearInterval(intervaloRelogio);
}

selecionar.addEventListener('change', () => {
    const tipo = selecionar.value;

    if (tipo === 'temporizador') {
        botaoIniciar.disabled = false;
        botaoResetar.disabled = false;
        totalHoras.disabled = false;
        totalMinutos.disabled = false;
        totalSegundos.disabled = false
        pararRelogio();
        relogio.textContent = formatarTempo(segundosRestantes);
    } else {
        botaoIniciar.disabled = true;
        botaoResetar.disabled = true;
        totalHoras.disabled = true;
        totalMinutos.disabled = true;
        totalSegundos.disabled = true;
        relogio.textContent = '';
        totalHoras.value = '';
        totalMinutos.value = '';
        totalSegundos.value = '';
        clearInterval(intervaloTemporizador)
        iniciarRelogio();
    }
});

totalHoras.addEventListener('input', () => {
    const valor = parseInt(totalHoras.value);
    if (isNaN(valor) || valor < 0) {
        totalHoras.value = '';
    } else {
        totalHoras.value = valor;
    }
});

totalMinutos.addEventListener('input', () => {
    const valor = parseInt(totalMinutos.value) || 0;
    totalMinutos.value = Math.min(valor, 59); // Máximo de 59 minutos

    if (isNaN(valor) || valor < 0) {
        totalMinutos.value = '';
    } else {
        totalMinutos.value = valor;
    }
});

totalSegundos.addEventListener('input', () => {
    const valor = parseInt(totalSegundos.value) || 0;
    totalSegundos.value = Math.min(valor, 59); // Máximo de 59 segundos

    if (isNaN(valor) || valor < 0) {
        totalSegundos.value = '';
    } else {
        totalSegundos.value = valor;
    }
});

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

botaoIniciar.addEventListener('click', () => {
    if (estadoTemporizador === 'parado') {
        const horas = parseInt(totalHoras.value) || 0;
        const minutos = parseInt(totalMinutos.value) || 0;
        const segundos = parseInt(totalSegundos.value) || 0;

        totalHoras.value = "";
        totalMinutos.value = "";
        totalSegundos.value = "";

        segundosRestantes = (horas * 3600) + (minutos * 60) + segundos;

        if (segundosRestantes > 0) {
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
    relogio.textContent = formatarTempo(0);
    totalHoras.value = '';
    totalMinutos.value = '';
    totalSegundos.value = '';
    botaoIniciar.textContent = 'Iniciar';
    estadoTemporizador = 'parado';
});

/* inicia o relógio ao carregar a página */
iniciarRelogio();