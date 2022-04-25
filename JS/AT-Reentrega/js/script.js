(() => {
  let app = {
    
    gameStarted: false,
    startGame: function() {

      let cardBoard = document.querySelector("#tabuleiro");
      let apiLista = "https://picsum.photos/v2/list?page=2&limit=8";
      let cardFront = "https://picsum.photos/id/";
      let cardBack = "img/dev.svg";
      let lenghtImage = 100;
      let id = [];

      if (!this.gameStarted) {
        createLines();
        this.gameStarted = true;
      }else{
        searchImages();
      }
      
      function createLines() {
        for (let i = 0; i < 4; i++) {
          let line = document.createElement("div");
          line.className = "row";
          cardBoard.appendChild(line);
        }
        createColumns();
      }

      function createColumns() {
        var lines = document.querySelectorAll(".row");
        for (let i = 0; i < lines.length; i++) {
          for (let j = 0; j < 4; j++) {
            let column = document.createElement("div");
            column.className = "col-3";
            lines[i].appendChild(column);
          }
        }
        createImages();
      }

      function createImages() {
        var columns = document.querySelectorAll(".col-3");
        for (let i = 0; i < columns.length; i++) {
          let image = document.createElement("img");
          image.className = "card";
          image.src = cardBack;

          image.crossorigin = "anonymous";
          columns[i].appendChild(image);
        }
        searchImages();
      }

      async function searchImages() {
        console.log("Começando busca de imagens...");
        await fetch(apiLista)
          .then(res => res.json())
          .then(listaImagens => {
            for (imagem of listaImagens) {
              for (let i = 0; i < 2; i++) {
                id.push(imagem.id);
              }
            }
            console.log("Final da busca...");
            shuffle();
          });
      }
      
      function shuffle() {
        for (let i = 0; i < id.length; i++) {
          let z = Math.floor(Math.random() * id.length);
          let aux = id[z];
          id[z] = id[i];
          id[i] = aux;
        }
        flipCards();
      }
      
      function flipCards() {
        let images = document.querySelectorAll("#tabuleiro img");
        for (let i = 0; i < images.length; i++) {
          images[i].classList.toggle("flip");
          images[i].setAttribute("data-valor", id[i]);
          images[i].src = `${cardFront}${id[
            i
          ]}/${lenghtImage}`;
        }
        setTimeout(() => {
          untapCards();
        }, 3000);
      }
      
      function untapCards() {
        var images = document.querySelectorAll("#tabuleiro img");

        for (let i = 0; i < images.length; i++) {
          images[i].classList.remove("flip");
          images[i].src = `${cardBack}`;
          images[i].crossorigin = "anonymous";
        }
      }

      const cards = document.querySelectorAll(".col-3 img");
      let clickStuck = false;
      let hasFlippedCard = false;
      let firstCard = null;
      let secondCard = null;
      let points = 0;
      
      function flipCard() {
        if (clickStuck) return;
        if (this === firstCard) return;

        this.classList.toggle("flip");
        this.src = `${cardFront}${this.getAttribute(
          "data-valor"
        )}/${lenghtImage}`;
        if (!hasFlippedCard) {
          
          hasFlippedCard = true;
          firstCard = this;
          console.log(firstCard);
          return;
        }
      
        secondCard = this;

        checkDoubles();
      }
      function checkDoubles() {
        let combina =
          firstCard.dataset.valor === secondCard.dataset.valor;
        combina ? disableCards() : untapCard();
      }

      function disableCards() {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        points++
        resetCardBoard();
      }

      function untapCard() {
        clickStuck = true;

        setTimeout(() => {
          firstCard.classList.remove("flip");
          firstCard.src = cardBack;
          secondCard.classList.remove("flip");
          secondCard.src = cardBack;
          resetCardBoard();
        }, 1500);
      }

      function resetCardBoard() {
        [hasFlippedCard, clickStuck] = [false, false];
        [firstCard, secondCard] = [null, null];
      }

      cards.forEach(carta => carta.addEventListener("click", flipCard));
    }
  };

  onload = () => {
    document.querySelector("#btnStart").onclick = app.startGame;
  };

})();
