window.onload = function onloadq1(){
	let q1 = document.querySelector('#q1');
	q1.innerHTML = "<legend>Questão 1</legend>"
	+ "<label>Valor mínimo = 1 | valor máximo = 50</label> </br>"
	+ "<input id='numeroMin' type='text' placeholder='Digite o valor mínimo' onKeyPress='return ApenasNumeros(event)'>"
	+ "<input id='numeroMax' type='text' placeholder='Digite o valor máximo' onKeyPress='return ApenasNumeros(event)'>"
	+ "<input class='btn' type='button' value='Calcular' onClick='mostrarNumeros()'> </br>"
	+ "<span id='resposta1'></span>";

	let q6 = document.querySelector("#q6");
	q6.innerHTML = "<legend>Questão 6 - Login</legend> <div id='nao_logado'> <input id='usuario' type='text'> "
	+ "<input id='senha' type='password'> <button class='btn' onclick='logar()'>Login</button>"
	+ "<br/><br/><div>Novo Usuário</div> <input id='novo_usuario' type='text'> <input id='nova_senha' type='password'>"
	+ "<button class='btn' onclick='criarNovoUsuario()'>Criar</button>	</div> <div id='mensagens'></div>	<div id='logado' style='visibility:hidden'> <div>Logado</div>"
	+ "<button class='btn' onclick='deslogar()'>Deslogar</button> </div> <script src='js/ex6.js'></script> </body> </html>";
}

function ApenasNumeros(e){
    var digita = (window.event)? event.keyCode : e.which;
    if((digita > 47 && digita < 58)) return true;
    else{
        if (digita == 8 || digita == 0) return true;
        else return false;
    }
}

function mostrarNumeros() {
	let numeroMin = document.querySelector('#numeroMin');
    let numeroMax = document.querySelector('#numeroMax');
	let resp1 = document.querySelector('#resposta1');
    if(Number(numeroMin.value) < Number(numeroMax.value)){
        let quantidade = 0;
        for(var contar = numeroMin.value; contar < Number(numeroMax.value); contar++){
            if((contar % 2 == 0) && (contar % 3 == 0)){
                quantidade++;
            }
        }
		resp1.innerHTML = (`A quantidade de números que existem entre o valor mínimo e o valor máximo e que sejam múltiplos de 2 e 3 simultaneamente é ${quantidade}`);
    }else if (Number(numeroMin.value) > Number(numeroMax.value)){
		alert("O valor mínimo deve ser MENOR que o máximo ");
	}else{
        alert("Impossível calcular, por favor digite o valor MÍNIMO e o MÁXIMO!");
    }
}
