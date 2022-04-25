function iniciar() {
    criarTabuleiro()
    mostrarTempoUsuario()
}

let tabuleiro = document.querySelector('#cardBoard');
const btnStart = document.querySelector('#btnStart');
const result = document.querySelector('#result');
const cardBack = './images/dev.svg';

let cartas = [
    { id: 'aws0', order: 0, value: 'aws', path: './images/aws.svg' },
    { id: 'aws1', order: 1, value: 'aws', path: './images/aws.svg' },
    { id: 'html50', order: 2, value: 'html', path: './images/html5.svg' },
    { id: 'html51', order: 3, value: 'html', path: './images/html5.svg' },
    { id: 'js0', order: 4, value: 'js', path: './images/js.svg' },
    { id: 'js1', order: 5, value: 'js', path: './images/js.svg' },
    { id: 'nodejs0', order: 6, value: 'nodejs', path: './images/nodejs.svg' },
    { id: 'nodejs1', order: 7, value: 'nodejs', path: './images/nodejs.svg' },
    { id: 'vuejs0', order: 8, value: 'vuejs', path: './images/vuejs.svg', },
    { id: 'vuejs1', order: 9, value: 'vuejs', path: './images/vuejs.svg', },
    { id: 'code0', order: 10, value: 'code', path: './images/code.svg', },
    { id: 'code1', order: 11, value: 'code', path: './images/code.svg', },
    { id: 'npm0', order: 12, value: 'npm', path: './images/npm.svg' },
    { id: 'npm1', order: 13, value: 'npm', path: './images/npm.svg' },
    { id: 'react0', order: 14, value: 'react', path: './images/react.svg' },
    { id: 'react1', order: 15, value: 'react', path: './images/react.svg' },
]
let cartasEscolhidas = []
let cardValues = []
let pares = []
let primeiraCarta, segundaCarta, iniciarTempo, finalizarTempo
let storage = window.localStorage;
let tempos = []

function criarTabuleiro() {
    for (card of cartas) {
        tabuleiro.innerHTML +=
            `              
                    <div class="flip-card">
                        <div class="flip-card-inner" id="${card.id}" onclick="verificarCartas(${card.id}, '${card.value}')">
                            <div class="card-front">
                                <img src="${card.path}"> 
                            </div>
                            <div class="card-back">
                                <img id="cardBack" src="${cardBack}">
                            </div>
                        </div>
                    </div>                   
                `
    }
    desativarTodasCartas()
}

function comecarJogo() {
    iniciarTempo = new Date()
    tabuleiro.innerHTML = ''
    btnStart.disabled = true

    cartas = embaralhar(cartas)

    criarTabuleiro()

    setTimeout(function () {
        for (card of cartas) {
            virarCartas(card)
        }
        ativarTodasCartas()
    }, 1500)
}

const embaralhar = (lista) => {
    lista.sort(function () {
        return .5 - Math.random()
    })
    return lista
}

const virarCartas = (card) => {
    let cardHTML = document.getElementById(`${card.id}`)
    cardHTML.classList.toggle("flip");
}

const desvirarCartas = (card) => {
    let cardHTML = document.getElementById(`${card.id}`)
    cardHTML.classList.remove("flip");
}

const verificarCartas = (card, value) => {
    cartasEscolhidas.push(card)
    cardValues.push(value)

    switch (cartasEscolhidas.length) {
        case 1:
            primeiraCarta = cartasEscolhidas[0]
            desvirarCartas(primeiraCarta)
            break
        case 2:
            segundaCarta = cartasEscolhidas[1]
            desvirarCartas(segundaCarta)
            desativarCarta(primeiraCarta, segundaCarta)
            if (cardValues[0] == cardValues[1]) {
                pares.push(primeiraCarta, segundaCarta)
                setTimeout(function () {
                    ativarTodasCartas()
                    desativarParesCorretos()
                }, 1500)
            } else {
                setTimeout(function () {
                    cartaAgitada(primeiraCarta)
                    cartaAgitada(segundaCarta)

                    virarCartas(primeiraCarta)
                    virarCartas(segundaCarta)

                    ativarTodasCartas()
                    desativarParesCorretos()
                }, 1500)
            }
            removerCartaAgitada(primeiraCarta)
            removerCartaAgitada(segundaCarta)
            cardValues = []
            cartasEscolhidas = []
            break
    }

    setTimeout(function () {
        if (gameOver()) {
            finalizarTempo = new Date()
            swal({
                title: "Jogo finalizado!",
                text: `Tempo da partida: ${finalizarTempo - iniciarTempo}`,
                icon: "success",
                button: "ok",
            });
            salvarTempoUsuario()
            mostrarTempoUsuario()
            resetGame()
        }
    }, 1500)
}

const cartaAgitada = (card) => {
    let cardHTML = document.getElementById(`${card.id}`)
    cardHTML.classList.add("shakeCard");
}

const removerCartaAgitada = (card) => {
    let cartaHTML = document.getElementById(`${card.id}`)
    cartaHTML.classList.remove("shakeCard");
}

const desativarParesCorretos = () => {
    for (card of pares) {
        document.getElementById(`${card.id}`).classList.add("disabledCard");
    }
}

const ativarTodasCartas = () => {
    for (card of cartas) {
        document.getElementById(`${card.id}`).classList.remove("disabledCard");
    }
}

const desativarTodasCartas = () => {
    for (card of cartas) {
        document.getElementById(`${card.id}`).classList.add("disabledCard");
    }
}

const desativarCarta = (firstCard, secondCard) => {
    for (card of cartas) {
        if (card.id != firstCard.id && card.id != secondCard.id) {
            document.getElementById(`${card.id}`).classList.add("disabledCard");
        }
    }
}

const gameOver = () => {
    if (pares.length == cartas.length) {
        return true
    }
    return false
}

const resetGame = () => {
    pares = []

    // Ordena os elementos do array para poder recuperar a posição incial de cada carta
    for (card of cartas) {
        card = cartas.sort(function (a, b) {
            return a.order - b.order
        })
    }
    tabuleiro.innerHTML = ''
    criarTabuleiro()
    btnStart.disabled = false
}

// Local Storage - set
const salvarTempoUsuario = () => {
    let time = finalizarTempo - iniciarTempo
    tempos.push(time)
    storage.setItem('times', JSON.stringify(tempos))
}

// Local Storage - get
const mostrarTempoUsuario = () => {
    if (localStorage.times) {
        tempos = JSON.parse(storage.getItem('times'))
        for (let i = 0; i <= tempos.length; i++) {
            tempos.sort(function (a, b) {
                return a - b
            })
        }
        result.innerHTML = `Melhor tempo: ${tempos[0]}`
    } else {
        return
    }
}
