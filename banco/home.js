document.addEventListener("DOMContentLoaded", function () {
  var formularioRef = firebase.database().ref("formulario");
  var cardsContainer = document.querySelector("#cards-container");

  formularioRef.on("child_added", function (snapshot) {
    var data = snapshot.val();
    var nome = data.nome; // Aqui pegamos o nome do candidato

    // Cria um novo elemento de cartão
    var newCard = document.createElement("div");
    newCard.className = "card text-black";
    let nomeEmCaixaAlta = nome.toUpperCase();

    // Conteúdo do cartão
    newCard.innerHTML = `
      <div class="card-header"><h5><i class="bi bi-person-circle"></i></h5></div>
      <div class="card-body">
        <div class="row">
          <div class="col-sm-8">
            <h5 class="card-title">${nomeEmCaixaAlta}</h5>
          </div>
          <!----botão do modal----->
          <div class="col-sm-4 col-12 text-center mt-3 mt-md-0 "> 
            <button type="button" class="btn btn-exibir primary-text btn-exibir-modal btn-block" 
                    data-toggle="modal" data-target="#modalExemplo"
                    data-nome="${nome}" data-email="${data.email}" data-telefone="${data.telefone}" 
                    data-cidade="${data.cidade}" data-bairro="${data.bairro}" 
                    data-curso="${data.curso}" data-ingresso="${data.ingresso}" 
                    data-semestre="${data.semestre}" data-conheceu="${data.conheceu}" 
                    data-termo="${data.customCheck1}" data-observacao="${data.Observacoes}">
              Exibir 
            </button>
          </div>
        </div>
      </div>
    `;

    // Adiciona o novo cartão ao contêiner de cartões
    cardsContainer.appendChild(newCard);
  });

  // Adiciona um ouvinte de evento de clique no documento para abrir o modal e preencher com as informações do candidato correspondente
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("btn-exibir-modal")) {
      // Preenche o modal com as informações do candidato
      var modalNome = document.querySelector("#nome");
      var modalEmail = document.querySelector("#email");
      var modalTelefone = document.querySelector("#telefone");
      var modalCidade = document.querySelector("#cidade");
      var modalBairro = document.querySelector("#bairro");
      var modalCurso = document.querySelector("#curso");
      var modalIngresso = document.querySelector("#ingresso");
      var modalSemestre = document.querySelector("#semestre");
      var modalConheceu = document.querySelector("#evento");
      var modalcustomCheck1 = document.querySelector("#customCheck1");
      var modalObservacoes = document.querySelector("#Observacoes");

      modalNome.textContent = event.target.dataset.nome;
      modalEmail.textContent = event.target.dataset.email;
      modalTelefone.textContent = event.target.dataset.telefone;
      modalCidade.textContent = event.target.dataset.cidade;
      modalBairro.textContent = event.target.dataset.bairro;
      modalCurso.textContent = event.target.dataset.curso;
      modalIngresso.textContent = event.target.dataset.ingresso;
      modalSemestre.textContent = event.target.dataset.semestre;
      modalConheceu.textContent = event.target.dataset.conheceu;
      modalcustomCheck1.textContent = event.target.dataset.customCheck1;
      modalObservacoes.textContent = event.target.dataset.observacoes;
    }
  });
});

function exportToExcel() {
  var cardsData = []; // Array para armazenar os dados dos cards

  // Iterar sobre os cards visíveis e coletar seus dados
  var cards = document.querySelectorAll(".card");
  cards.forEach(function (card) {
    var cardData = {
      nome: card.querySelector(".card-title").textContent.trim(),
      email: card.dataset.email.trim(),
      telefone: card.dataset.telefone.trim(),
      cidade: card.dataset.cidade.trim(),
      bairro: card.dataset.bairro.trim(),
      curso: card.dataset.curso.trim(),
      ingresso: card.dataset.ingresso.trim(),
      semestre: card.dataset.semestre.trim(),
      conheceu: card.dataset.conheceu.trim(),
      customCheck1: card.dataset.customCheck1.trim(),
      Observacoes: card.dataset.observacoes.trim(),
    };
    cardsData.push(cardData);
  });

  // Crie uma matriz para armazenar os dados a serem exportados
  var data = [];

  // Adicione os nomes das colunas como a primeira linha
  var headers = Object.keys(cardsData[0]);
  data.push(headers);

  // Adicione os dados dos cards à matriz de dados
  cardsData.forEach(function (cardData) {
    var rowData = [];
    headers.forEach(function (header) {
      rowData.push(cardData[header]);
    });
    data.push(rowData);
  });

  // Crie uma planilha Excel
  var ws = XLSX.utils.aoa_to_sheet(data);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Planilha");

  // Salve o arquivo Excel
  XLSX.writeFile(wb, "dados_cards.xlsx");
}

// Função para entrar no modo de edição
function editar() {
  $(".modal-body")
    .find("h6")
    .each(function () {
      var text = $(this).text();
      $(this).replaceWith(
        '<input type="text" class="form-control" value="' + text + '">'
      );
    });
  $(".btn-editar").hide();
  $(".btn-salvar, .btn-cancelar").show();
}

// Função para cancelar a edição
function cancelar() {
  $(".modal-body")
    .find("input")
    .each(function () {
      var value = $(this).val();
      $(this).replaceWith('<h6 class="m-b-10 f-w-600">' + value + "</h6>");
    });
  $(".btn-salvar, .btn-cancelar").hide();
  $(".btn-editar").show();
}

document
  .querySelector(".btn-salvar-mudancas")
  .addEventListener("click", function () {
    salvar(); // Chama a função salvar() ao clicar no botão
  });

// Função para salvar as alterações
function salvar() {
  // Lógica para salvar as alterações no banco de dados
  // ...
  // Após salvar, chame a função cancelar() para voltar ao modo de visualização
  cancelar();
}
document
  .querySelector(".btn-salvar-mudancas")
  .addEventListener("click", function () {
    salvarDados(); // Chama a função salvarDados() ao clicar no botão "Salvar mudanças"
  });

// Função para salvar os dados atualizados no banco de dados Firebase
function salvarDados() {
  var dadosASalvar = {
    nome: document.querySelector("#nome").textContent,
    email: document.querySelector("#email").textContent,
    telefone: document.querySelector("#telefone").textContent,
    cidade: document.querySelector("#cidade").textContent,
    bairro: document.querySelector("#bairro").textContent,
    curso: document.querySelector("#curso").textContent,
    ingresso: document.querySelector("#ingresso").textContent,
    semestre: document.querySelector("#semestre").textContent,
    conheceu: document.querySelector("#evento").textContent,
    customCheck1: document.querySelector("#customCheck1").textContent,
    Observacoes: document.querySelector("#Observacoes").textContent,
  };

  // Aqui você pode salvar os dados atualizados no banco de dados Firebase
  formularioRef
    .push(dadosASalvar)
    .then(function () {
      // Caso a operação de salvamento seja bem-sucedida
      console.log("Dados salvos com sucesso!");
      // Aqui você pode adicionar qualquer código adicional que deseja executar após o salvamento bem-sucedido
    })
    .catch(function (error) {
      // Caso ocorra um erro ao salvar os dados
      console.error("Erro ao salvar dados:", error);
      // Aqui você pode tratar o erro ou fornecer feedback ao usuário, se desejar
    });

  // Após salvar os dados, você pode ocultar o modal se desejar
  $("#modalExemplo").modal("hide");
}
