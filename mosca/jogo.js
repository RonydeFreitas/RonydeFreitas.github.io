var altura = 0;
var largura = 0;

var posicaox = 0;
var posicaoY = 0;

var tamanhoMosca = 120;

var vidas = 1;

var tempo = 60;

var velocidade = window.location.search;

var velocidade = velocidade.replace('?', '');

var nivel = 0;
if( velocidade === '1'){
    nivel = 3000;
} else if ( velocidade === '2'){
    nivel = 2000;
} else if ( velocidade === '3'){
    nivel = 1000;
}

function tamanhoDaTela(){
    altura = window.innerHeight;
    largura = window.innerWidth;
}
tamanhoDaTela();

var cronometro = setInterval(function(){
    tempo -= 1;
    if(tempo < 0){
        clearInterval(posicaoMosca);
        clearInterval(cronometro);
        window.location.href = 'venceu.html'
    } else{
    document.getElementById('contador').innerHTML = tempo
    }
}, 1000);

function posicaoRandomica(){
    if(document.getElementById('mosca')){
        document.getElementById('mosca').remove();
        if( vidas > 3){
            window.location.href = 'game_over.html'
        } else{
            document.getElementById('v' + vidas).src='imagens/coracao_vazio.png';
            vidas++;
        }
    }

    posicaoX = Math.floor(Math.random() * largura);
    posicaoY = Math.floor(Math.random() * altura);

    tamanhoMosca = Math.floor(Math.random() * tamanhoMosca);

    var mosca = document.createElement('img');
    mosca.src = 'imagens/mosca.png';
    mosca.className = 'mosca1';
    mosca.style.left = posicaoX + 'px';
    mosca.style.top = posicaoY + 'px';
    mosca.style.position = 'absolute';
    mosca.style.minWidth = '50px';
    mosca.style.width = tamanhoMosca + 'px';
    mosca.id = 'mosca';

    mosca.onclick = function(){
        this.remove()
    }
    if(posicaoY > (altura - 120)){
        mosca.style.top = (posicaoY - 150) + 'px'
    }

    if(posicaoX > (largura - 120)){
        mosca.style.left = (posicaoX - 150) + 'px'
    }

    if (posicaoX < (largura / 2)){
        mosca.style.transform = 'scaleX(-1)'
    }
    
    document.body.appendChild(mosca);
}