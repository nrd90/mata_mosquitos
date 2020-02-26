// definir as variaveis largura e altura fora da funcao ajustarTamanhoPalco para que elas possam ser acessadas globalmente,
// neste caso atraves do evento onrisize sempre que as dimensoes da tela forem alteradas

var altura=0
var largura=0
var vidas=1
var tempo=60
var mortos=0
var tempoMosquito=2000


var nivel=window.location.search   // da-nos somente parte da string que esta apos o ponto de interrogacao incluindo o ponto de interrogacao
nivel=nivel.replace('?','') // metodo replace substitui todos os caracteres '?' por ''

if(nivel==='normal'){
	tempoMosquito=2000
}else if(nivel==='dificil'){
	tempoMosquito=1500
}else if(nivel==='chucknorris'){
	tempoMosquito=1000
}				

function ajustarTamanhoPalco(){  // funcao para ajustar o tamanho da tela conforme alteracoes na mesma, capturadas atraves do evento onresize
	altura=window.innerHeight // dimensoes internas da janela do navegador
	largura=window.innerWidth
	console.log(altura,largura)
}

ajustarTamanhoPalco() // tem que ser chamada tb aqui no arquivo JS,
						// senao nao conseguiremos ter acesso as variaveis altura e largura de forma atualizada.

var cronometro= setInterval(function(){
	tempo--
	document.getElementById('cronometro').innerHTML=tempo
	if(tempo<0){
		clearInterval(cronometro)
		clearInterval(criarMosquito)
		window.location.href='vitoria.html'
	}
},1000)

// gerar posicoes randomicas

function posicaoRandomica(){

	//remover o elemento mosquito da tela caso ele exista
	if(document.getElementById('mosquito')){ // verificar se o elemento existe no dom
		document.getElementById('mosquito').remove()  // se o elemento existe atualmente ele vai ser removido
														// caso contrario a instrucao if sera ignorada	
			if(vidas>3){ // verifica se se todas os pontos de vida foram perdidos; se sim ir para a pagina game over
				window.location.href='derrota.html'
			}else{  // senao processar a logica de decremento de pontos de vidas 
				document.getElementById('v'+vidas).src='imagens/coracao_vazio.png'
				vidas++
			}	
	}
	
	// aqui comeca a criacao do elemento de forma randomica na pagina
	var posicaoX= Math.floor(Math.random() * (largura-110))
	var posicaoY= Math.floor(Math.random() * (altura-100))

	console.log(posicaoX,posicaoY)

	//tamanho randomico
	var tamanho=Math.floor(Math.random()*3)
	console.log(tamanho)

	//lado randomico
	var lado=Math.floor(Math.random()*2)
	console.log(lado)

	// criar o elemento html mosquito
	var mosquito=document.createElement('img') // criar o elemento do tipo img com o nome mosquito
	mosquito.src='imagens/mosquito.png' // acessar o atributo src do elemento e atribuir a url da imagem que representa o elemento mosquito
	mosquito.className='mosquito'+tamanho +' '+'lado'+lado // atribuir as classes para tamanho dos mosquitos 
	//e as classes para lados dos mosquito de forma aleatoria
	mosquito.style.left=posicaoX +'px' // definir a posicao randomica do elemento no eixo x
	mosquito.style.top=posicaoY +'px' // definir a posicao randomica do elemento no eixo y
	mosquito.style.position='absolute' // paraa que essas posicoes sejam aplicadas o elemento precisa ter posicao absoluta
	mosquito.id='mosquito'  // criando um id para o elemento mosquito, o  que nos permite manipular este elemento de forma individual no DOM
	mosquito.onclick=function(){  // se clicarmos no elemento mosquito a instrucao if no inicio da funcao posicaoRandomica nao sera
								// executada pois no momento que em o comando for executado o elemento nao existira, pulando portanto essa instrucao.
		mortos++
		document.getElementById('morto').innerHTML=mortos
		this.remove()   // o this faz referencia ao proprio elemento associado a funcao
		clearInterval(criarMosquito)  // apagar o set interval se o mosquito for clicado a tempo e executar de seguida
									// a funcao posicaoRandomica para que um novo mosquito seja criado imediatamente.
		posicaoRandomica() // se a funcao nao for chamada novamente aqui nao sera criado um novo mosquito na tela ao se clicar num mosquito
	}
	document.body.appendChild(mosquito) // incluir o elemento criado anteriormente no body da pagina jogo.html
}

