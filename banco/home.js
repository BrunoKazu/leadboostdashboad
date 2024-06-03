// document.addEventListener("DOMContentLoaded", function () {
//   var formularioRef = firebase.database().ref('formulario');
//   var cardsContainer = document.querySelector('#cards-container');
 

//   formularioRef.on('child_added', function (snapshot) {
//     var data = snapshot.val();
//     var nome = data.nome; // Aqui pegamos o nome do aluno

//     // Cria um novo elemento de cartão
//     var newCard = document.createElement('div');
//     newCard.className = 'card text-black';
//     let nomeEmCaixaAlta = nome.toUpperCase();

//     // Conteúdo do cartão
//     newCard.innerHTML = `
//     <div class="card-header"><h5><i class="bi bi-person-circle"></i></h5></div>
//     <div class="card-body">
//       <div class="row">
//         <div class="col-sm-8">
//           <h5 class="card-title">${nomeEmCaixaAlta}</h5>
//         </div>
//         <!----botão do modal----->
//         <div class="col-sm-4 col-12 text-center mt-3 mt-md-0 "> 
//           <button type="button" class="btn btn-exibi primary-text btn-exibi-modal btn-block " data-toggle="modal" data-target="#modalExemplo">
//             Exibir
//           </button>
//         </div>
//       </div>
//     </div>
//     `;



    

   

//   //  // Adiciona o novo cartão ao contêiner de cartões
//     cardsContainer.appendChild(newCard);
//  });
// });

  

//   window.editRow = function (button) {
//     var row = button.closest('tr');
//     var cells = row.cells;

//     for (var i = 0; i < cells.length - 1; i++) {
//       var cellValue = cells[i].textContent;
//       cells[i].innerHTML = `<input class="form-control" type="text" value="${cellValue}">`;
//     }

//     toggleButtons(row, true);
//   };

//   window.saveRow = function (button) {
//     var row = button.closest('tr');
//     var cells = row.cells;
//     var key = row.dataset.key;
//     var newData = {};

//     for (var i = 0; i < cells.length - 1; i++) {
//       var fieldName = cells[i].textContent.toLowerCase().replace(/\s/g, ''); // Usar o texto da célula como nome do campo
//       var cellValue = cells[i].querySelector('input') ? cells[i].querySelector('input').value : cells[i].textContent;

//       // Verificar se a chave ou o valor estão vazios
//       if (fieldName.trim() !== '' && cellValue.trim() !== '') {
//         newData[fieldName] = cellValue;
//       }
//     }

//     if (Object.keys(newData).length > 0) {
//       formularioRef.child(key).update(newData, function (error) {
//         if (error) {
//           console.error("Erro ao atualizar no Firebase:", error);
//         } else {
//           console.log("Dados atualizados no Firebase com sucesso.");

//           // Atualiza os dados no site
//           for (var i = 0; i < cells.length - 1; i++) {
//             var fieldName = cells[i].textContent.toLowerCase().replace(/\s/g, ''); // Usar o texto da célula como nome do campo
//             cells[i].innerHTML = newData[fieldName];
//           }

//           // Volta para a exibição padrão dos botões
//           toggleButtons(row, false);
//         }
//       });
//     } else {
//       console.log("Chave ou valor vazio. Não foi possível atualizar no Firebase.");
//     }
//   };

//   window.cancelEdit = function (button) {
//     // Atualiza a página para evitar inconsistências
//     location.reload();
//   };

//   window.deleteRow = function (button) {
//     if (confirm("Tem certeza que deseja excluir este aluno?")) {
//       var row = button.closest('tr');
//       var key = row.dataset.key;
//       formularioRef.child(key).remove();
//       row.remove();
//     }
//   };

//   function toggleButtons(row, isEditing) {
//     var editButton = row.querySelector('.btn-edit');
//     var saveButton = row.querySelector('.btn-save');
//     var cancelButton = row.querySelector('.btn-cancel');
//     var deleteButton = row.querySelector('.btn-delete');

//     editButton.style.display = isEditing ? 'none' : 'inline-block';
//     saveButton.style.display = isEditing ? 'inline-block' : 'none';
//     cancelButton.style.display = isEditing ? 'inline-block' : 'none';
//     deleteButton.style.display = isEditing ? 'none' : 'inline-block';
//   }
// ;




document.addEventListener("DOMContentLoaded", function () {
  var formularioRef = firebase.database().ref('formulario');
  var cardsContainer = document.querySelector('#cards-container');

  formularioRef.on('child_added', function (snapshot) {
      var data = snapshot.val();
      var nome = data.nome; // Aqui pegamos o nome do candidato

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
            <button type="button" class="btn btn-exibir primary-text btn-exibir-modal btn-block" data-toggle="modal" data-target="#modalExemplo" data-nome="${nome}" data-email="${data.email}" data-telefone="${data.telefone}" data-cidade="${data.cidade}" data-bairro="${data.bairro}" data-curso="${data.curso}" data-ingresso="${data.ingresso}" data-semestre="${data.semestre}" data-conheceu="${data.conheceu}" data-termo="${data.customCheck1}" data-observacao="${data.Observacoes}">
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
  document.addEventListener('click', function (event) {
      if (event.target.classList.contains('btn-exibir-modal')) {
          // Preenche o modal com as informações do candidato
          var modalNome = document.querySelector('#nome');
          var modalEmail = document.querySelector('#email');
          var modalTelefone = document.querySelector('#telefone');
          var modalCidade = document.querySelector('#cidade');
          var modalBairro = document.querySelector('#bairro');
          var modalCurso = document.querySelector('#curso');
          var modalIngresso = document.querySelector('#ingresso');
          var modalSemestre = document.querySelector('#semestre');
          var modalConheceu = document.querySelector('#evento');
          var modalcustomCheck1 = document.querySelector('#customCheck1');
          var modalObservacoes = document.querySelector('#Observacoes');

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
          modalObservacoes.textContent = event.target.dataset.Observacoes;
      }
  });
});
