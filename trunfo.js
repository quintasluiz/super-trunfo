var cartaDua = {
    nome: "Dua Lipa",
    imagem: "https://www.vagalume.com.br/dynimage/news41209-big.jpg",
    atributos: {
        Composições: 80,
        Emmys: 60,
        Albuns: 90
    }
}

var cartaTaylor = {
    nome: "Taylor Swift",
    imagem: "https://www.estrelando.com.br/uploads/2020/07/23/taylor-swift-ok-1595517293.jpg",
    atributos: {
        Composições: 70,
        Emmys: 65,
        Albuns: 85
    }
}

var cartaLady = {
    nome: "Lady Gaga",
    imagem: "https://www.estrelando.com.br/uploads/2019/03/25/lady-gaga-6-1553532116.gallery.jpg",
    atributos: {
        Composições: 88,
        Emmys: 62,
        Albuns: 90
    }
}

var cartaJustin = {
    nome: "Justin Timberlake",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/JustinTimberlakeJune07_crop.jpg/255px-JustinTimberlakeJune07_crop.jpg",
    atributos: {
        Composições: 95,
        Emmys: 40,
        Albuns: 10
    }
}

var cartaBeyonce = {
    nome: "Beyonce",
    imagem: "https://s2.glbimg.com/JTuesylhRR4GQGnLk7G4bCX7Yoo=/620x480/top/e.glbimg.com/og/ed/f/original/2019/11/18/bey_6.jpg",
    atributos: {
        Composições: 80,
        Emmys: 60,
        Albuns: 100
    }
}

var cartaOlivia = {
    nome: "Olivia Rodrigo",
    imagem: "https://tracklist.com.br/wp-content/uploads/2021/01/Olivia-Rodrigo.jpg",
    atributos: {
        Composições: 70,
        Emmys: 50,
        Albuns: 60
    }
}

var cartaAriana = {
    nome: "Ariana Grande",
    imagem: "https://portalpopline.com.br/wp-content/uploads/2020/10/ariana-grande-positions.png",
    atributos: {
        Composições: 95,
        Emmys: 70,
        Albuns: 70
    }
}

var cartaEd = {
    nome: "Ed Sheeran",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Ed_Sheeran-6886_%28cropped%29.jpg/379px-Ed_Sheeran-6886_%28cropped%29.jpg",
    atributos: {
        Composições: 90,
        Emmys: 80,
        Albuns: 85
    }
}

var cartaMaquina
var cartaJogador
var cartas = [cartaDua, cartaTaylor, cartaLady, cartaJustin, cartaBeyonce, cartaOlivia, cartaAriana, cartaEd]
//            0           1           2          3         4            5            6           7          

var pontosJogador = 0
var pontosMaquina = 0

atualizaPlacar()
atualizaQuantidadeDeCartas()

function atualizaQuantidadeDeCartas() {
    var divQuantidadeCartas = document.getElementById('quantidade-cartas')
    var html = "Quantidade de cartas no jogo: " + cartas.length

    divQuantidadeCartas.innerHTML = html
}

function atualizaPlacar() {
    var divPlacar = document.getElementById('placar')
    var html = "Jogador " + pontosJogador + "/" + pontosMaquina + " Máquina"

    divPlacar.innerHTML = html
}

function sortearCarta() {
    var numeroCartaMaquina = parseInt(Math.random() * cartas.length)
    cartaMaquina = cartas[numeroCartaMaquina]
    cartas.splice(numeroCartaMaquina, 1)

    var numeroCartaJogador = parseInt(Math.random() * cartas.length)
    cartaJogador = cartas[numeroCartaJogador]
    cartas.splice(numeroCartaJogador, 1)

    document.getElementById('btnSortear').disabled = true
    document.getElementById('btnJogar').disabled = false

    exibeCartaJogador()
}

function exibeCartaJogador() {
    var divCartaJogador = document.getElementById("carta-jogador")
    var moldura = '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
    divCartaJogador.style.backgroundImage = `url(${cartaJogador.imagem})`
    var nome = `<p class="carta-subtitle">${cartaJogador.nome}</p>`
    var opcoesTexto = ""

    for (var atributo in cartaJogador.atributos) {
        opcoesTexto += "<input type='radio' name='atributo' value='" + atributo + "'>" + atributo + " " + cartaJogador.atributos[atributo] + "<br>"
    }

    var html = "<div id='opcoes' class='carta-status'>"

    divCartaJogador.innerHTML = moldura + nome + html + opcoesTexto + '</div>'
}

function obtemAtributoSelecionado() {
    var radioAtributo = document.getElementsByName('atributo')
    for (var i = 0; i < radioAtributo.length; i++) {
        if (radioAtributo[i].checked) {
            return radioAtributo[i].value
        }
    }
}

function jogar() {
    var divResultado = document.getElementById("resultado")
    var atributoSelecionado = obtemAtributoSelecionado()

    if (cartaJogador.atributos[atributoSelecionado] > cartaMaquina.atributos[atributoSelecionado]) {
        htmlResultado = '<p class="resultado-final">Venceu</p>'
        pontosJogador++
    } else if (cartaJogador.atributos[atributoSelecionado] < cartaMaquina.atributos[atributoSelecionado]) {
        htmlResultado = '<p class="resultado-final">Perdeu</p>'
        pontosMaquina++
    } else {
        htmlResultado = '<p class="resultado-final">Empatou</p>'
    }

    if (cartas.length == 0) {
        alert("Fim de jogo")
        if (pontosJogador > pontosMaquina) {
            htmlResultado = '<p class="resultado-final">Venceu</p>'
        } else if (pontosMaquina > pontosJogador) {
            htmlResultado = '<p class="resultado-final">Perdeu</p>'
        } else {
            htmlResultado = '<p class="resultado-final">Empatou</p>'
        }
    } else {
        document.getElementById('btnProximaRodada').disabled = false
    }

    divResultado.innerHTML = htmlResultado
    document.getElementById('btnJogar').disabled = true

    atualizaPlacar()
    exibeCartaMaquina()
    atualizaQuantidadeDeCartas()
}

function exibeCartaMaquina() {
    var divCartaMaquina = document.getElementById("carta-maquina")
    var moldura = '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
    divCartaMaquina.style.backgroundImage = `url(${cartaMaquina.imagem})`
    var nome = `<p class="carta-subtitle">${cartaMaquina.nome}</p>`
    var opcoesTexto = ""

    for (var atributo in cartaMaquina.atributos) {
        console.log(atributo)
        opcoesTexto += "<p type='text' name='atributo' value='" + atributo + "'>" + atributo + " " + cartaMaquina.atributos[atributo] + "<br>"
    }

    var html = "<div id='opcoes' class='carta-status --spacing'>"

    divCartaMaquina.innerHTML = moldura + nome + html + opcoesTexto + '</div>'
}

function proximaRodada() {
    var divCartas = document.getElementById('cartas')

    divCartas.innerHTML = `<div id="carta-jogador" class="carta"></div> <div id="carta-maquina" class="carta"></div>`

    document.getElementById('btnSortear').disabled = false
    document.getElementById('btnJogar').disabled = true
    document.getElementById('btnProximaRodada').disabled = true

    var divResultado = document.getElementById('resultado')
    divResultado.innerHTML = ""
}