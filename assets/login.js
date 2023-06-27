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
            location.href = '../client/index.html'
        })
        .catch(function(error) {
            // Tratar erros de login

            var errorCode = error.code;
            var errorMessage = traduzirErroFirebase(errorCode);
            modal(errorMessage, 2000);
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
            location.href = '../client/index.html'
        })
        .catch(function(error) {
            // Ocorreu um erro durante o login
            console.error('Erro de login:', error);
            var errorCode = error.code;

            modal(errorCode, 5000);
        });
}

function esqueci() {
    document.querySelector("#modalpem").style.display = 'block'
}

function recuperar() {

    var auth = firebase.auth();
    var email = document.getElementById('emailInput').value;


    auth.sendPasswordResetEmail(email)
        .then(function() {
            document.querySelector("#modalpem").style.display = 'none'
            modal('Email de recuperação de senha enviado!', 2000)
        })
        .catch(function(error) {
            modal('Ocorreu um erro ao enviar o email de recuperação de senha: ' + error.message, 4000)
        });

}


function modal(message, time) {
    document.querySelector("#modalpadrao").style.display = 'block'
    document.querySelector("#modalpadrao #message").innerHTML = message

    setTimeout(() => {
        document.querySelector("#modalpadrao").style.display = 'none'
    }, time);
}

// Função para traduzir os códigos de erro do Firebase Auth
function traduzirErroFirebase(code) {
    switch (code) {
        case "auth/user-not-found":
            return "Usuário não encontrado. Verifique suas credenciais.";
        case "auth/wrong-password":
            return "Senha incorreta. Verifique suas credenciais.";
        case "auth/invalid-email":
            return "Email inválido. Verifique suas credenciais.";
            // Adicione mais casos para outros códigos de erro, se necessário
        default:
            return "Ocorreu um erro no login.";
    }
}