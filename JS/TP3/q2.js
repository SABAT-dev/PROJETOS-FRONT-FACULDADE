(() => {

    let q2 = app.getComponente('q2');
    function createForm(){
        let local = document.querySelector('#q2');
        local.innerHTML = `<legend>Questão 2</legend>
                        <label>Valor mínimo = 1 | valor máximo = 12</label>
                        </br>
                        <input id='fatorial' type='text' placeholder='Digite o valor mínimo' onKeyPress='return ApenasNumeros(event)'>
                        <input class='btn' name='calcular' type='button' value='Calcular' onClick='app.q2.calcular(this);'> </br>
                        <span id='resposta2'></span>`;
    }

    q2.calcular = function calcularFatorial(){
        let comeco = new Date().getTime();
        let fat = document.querySelector('#fatorial');
        let numero = Number(fat.value);
        let resultado = 1;
        let resp2 = document.querySelector('#resposta2');

        for(i = 1; i <= numero; i++){
            resultado = resultado * i;
        }
        let final = new Date().getTime();
        resp2.innerHTML = (`${numero}! = ${resultado} (${final - comeco} milisegundos)`);
    }

    return (function(){
        createForm();
    })();

})();