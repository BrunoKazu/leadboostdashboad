document.addEventListener("DOMContentLoaded", function () {
  var formularioRef = firebase.database().ref("formulario");
  var cardsContainer = document.querySelector("#cards-container");
  var currentEditId = null;

  formularioRef.on("child_added", function (snapshot) {
    var data = snapshot.val();
    var id = snapshot.key;
    var nome = data.nome || "";
    var email = data.email || "";
    var telefone = data.telefone || "";
    var cidade = data.cidade || "";
    var bairro = data.bairro || "";
    var curso = data.curso || "";
    var ingresso = data.ingresso || "";
    var semestre = data.semestre || "";
    var conheceu = data.conheceu || "";
    var termo = data.customCheck1 || "";
    var observacao = data.Observacoes || "";

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
                    data-id="${id}" data-nome="${nome}" data-email="${email}" data-telefone="${telefone}" 
                    data-cidade="${cidade}" data-bairro="${bairro}" 
                    data-curso="${curso}" data-ingresso="${ingresso}" 
                    data-semestre="${semestre}" data-conheceu="${conheceu}" 
                    data-termo="${termo}" data-observacao="${observacao}">
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
      currentEditId = event.target.dataset.id;
      var modalNome = document.querySelector("#nome");
      var modalEmail = document.querySelector("#email");
      var modalTelefone = document.querySelector("#telefone");
      var modalCidade = document.querySelector("#cidade");
      var modalBairro = document.querySelector("#bairro");
      var modalCurso = document.querySelector("#curso");
      var modalIngresso = document.querySelector("#ingresso");
      var modalSemestre = document.querySelector("#semestre");
      var modalConheceu = document.querySelector("#evento");
      var modalCustomCheck1 = document.querySelector("#customCheck1");
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
      modalCustomCheck1.textContent = event.target.dataset.termo;
      modalObservacoes.textContent = event.target.dataset.observacao;
    }
  });
});

function exportToExcel() {
  var cardsData = [];
  // Iterar sobre os cards visíveis e coletar seus dados
  var cards = document.querySelectorAll(".card");
  cards.forEach(function (card) {
    var cardData = {
      nome: card.querySelector(".card-title").textContent.trim(),
      email: card.querySelector(".btn-exibir-modal").dataset.email,
      telefone: card.querySelector(".btn-exibir-modal").dataset.telefone,
      cidade: card.querySelector(".btn-exibir-modal").dataset.cidade,
      bairro: card.querySelector(".btn-exibir-modal").dataset.bairro,
      curso: card.querySelector(".btn-exibir-modal").dataset.curso,
      ingresso: card.querySelector(".btn-exibir-modal").dataset.ingresso,
      semestre: card.querySelector(".btn-exibir-modal").dataset.semestre,
      conheceu: card.querySelector(".btn-exibir-modal").dataset.conheceu,
      customCheck1: card.querySelector(".btn-exibir-modal").dataset.termo,
      Observacoes: card.querySelector(".btn-exibir-modal").dataset.observacao,
    };
    cardsData.push(cardData);
  });

  // Crie uma matriz para armazenar os dados a serem exportados
  var data = [];

  // Adicione os nomes das colunas como a primeira linha
  if (cardsData.length > 0) {
    var headers = Object.keys(cardsData[0]);
    data.push(headers);
  }

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
function btn_cancelar() {
  $(".modal-body")
    .find("input")
    .each(function () {
      var value = $(this).val();
      $(this).replaceWith('<h6 class="m-b-10 f-w-600">' + value + "</h6>");
    });
  $(".btn-salvar, .btn-cancelar").hide();
  $(".btn-editar").show();
}

// Função para salvar os dados atualizados no banco de dados Firebase
function salvarDados() {
  var dadosASalvar = {
    nome: document.querySelector("#nome").value,
    email: document.querySelector("#email").value,
    telefone: document.querySelector("#telefone").value,
    cidade: document.querySelector("#cidade").value,
    bairro: document.querySelector("#bairro").value,
    curso: document.querySelector("#curso").value,
    ingresso: document.querySelector("#ingresso").value,
    semestre: document.querySelector("#semestre").value,
    conheceu: document.querySelector("#evento").value,
    customCheck1: document.querySelector("#customCheck1").checked, // Se for um checkbox
    Observacoes: document.querySelector("#Observacoes").value,
  };

  // Verifica se há um ID de edição atual
  if (currentEditId) {
    var updateRef = firebase.database().ref("formulario/" + currentEditId);

    // Atualiza os dados no Firebase
    updateRef
      .update(dadosASalvar)
      .then(function () {
        console.log("Dados atualizados com sucesso!");
        // Exibe o modal de alerta
        $("#modalAlerta").modal("show");
      })
      .catch(function (error) {
        console.error("Erro ao atualizar dados:", error);
      });
  } else {
    console.error("ID do registro não encontrado.");
  }

  // Fecha o modal de edição
  $("#modalExemplo").modal("hide");
}

document
  .querySelector(".btn-salvar-mudancas")
  .addEventListener("click", function () {
    salvarDados(); // Chama a função salvarDados() ao clicar no botão "Salvar mudanças"
  });

document
  .querySelector(".btn-salvar-mudancas")
  .addEventListener("click", function () {
    btn_salvar(); // Chama a função salvar() ao clicar no botão
  });

// Função para salvar as alterações
function btn_salvar() {
  // Chama a função para salvar os dados no Firebase ou em outro sistema

  // Após salvar, chame a função cancelar() para voltar ao modo de visualização
  btn_cancelar();
}
