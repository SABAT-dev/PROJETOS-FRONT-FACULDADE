(() => {

    let q3 = app.getComponente('q3');
    function createForm(){
        let local = document.querySelector('#q3');
        local.innerHTML = `<legend>Questão 3</legend>
                            <input class='btn' name='calcular' type='button' value='Criar Relatório' onClick='app.q3.calcular(this)'>
                            </br>
                            </br>
                            <span id='titulo'></span>
                            </br>
                            <span id='relatorio'></span> </br>
                            <span id='resposta3'></span>`;
    }

    q3.calcular = function calcularRelatorio() {
        class Aluno {
            constructor(nr, _nota) {
                this.nr = nr;
                this._nota = _nota;
            }
            get nota(){
                return this._nota;
            }
        }

        let alunos = [];
        let titulo = document.querySelector('#titulo');
        for(let i = 1; i <= 20; i++){
            let a = new Aluno(i,Math.floor(Math.random() * 100));
            alunos.push(a);
        }

        function classificacao(nota) {
            return nota >= 60 ?'APROVADO' : 'REPROVADO';
        }

        titulo.innerHTML = ('NOTAS DOS ALUNOS:');

        let aprovados = 0;
        let rel = document.querySelector('#relatorio');
        let resp3 = document.querySelector('#resposta3');
        for(let i = 0; i < alunos.length; i++) {
            rel.innerHTML += (`<p>Aluno nr ${alunos[i].nr} - Nota ${alunos[i].nota} [${classificacao(alunos[i].nota)}]</p>`);
            if(classificacao(alunos[i].nota) == 'APROVADO'){
                aprovados++;
            }
        }
        resp3.innerHTML = (`APROVADOS: ${aprovados} (${Math.floor((aprovados / alunos.length) * 100)})% | REPROVADOS: ${alunos.length - aprovados} (${Math.floor(((alunos.length - aprovados) / alunos.length) * 100)})%`);
    }

    return (function(){
        createForm();
    })();

})();