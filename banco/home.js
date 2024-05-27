document.addEventListener("DOMContentLoaded", function () {
  var formularioRef = firebase.database().ref('formulario');
  var cardsContainer = document.querySelector('#cards-container');
 

  formularioRef.on('child_added', function (snapshot) {
    var data = snapshot.val();
    var nome = data.nome; // Aqui pegamos o nome do aluno

    // Cria um novo elemento de cartão
    var newCard = document.createElement('div');
    newCard.className = 'card text-black';
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
          <button type="button" class="btn btn-exibi primary-text btn-exibi-modal btn-block " data-toggle="modal" data-target="#modalExemplo">
            Exibir
          </button>
        </div>
      </div>
    </div>
    `;


   

  //  // Adiciona o novo cartão ao contêiner de cartões
    cardsContainer.appendChild(newCard);
 });
});

  

  window.editRow = function (button) {
    var row = button.closest('tr');
    var cells = row.cells;

    for (var i = 0; i < cells.length - 1; i++) {
      var cellValue = cells[i].textContent;
      cells[i].innerHTML = `<input class="form-control" type="text" value="${cellValue}">`;
    }

    toggleButtons(row, true);
  };

  window.saveRow = function (button) {
    var row = button.closest('tr');
    var cells = row.cells;
    var key = row.dataset.key;
    var newData = {};

    for (var i = 0; i < cells.length - 1; i++) {
      var fieldName = cells[i].textContent.toLowerCase().replace(/\s/g, ''); // Usar o texto da célula como nome do campo
      var cellValue = cells[i].querySelector('input') ? cells[i].querySelector('input').value : cells[i].textContent;

      // Verificar se a chave ou o valor estão vazios
      if (fieldName.trim() !== '' && cellValue.trim() !== '') {
        newData[fieldName] = cellValue;
      }
    }

    if (Object.keys(newData).length > 0) {
      formularioRef.child(key).update(newData, function (error) {
        if (error) {
          console.error("Erro ao atualizar no Firebase:", error);
        } else {
          console.log("Dados atualizados no Firebase com sucesso.");

          // Atualiza os dados no site
          for (var i = 0; i < cells.length - 1; i++) {
            var fieldName = cells[i].textContent.toLowerCase().replace(/\s/g, ''); // Usar o texto da célula como nome do campo
            cells[i].innerHTML = newData[fieldName];
          }

          // Volta para a exibição padrão dos botões
          toggleButtons(row, false);
        }
      });
    } else {
      console.log("Chave ou valor vazio. Não foi possível atualizar no Firebase.");
    }
  };

  window.cancelEdit = function (button) {
    // Atualiza a página para evitar inconsistências
    location.reload();
  };

  window.deleteRow = function (button) {
    if (confirm("Tem certeza que deseja excluir este aluno?")) {
      var row = button.closest('tr');
      var key = row.dataset.key;
      formularioRef.child(key).remove();
      row.remove();
    }
  };

  function toggleButtons(row, isEditing) {
    var editButton = row.querySelector('.btn-edit');
    var saveButton = row.querySelector('.btn-save');
    var cancelButton = row.querySelector('.btn-cancel');
    var deleteButton = row.querySelector('.btn-delete');

    editButton.style.display = isEditing ? 'none' : 'inline-block';
    saveButton.style.display = isEditing ? 'inline-block' : 'none';
    cancelButton.style.display = isEditing ? 'inline-block' : 'none';
    deleteButton.style.display = isEditing ? 'none' : 'inline-block';
  }
;







