(() => {

    let q4 = app.getComponente('q4');
    function createForm(){
        let local = document.querySelector('#q4');
        local.innerHTML = `<legend>Questão 4</legend>
                        <label>Valor mínimo = 1 | valor máximo = 50</label> </br>
                        <input id='quantidade' type='text' placeholder='Quantidade de números' onKeyPress='return ApenasNumeros(event)'>
                        <input id='valorMin' type='text' placeholder='Digite o valor mínimo' onKeyPress='return ApenasNumeros(event)'>
                        <input id='valorMax' type='text' placeholder='Digite o valor máximo' onKeyPress='return ApenasNumeros(event)'>
                        <input class='btn' name='criar' type='button' value='Calcular' onClick='app.q4.criar(this)'> </br>
                        <span id='soma'></span> </br>
                        <span id='resposta4'></span>`;
    }

    q4.criar = function criarArray() {
        let quantidade = Number(document.querySelector('#quantidade').value);
        let valorMin = Number(document.querySelector('#valorMin').value);
        let valorMax = Number(document.querySelector('#valorMax').value);
        let soma = document.querySelector('#soma');
        let resp4 = document.querySelector('#resposta4');
        let resultado = (valorMin + valorMax);

        soma.innerHTML = (`${valorMin} + ${valorMax} = ${resultado} `);
        let arr = [];
        let i = 0;
        while(i < quantidade){
            let valRandom = getValor(valorMin,valorMax);
            arr.push(valRandom);
            i++

        }
        // for(let i = valorMin; i < quantidade; i++){
        //     let valRandom = getValor(valorMin,valorMax);
        //     console.log('valRandom', valRandom);
        //     arr.push(valRandom);
        // }
        ordenar(arr);
        resp4.innerHTML = arr;
    }

    function getValor(valorMin,valorMax){
        return Math.floor((Math.random() * valorMax) + valorMin);
    }

    function ordenar(list){
        for(let i = 0; i < list.length - 1; i++){
            for(let x = i + 1; x < list.length; x++) {
                if(list[i] > list[x]) {
                    let aux = list[x];
                    list[x] = list[i];
                    list[i] = aux;
                }
            }
        }
    }

    return (function(){
        createForm();
    })();

})();