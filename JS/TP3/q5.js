(() => {
    
    let q5 = app.getComponente('q5');
    function createForm(){
        let local = document.querySelector('#q5');
        local.innerHTML = `<legend>Questão 5</legend>"
                        <label>Digite o valor dos lados do triângulo</label> </br>
                        <input id='ladoa' type='text' placeholder='Lado A' onKeyPress='return ApenasNumeros(event)'>
                        <input id='ladob' type='text' placeholder='Lado B' onKeyPress='return ApenasNumeros(event)'>
                        <input id='ladoc' type='text' placeholder='Lado C' onKeyPress='return ApenasNumeros(event)'>
                        <input class='btn' name='examinar' type='button' value='Calcular' onClick='app.q5.examinar(this)'> </br>
                        <span id='resposta5'></span>`;
    }

    q5.examinar = function examinarTriangulo() {

        ladoa = Number(document.querySelector('#ladoa').value);
        ladob = Number(document.querySelector('#ladob').value);
        ladoc = Number(document.querySelector('#ladoc').value);
        let resp5 = document.querySelector('#resposta5');

        let solucao = ''
        if(ladoa == ladob && ladob == ladoc){
            solucao = 'equilátero'
        } else if(ladoa != ladob && ladob != ladoc && ladoa != ladoc){
            solucao = 'escaleno'
        }else{
            solucao = 'isósceles'
        }
        resp5.innerHTML = (`O triângulo formado é o ${solucao}`);
        alert("PARA FORMAR UM TRIÂNGULO:\nEscaleno (todos os lados sejam diferentes)\nIsósceles (dois lados sejam iguais)\nEquilátero (todos os lados sejam iguais)")
    }

    return (function(){
        createForm();
    })();

})();