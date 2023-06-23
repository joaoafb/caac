
  
  // Função para realizar o login

  
  function fazerLogin(event) {
    event.preventDefault(); // Impede o envio padrão do formulário
  
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
  
    // Realizar login no Firebase Authentication
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function(userCredential) {
        // Login bem-sucedido, redirecionar para a próxima página ou executar outras ações
        console.log('Login bem-sucedido!');
        location.href = './index.html'
      })
      .catch(function(error) {
        // Tratar erros de login
        console.error('Erro ao fazer login:', error);
      });
  }
  document.addEventListener('DOMContentLoaded', function() {
    // Add an event listener to the form to capture the submission
    var form = document.querySelector('#loginForm');
    form.addEventListener('submit', fazerLogin);
  });
  

  function signInWithGoogle() {
    // Crie uma instância do provedor de autenticação do Google
    var provider = new firebase.auth.GoogleAuthProvider();
  
    // Faça o login com o provedor de autenticação do Google
    firebase.auth().signInWithPopup(provider)
      .then(function(result) {
        // Sucesso no login, você pode acessar os detalhes do usuário result.user
        console.log('Usuário logado:', result.user);
        location.href = './index.html'
      })
      .catch(function(error) {
        // Ocorreu um erro durante o login
        console.error('Erro de login:', error);
      });
  }