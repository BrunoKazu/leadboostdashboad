document.addEventListener("DOMContentLoaded", function () {
  var formularioRef = firebase.database().ref("funcionarios");

  // Evento de envio do formulário de cadastro
  document
    .getElementById("formCadastrarFuncionario")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      var nome = document.getElementById("nomeCadastro").value;
      var telefone = document.getElementById("telefoneCadastro").value;
      var cpf = document.getElementById("cpfCadastro").value;
      var senha = document.getElementById("senhaCadastro").value;

      var novoFuncionarioRef = formularioRef.push();
      novoFuncionarioRef
        .set({
          nome: nome,
          telefone: telefone,
          cpf: cpf,
          senha: senha,
        })
        .then(function () {
          alert("Funcionário cadastrado com sucesso!");
          document.getElementById("formCadastrarFuncionario").reset();
        })
        .catch(function (error) {
          console.error("Erro ao cadastrar funcionário:", error);
        });
    });

  // Função para listar funcionários na tabela
  formularioRef.on("child_added", function (snapshot) {
    var data = snapshot.val();
    var key = snapshot.key;

    var tableBody = document.querySelector("#example tbody");
    var row = document.createElement("tr");
    row.setAttribute("data-key", key);

    row.innerHTML = `
          <td>${data.nome}</td>
          <td>${data.telefone}</td>
          <td>${data.cpf}</td>
          <td>${data.senha}</td>
          <td>
              <button type="button" class="btn btn-primary btn-sm" onclick="editRow('${key}')">Editar</button>
              <button type="button" class="btn btn-danger btn-sm" onclick="deleteRow('${key}')">Excluir</button>
          </td>
      `;

    tableBody.appendChild(row);
  });

  // Função para excluir funcionário
  window.deleteRow = function (key) {
    if (confirm("Tem certeza que deseja excluir este funcionário?")) {
      var row = document.querySelector(`tr[data-key="${key}"]`);

      formularioRef
        .child(key)
        .remove()
        .then(function () {
          row.remove();
        })
        .catch(function (error) {
          console.error("Erro ao excluir funcionário:", error);
        });
    }
  };

  // Função para editar funcionário
  window.editRow = function (key) {
    var row = document.querySelector(`tr[data-key="${key}"]`);
    var cells = row.cells;

    document.getElementById("funcionarioKey").value = key;
    document.getElementById("editNome").value = cells[0].innerText;
    document.getElementById("editTelefone").value = cells[1].innerText;
    document.getElementById("editCpf").value = cells[2].innerText;
    document.getElementById("editSenha").value = cells[3].innerText;

    $("#modalEditar").modal("show");
  };

  // Evento para salvar edição
  document
    .getElementById("salvarEdicao")
    .addEventListener("click", function () {
      var key = document.getElementById("funcionarioKey").value;
      var nome = document.getElementById("editNome").value;
      var telefone = document.getElementById("editTelefone").value;
      var cpf = document.getElementById("editCpf").value;
      var senha = document.getElementById("editSenha").value;

      formularioRef
        .child(key)
        .update({
          nome: nome,
          telefone: telefone,
          cpf: cpf,
          senha: senha,
        })
        .then(function () {
          alert("Funcionário atualizado com sucesso!");
          $("#modalEditar").modal("hide");
          location.reload();
        })
        .catch(function (error) {
          console.error("Erro ao atualizar funcionário:", error);
        });
    });
});
