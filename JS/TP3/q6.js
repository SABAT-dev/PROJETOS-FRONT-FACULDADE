
    function logado(){
        return window.localStorage.getItem("login")
    }

    function deslogar(){
        naoLogadoElemento = document.querySelector('#nao_logado');
        logadoElemento = document.querySelector('#logado');

        window.localStorage.removeItem("login");
        naoLogadoElemento.style.visibility = 'visible'
        logadoElemento.style.visibility = 'hidden'
    }

    function logar(){
        naoLogadoElemento = document.querySelector('#nao_logado');
        logadoElemento = document.querySelector('#logado');

        let usuario = document.querySelector('#usuario').value;
        let senha = document.querySelector('#senha').value;
        let usuarios = [];

        if(window.localStorage.getItem("usuarios")){
            usuarios = JSON.parse(window.localStorage.getItem("usuarios"))
        }
        for(let i = 0; i < usuarios.length; i++){
            if(usuarios[i].usuario == usuario && usuarios[i].senha == senha){
                window.localStorage.setItem("login", document.querySelector('#usuario').value);
                naoLogadoElemento.style.visibility = 'hidden'
                logadoElemento.style.visibility = 'visible'
                break;
            }       
        }  
    }

    function criarNovoUsuario() {
        let usuario = document.querySelector('#novo_usuario').value;
        let senha = document.querySelector('#nova_senha').value;
        let mensagens = document.querySelector('#mensagens');
        let usuarios = []

        if(window.localStorage.getItem("usuarios")){
            usuarios = JSON.parse(window.localStorage.getItem("usuarios"));
        }

        usuarios.push({usuario: usuario, senha: senha});
        window.localStorage.setItem("usuarios", JSON.stringify(usuarios));
        mensagens.innerHTML = (`Usuário ${usuario}, criado!`);
    }