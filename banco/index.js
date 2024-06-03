function login() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var errorMessageElement = document.getElementById('errorMessage');
  errorMessageElement.textContent = '';

  if (username.trim() === '' || password.trim() === '') {
    errorMessageElement.textContent = "Por favor, preencha todos os campos.";
    return;
  }

  if (username === 'adm@adm.com' && password === 'lead2420') {
    window.location.href = "./page/Home.html";
    return;
  }

  firebase.auth().signInWithEmailAndPassword(username, password)
    .then(function (userCredential) {
      if (firebase.auth().currentUser) {
        window.location.href = "./page/Home.html";
      } else {
        errorMessageElement.textContent = "Usuário não autenticado";
      }
    })
    
    .catch(function (error) {
      if (error.code === 'auth/wrong-password') {
        errorMessageElement.textContent = "Senha incorreta. Por favor, tente novamente.";
      } else if (error.code === 'auth/user-not-found') {
        errorMessageElement.textContent = "Usuário não encontrado. Por favor, verifique seu usuário.";
      } else {
        errorMessageElement.textContent = "Erro de autenticação: " + error.message;
      }
    });
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  login();
});

document.getElementById('loginButton').addEventListener('click', function(event) {
  event.preventDefault();
  login();
});

document.getElementById('loginForm').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    login();
  }
});

